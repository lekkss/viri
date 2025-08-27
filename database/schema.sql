-- Create conversations table to group messages
CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Create messages table to store individual chat messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    tokens_used INTEGER,
    model_used VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages(role);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_conversations_updated_at 
    BEFORE UPDATE ON conversations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for easy querying of conversations with message counts
CREATE OR REPLACE VIEW conversation_summary AS
SELECT 
    c.id,
    c.user_id,
    c.title,
    c.created_at,
    c.updated_at,
    c.is_active,
    COUNT(m.id) as message_count,
    MAX(m.created_at) as last_message_at
FROM conversations c
LEFT JOIN messages m ON c.id = m.conversation_id
GROUP BY c.id, c.user_id, c.title, c.created_at, c.updated_at, c.is_active;

-- ALTER statements to add support for images and files
-- Add columns to support file attachments
ALTER TABLE messages ADD COLUMN IF NOT EXISTS has_attachments BOOLEAN DEFAULT false;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS attachments JSONB;

-- Add indexes for better performance on new columns
CREATE INDEX IF NOT EXISTS idx_messages_has_attachments ON messages(has_attachments);
CREATE INDEX IF NOT EXISTS idx_messages_attachments_gin ON messages USING GIN (attachments);

-- Insert sample data (optional)
-- INSERT INTO conversations (user_id, title) VALUES 
--     ('550e8400-e29b-41d4-a716-446655440000', 'First Chat'),
--     ('550e8400-e29b-41d4-a716-446655440001', 'Second Chat');

-- INSERT INTO messages (conversation_id, user_id, role, content, model_used) VALUES 
--     ((SELECT id FROM conversations LIMIT 1), '550e8400-e29b-41d4-a716-446655440000', 'user', 'Hello, how are you?', 'gpt-3.5-turbo'),
--     ((SELECT id FROM conversations LIMIT 1), '550e8400-e29b-41d4-a716-446655440000', 'assistant', 'I am doing well, thank you for asking!', 'gpt-3.5-turbo');

