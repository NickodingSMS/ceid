-- Migration script to update existing CIED database schema
-- Run this against your existing database to add the new fields and tables

-- Add new fields to mentors table
ALTER TABLE mentors 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS highest_education VARCHAR(100),
ADD COLUMN IF NOT EXISTS photo BYTEA;

-- Update existing mentors with data from users table
UPDATE mentors 
SET first_name = users.first_name,
    last_name = users.last_name,
    highest_education = CASE 
        WHEN users.email = 'john.smith@company.com' THEN 'Master of Science in Computer Science'
        WHEN users.email = 'jane.doe@company.com' THEN 'PhD in Data Science'
        WHEN users.email = 'alex.wilson@company.com' THEN 'Bachelor of Fine Arts in Design'
        ELSE NULL
    END
FROM users 
WHERE mentors.id = users.id;

-- Make first_name and last_name NOT NULL after updating
ALTER TABLE mentors 
ALTER COLUMN first_name SET NOT NULL,
ALTER COLUMN last_name SET NOT NULL;

-- Create events table if it doesn't exist
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL
);

-- Insert sample events
INSERT INTO events (title, description, date) VALUES
    ('CIED Internship Program Kickoff', 'Welcome event for all new interns. Meet your mentors, learn about the program structure, and network with fellow interns.', '2025-02-01'),
    ('Tech Talk: Future of AI in Business', 'Industry expert presentation on how artificial intelligence is transforming modern business practices and creating new opportunities.', '2025-03-15'),
    ('Mid-Program Review & Showcase', 'Interns present their project progress to mentors and program coordinators. Opportunity for feedback and networking.', '2025-05-10')
ON CONFLICT DO NOTHING;

-- Add index for events table
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- Update DROP statements in main schema file to include events
-- (This is for reference - the events table should now be included in any future schema recreations)
