import { images } from "@/constants";
import { ImageSourcePropType } from "react-native";

export const categories = [
  {
    id: "1",
    name: "Top stories",
  },

  {
    id: "2",
    name: "Finance",
  },

  {
    id: "3",
    name: "Travel",
  },

  {
    id: "4",
    name: "Tech & Science",
  },

  {
    id: "5",
    name: "Entertainment",
  },
];

export type Blog = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType | string;
  createdAt: string;
  timeToRead: string;
};

export const blogs: Blog[] = [
  {
    id: "1",
    title: "The Future of AI",
    description:
      "This will be the title of the story. This will be the title of the story. This will be the title of the story lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: images.blogImage,
    createdAt: "2025-08-25T10:30:00",
    timeToRead: "5 min",
  },
  {
    id: "2",
    title: "The Future of AI",
    description:
      "This will be the title of the story. This will be the title of the story. This will be the title of the story lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: images.blogImage,
    createdAt: "2025-08-25T10:30:00",
    timeToRead: "5 min",
  },
  {
    id: "3",
    title: "The Future of AI",
    description:
      "This will be the title of the story. This will be the title of the story. This will be the title of the story lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: images.blogImage,
    createdAt: "2025-08-25T10:30:00",
    timeToRead: "5 min",
  },
];
