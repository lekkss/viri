import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import { fetchAPI } from "./fetch";

interface AuthResult {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
  data?: {
    sessionId: string;
    userId: string;
    email: string;
  };
}

export const googleOAuth = async (startSSOFlow: any): Promise<AuthResult> => {
  try {
    const { createdSessionId, setActive, signUp } = await startSSOFlow({
      strategy: "oauth_google",
      redirectUrl: AuthSession.makeRedirectUri(),
    });

    // If sign in was successful, set the active session
    if (createdSessionId) {
      if (setActive) {
        await setActive({
          session: createdSessionId,
          navigate: async ({ session }: { session: any }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            router.push("/(root)/(tabs)/today");
          },
        });
        if (signUp.createdSessionId) {
          // Create user in database without name initially
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
              name: `${signUp.firstName} ${signUp.lastName}`,
            }),
          });
        }
      }

      setActive!({
        session: createdSessionId,
        navigate: async ({ session }: { session: any }) => {
          if (session?.currentTask) {
            // Check for tasks and navigate to custom UI to help users resolve them
            // See https://clerk.com/docs/custom-flows/overview#session-tasks
            console.log(session?.currentTask);
            return;
          }

          router.push("/(root)/(tabs)/today");
        },
      });

      return {
        success: true,
        data: {
          sessionId: createdSessionId,
          userId: signUp?.createdUserId || "",
          email: signUp?.emailAddress || "",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "NO_SESSION",
        message: "Failed to create session",
      },
    };
  } catch (error: any) {
    console.error("Google OAuth error:", error);

    // Handle specific error types
    if (error.errors && error.errors.length > 0) {
      const clerkError = error.errors[0];
      return {
        success: false,
        error: {
          code: clerkError.code || "OAUTH_ERROR",
          message:
            clerkError.longMessage ||
            clerkError.message ||
            "OAuth authentication failed",
        },
      };
    }

    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message:
          error.message || "An unexpected error occurred during authentication",
      },
    };
  }
};
