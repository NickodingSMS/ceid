-- CIED Intern Management System - New Database Schema
-- This schema provides a comprehensive structure for managing interns, mentors, projects, and more

-- Drop existing tables if they exist
DROP TABLE IF EXISTS intern_projects CASCADE;
DROP TABLE IF EXISTS intern_skills CASCADE;
DROP TABLE IF EXISTS project_skills CASCADE;
DROP TABLE IF EXISTS mentor_skills CASCADE;
DROP TABLE IF EXISTS application_documents CASCADE;
DROP TABLE IF EXISTS time_slots CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS mentors CASCADE;
DROP TABLE IF EXISTS interns CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types for better data integrity
CREATE TYPE user_role AS ENUM ('admin', 'mentor', 'intern', 'coordinator');
CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'accepted', 'rejected', 'waitlisted');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'completed', 'cancelled');
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE availability_status AS ENUM ('available', 'busy', 'unavailable');

-- Users table (base table for authentication and common info)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    profile_picture_url TEXT,
    bio TEXT
);

-- Skills table (centralized skills management)
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50), -- e.g., 'programming', 'design', 'data_science', 'business'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mentors table (extends users)
CREATE TABLE mentors (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    highest_education VARCHAR(100),
    photo BYTEA,
    department VARCHAR(100),
    job_title VARCHAR(100),
    years_experience INTEGER,
    max_interns INTEGER DEFAULT 3,
    current_interns INTEGER DEFAULT 0,
    linkedin_url TEXT,
    github_url TEXT,
    personal_website TEXT,
    mentoring_philosophy TEXT,
    preferred_communication VARCHAR(50) DEFAULT 'email' -- email, slack, teams, etc.
);

-- Interns table (extends users)
CREATE TABLE interns (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(50),
    university VARCHAR(100),
    major VARCHAR(100),
    graduation_year INTEGER,
    gpa DECIMAL(3,2),
    resume_url TEXT,
    portfolio_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    personal_website TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    start_date DATE,
    end_date DATE,
    mentor_id UUID REFERENCES mentors(id),
    is_remote BOOLEAN DEFAULT FALSE,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20)
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    mentor_id UUID REFERENCES mentors(id),
    status project_status DEFAULT 'draft',
    start_date DATE,
    end_date DATE,
    max_interns INTEGER DEFAULT 1,
    current_interns INTEGER DEFAULT 0,
    required_skills TEXT[], -- Array of skill names
    preferred_skills TEXT[], -- Array of skill names
    time_commitment_hours INTEGER, -- hours per week
    is_remote BOOLEAN DEFAULT TRUE,
    location VARCHAR(200),
    learning_objectives TEXT[],
    deliverables TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Applications table (replaces old interns table)
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intern_id UUID REFERENCES interns(id),
    project_id UUID REFERENCES projects(id),
    status application_status DEFAULT 'pending',
    cover_letter TEXT,
    why_interested TEXT,
    relevant_experience TEXT,
    goals TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewer_id UUID REFERENCES users(id),
    review_notes TEXT,
    interview_scheduled_at TIMESTAMP WITH TIME ZONE,
    interview_notes TEXT,
    UNIQUE(intern_id, project_id) -- Prevent duplicate applications
);

-- Time availability table
CREATE TABLE time_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status availability_status DEFAULT 'available',
    notes TEXT,
    effective_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Application documents table
CREATE TABLE application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'resume', 'cover_letter', 'portfolio', 'transcript'
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER, -- in bytes
    mime_type VARCHAR(100),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mentor skills junction table
CREATE TABLE mentor_skills (
    mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level skill_level NOT NULL,
    years_experience INTEGER,
    can_teach BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (mentor_id, skill_id)
);

-- Intern skills junction table
CREATE TABLE intern_skills (
    intern_id UUID REFERENCES interns(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level skill_level NOT NULL,
    want_to_learn BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (intern_id, skill_id)
);

-- Project skills junction table
CREATE TABLE project_skills (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT FALSE,
    proficiency_needed skill_level NOT NULL,
    PRIMARY KEY (project_id, skill_id)
);

-- Intern-Project assignments (many-to-many for projects that can have multiple interns)
CREATE TABLE intern_projects (
    intern_id UUID REFERENCES interns(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, withdrawn
    start_date DATE,
    end_date DATE,
    hours_per_week INTEGER,
    performance_rating INTEGER CHECK (performance_rating BETWEEN 1 AND 5),
    feedback TEXT,
    PRIMARY KEY (intern_id, project_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_intern_id ON applications(intern_id);
CREATE INDEX idx_applications_project_id ON applications(project_id);
CREATE INDEX idx_projects_mentor_id ON projects(mentor_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_time_slots_user_id ON time_slots(user_id);
CREATE INDEX idx_time_slots_day_of_week ON time_slots(day_of_week);
CREATE INDEX idx_intern_projects_intern_id ON intern_projects(intern_id);
CREATE INDEX idx_intern_projects_project_id ON intern_projects(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample skills
INSERT INTO skills (name, category, description) VALUES
    ('JavaScript', 'programming', 'Programming language for web development'),
    ('Python', 'programming', 'General-purpose programming language'),
    ('React', 'programming', 'JavaScript library for building user interfaces'),
    ('Node.js', 'programming', 'JavaScript runtime for server-side development'),
    ('PostgreSQL', 'database', 'Relational database management system'),
    ('Git', 'tools', 'Version control system'),
    ('Docker', 'tools', 'Containerization platform'),
    ('UI/UX Design', 'design', 'User interface and experience design'),
    ('Data Analysis', 'data_science', 'Analyzing and interpreting data'),
    ('Machine Learning', 'data_science', 'AI and predictive modeling'),
    ('Project Management', 'business', 'Planning and executing projects'),
    ('Communication', 'soft_skills', 'Verbal and written communication skills'),
    ('Problem Solving', 'soft_skills', 'Analytical thinking and problem resolution');

-- Create a view for intern applications with all related data
CREATE VIEW intern_application_details AS
SELECT 
    a.id as application_id,
    a.status,
    a.applied_at,
    u.first_name,
    u.last_name,
    u.email,
    i.university,
    i.major,
    i.graduation_year,
    p.title as project_title,
    p.description as project_description,
    m.first_name as mentor_first_name,
    m.last_name as mentor_last_name
FROM applications a
JOIN interns i ON a.intern_id = i.id
JOIN users u ON i.id = u.id
JOIN projects p ON a.project_id = p.id
JOIN mentors mentor ON p.mentor_id = mentor.id
JOIN users m ON mentor.id = m.id;

-- Create a view for project statistics
CREATE VIEW project_statistics AS
SELECT 
    p.id,
    p.title,
    p.status,
    COUNT(a.id) as total_applications,
    COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_applications,
    COUNT(CASE WHEN a.status = 'accepted' THEN 1 END) as accepted_applications,
    p.max_interns,
    p.current_interns
FROM projects p
LEFT JOIN applications a ON p.id = a.project_id
GROUP BY p.id, p.title, p.status, p.max_interns, p.current_interns;

COMMENT ON TABLE users IS 'Base user table with authentication and common information';
COMMENT ON TABLE mentors IS 'Extended information for mentors';
COMMENT ON TABLE interns IS 'Extended information for interns';
COMMENT ON TABLE projects IS 'Available internship projects';
COMMENT ON TABLE applications IS 'Intern applications to projects';
COMMENT ON TABLE skills IS 'Centralized skills catalog';
COMMENT ON TABLE time_slots IS 'User availability schedule';
