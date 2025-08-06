-- Sample Data for CIED Intern Management System

-- Sample Users (Admin and Coordinator)
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, bio) VALUES
    ('admin@cied.org', '$2b$12$example_hash_admin', 'Sarah', 'Johnson', 'admin', '555-0001', 'CIED Program Administrator'),
    ('coordinator@cied.org', '$2b$12$example_hash_coord', 'Michael', 'Chen', 'coordinator', '555-0002', 'Internship Program Coordinator');

-- Sample Mentor Users
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, bio) VALUES
    ('john.smith@company.com', '$2b$12$example_hash_1', 'John', 'Smith', 'mentor', '555-0101', 'Senior Software Engineer with 8 years of experience in full-stack development'),
    ('jane.doe@company.com', '$2b$12$example_hash_2', 'Jane', 'Doe', 'mentor', '555-0102', 'Data Science Manager specializing in machine learning and analytics'),
    ('alex.wilson@company.com', '$2b$12$example_hash_3', 'Alex', 'Wilson', 'mentor', '555-0103', 'UX/UI Designer with expertise in user research and interface design');

-- Sample Intern Users
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, bio) VALUES
    ('emma.davis@university.edu', '$2b$12$example_hash_4', 'Emma', 'Davis', 'intern', '555-0201', 'Computer Science student passionate about web development'),
    ('lucas.brown@university.edu', '$2b$12$example_hash_5', 'Lucas', 'Brown', 'intern', '555-0202', 'Data Science major interested in machine learning applications'),
    ('sophia.garcia@university.edu', '$2b$12$example_hash_6', 'Sophia', 'Garcia', 'intern', '555-0203', 'Design student with focus on user experience and accessibility');

-- Create Mentors (using the user IDs created above)
INSERT INTO mentors (id, first_name, last_name, highest_education, department, job_title, years_experience, max_interns, linkedin_url, github_url, mentoring_philosophy)
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 'Master of Science in Computer Science'
        WHEN u.email = 'jane.doe@company.com' THEN 'PhD in Data Science'
        WHEN u.email = 'alex.wilson@company.com' THEN 'Bachelor of Fine Arts in Design'
    END,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 'Engineering'
        WHEN u.email = 'jane.doe@company.com' THEN 'Data Science'
        WHEN u.email = 'alex.wilson@company.com' THEN 'Design'
    END,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 'Senior Software Engineer'
        WHEN u.email = 'jane.doe@company.com' THEN 'Data Science Manager'
        WHEN u.email = 'alex.wilson@company.com' THEN 'Senior UX Designer'
    END,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 8
        WHEN u.email = 'jane.doe@company.com' THEN 6
        WHEN u.email = 'alex.wilson@company.com' THEN 5
    END,
    2,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 'https://linkedin.com/in/johnsmith'
        WHEN u.email = 'jane.doe@company.com' THEN 'https://linkedin.com/in/janedoe'
        WHEN u.email = 'alex.wilson@company.com' THEN 'https://linkedin.com/in/alexwilson'
    END,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 'https://github.com/johnsmith'
        WHEN u.email = 'jane.doe@company.com' THEN 'https://github.com/janedoe'
        WHEN u.email = 'alex.wilson@company.com' THEN NULL
    END,
    CASE 
        WHEN u.email = 'john.smith@company.com' THEN 'I believe in hands-on learning and giving interns real responsibility on meaningful projects.'
        WHEN u.email = 'jane.doe@company.com' THEN 'My goal is to help interns understand both the technical and business aspects of data science.'
        WHEN u.email = 'alex.wilson@company.com' THEN 'I focus on teaching design thinking and user-centered design principles.'
    END
FROM users u
WHERE u.role = 'mentor';

-- Insert sample events
INSERT INTO events (title, description, date) VALUES
    ('CIED Internship Program Kickoff', 'Welcome event for all new interns. Meet your mentors, learn about the program structure, and network with fellow interns.', '2025-02-01'),
    ('Tech Talk: Future of AI in Business', 'Industry expert presentation on how artificial intelligence is transforming modern business practices and creating new opportunities.', '2025-03-15'),
    ('Mid-Program Review & Showcase', 'Interns present their project progress to mentors and program coordinators. Opportunity for feedback and networking.', '2025-05-10');

-- Create Interns
INSERT INTO interns (id, student_id, university, major, graduation_year, gpa, github_url, linkedin_url, emergency_contact_name, emergency_contact_phone, is_remote)
SELECT 
    u.id,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 'CS2025001'
        WHEN u.email = 'lucas.brown@university.edu' THEN 'DS2025002'
        WHEN u.email = 'sophia.garcia@university.edu' THEN 'DES2025003'
    END,
    'State University',
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 'Computer Science'
        WHEN u.email = 'lucas.brown@university.edu' THEN 'Data Science'
        WHEN u.email = 'sophia.garcia@university.edu' THEN 'Graphic Design'
    END,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 2025
        WHEN u.email = 'lucas.brown@university.edu' THEN 2026
        WHEN u.email = 'sophia.garcia@university.edu' THEN 2025
    END,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 3.8
        WHEN u.email = 'lucas.brown@university.edu' THEN 3.6
        WHEN u.email = 'sophia.garcia@university.edu' THEN 3.9
    END,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 'https://github.com/emmadavis'
        WHEN u.email = 'lucas.brown@university.edu' THEN 'https://github.com/lucasbrown'
        WHEN u.email = 'sophia.garcia@university.edu' THEN NULL
    END,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 'https://linkedin.com/in/emmadavis'
        WHEN u.email = 'lucas.brown@university.edu' THEN 'https://linkedin.com/in/lucasbrown'
        WHEN u.email = 'sophia.garcia@university.edu' THEN 'https://linkedin.com/in/sophiagarcia'
    END,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN 'Robert Davis'
        WHEN u.email = 'lucas.brown@university.edu' THEN 'Maria Brown'
        WHEN u.email = 'sophia.garcia@university.edu' THEN 'Carlos Garcia'
    END,
    CASE 
        WHEN u.email = 'emma.davis@university.edu' THEN '555-1001'
        WHEN u.email = 'lucas.brown@university.edu' THEN '555-1002'
        WHEN u.email = 'sophia.garcia@university.edu' THEN '555-1003'
    END,
    TRUE
FROM users u
WHERE u.role = 'intern';

-- Create Sample Projects
INSERT INTO projects (title, description, detailed_description, mentor_id, status, start_date, end_date, max_interns, required_skills, preferred_skills, time_commitment_hours, learning_objectives, deliverables)
SELECT 
    'E-Commerce Website Development',
    'Build a modern e-commerce platform using React and Node.js',
    'This project involves creating a full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. The intern will work on both frontend and backend components, learning modern web development practices.',
    m.id,
    'active',
    '2025-02-01',
    '2025-07-31',
    2,
    ARRAY['JavaScript', 'React', 'Node.js'],
    ARRAY['Git', 'PostgreSQL'],
    20,
    ARRAY['Learn full-stack development', 'Understand e-commerce business logic', 'Practice agile development'],
    ARRAY['Functional e-commerce website', 'User documentation', 'Code repository']
FROM mentors m
JOIN users u ON m.id = u.id
WHERE u.email = 'john.smith@company.com'

UNION ALL

SELECT 
    'Customer Analytics Dashboard',
    'Develop a data visualization dashboard for customer behavior analysis',
    'Create an interactive dashboard that analyzes customer data and provides insights for business decision-making. The project involves data processing, statistical analysis, and visualization using Python and modern data science tools.',
    m.id,
    'active',
    '2025-02-15',
    '2025-08-15',
    1,
    ARRAY['Python', 'Data Analysis'],
    ARRAY['Machine Learning', 'PostgreSQL'],
    25,
    ARRAY['Learn data visualization techniques', 'Understand business analytics', 'Practice statistical analysis'],
    ARRAY['Interactive dashboard', 'Analysis report', 'Data pipeline documentation']
FROM mentors m
JOIN users u ON m.id = u.id
WHERE u.email = 'jane.doe@company.com'

UNION ALL

SELECT 
    'Mobile App UI/UX Redesign',
    'Redesign the user interface and experience of our mobile application',
    'This project focuses on improving the user experience of an existing mobile application through user research, wireframing, prototyping, and usability testing. The intern will learn the complete UX design process.',
    m.id,
    'draft',
    '2025-03-01',
    '2025-08-31',
    1,
    ARRAY['UI/UX Design'],
    ARRAY['Communication', 'Problem Solving'],
    15,
    ARRAY['Learn user research methods', 'Master design tools', 'Understand mobile design principles'],
    ARRAY['Design mockups', 'User research report', 'Prototype presentation']
FROM mentors m
JOIN users u ON m.id = u.id
WHERE u.email = 'alex.wilson@company.com';

-- Add mentor skills
INSERT INTO mentor_skills (mentor_id, skill_id, proficiency_level, years_experience, can_teach)
SELECT m.id, s.id, 'expert', 8, TRUE
FROM mentors m
JOIN users u ON m.id = u.id
JOIN skills s ON s.name IN ('JavaScript', 'React', 'Node.js', 'Git')
WHERE u.email = 'john.smith@company.com'

UNION ALL

SELECT m.id, s.id, 'advanced', 6, TRUE
FROM mentors m
JOIN users u ON m.id = u.id
JOIN skills s ON s.name IN ('Python', 'Data Analysis', 'Machine Learning', 'PostgreSQL')
WHERE u.email = 'jane.doe@company.com'

UNION ALL

SELECT m.id, s.id, 'expert', 5, TRUE
FROM mentors m
JOIN users u ON m.id = u.id
JOIN skills s ON s.name IN ('UI/UX Design', 'Communication', 'Problem Solving')
WHERE u.email = 'alex.wilson@company.com';

-- Add intern skills
INSERT INTO intern_skills (intern_id, skill_id, proficiency_level, want_to_learn)
SELECT i.id, s.id, 'intermediate', FALSE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('JavaScript', 'React', 'Git')
WHERE u.email = 'emma.davis@university.edu'

UNION ALL

SELECT i.id, s.id, 'beginner', TRUE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('Node.js', 'PostgreSQL')
WHERE u.email = 'emma.davis@university.edu'

UNION ALL

SELECT i.id, s.id, 'intermediate', FALSE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('Python', 'Data Analysis')
WHERE u.email = 'lucas.brown@university.edu'

UNION ALL

SELECT i.id, s.id, 'beginner', TRUE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('Machine Learning', 'PostgreSQL')
WHERE u.email = 'lucas.brown@university.edu'

UNION ALL

SELECT i.id, s.id, 'advanced', FALSE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('UI/UX Design', 'Communication')
WHERE u.email = 'sophia.garcia@university.edu'

UNION ALL

SELECT i.id, s.id, 'beginner', TRUE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('JavaScript', 'React')
WHERE u.email = 'sophia.garcia@university.edu';

-- Create sample applications
INSERT INTO applications (intern_id, project_id, status, cover_letter, why_interested, relevant_experience, goals)
SELECT 
    i.id,
    p.id,
    'pending',
    'I am very excited to apply for this e-commerce development internship. My experience with React and JavaScript makes me a strong candidate for this position.',
    'I am passionate about web development and want to learn more about building real-world applications that users interact with daily.',
    'I have built several personal projects using React, including a todo app and a weather dashboard. I also completed coursework in database design.',
    'I want to gain experience in full-stack development and learn how to build scalable web applications.'
FROM interns i
JOIN users u ON i.id = u.id
JOIN projects p ON p.title = 'E-Commerce Website Development'
WHERE u.email = 'emma.davis@university.edu'

UNION ALL

SELECT 
    i.id,
    p.id,
    'reviewing',
    'I am writing to express my interest in the Customer Analytics Dashboard project. My background in data science and Python programming aligns well with this opportunity.',
    'Data visualization and business analytics fascinate me, and I believe this project will help me bridge the gap between technical skills and business insights.',
    'I have experience with Python data libraries like pandas and matplotlib. I also completed a course project analyzing student performance data.',
    'I aim to develop my skills in data visualization and learn how to derive actionable insights from complex datasets.'
FROM interns i
JOIN users u ON i.id = u.id
JOIN projects p ON p.title = 'Customer Analytics Dashboard'
WHERE u.email = 'lucas.brown@university.edu';

-- Add some time slots for availability
INSERT INTO time_slots (user_id, day_of_week, start_time, end_time, status, notes)
SELECT u.id, 1, '09:00', '17:00', 'available', 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 2, '09:00', '17:00', 'available', 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 3, '09:00', '17:00', 'available', 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 4, '09:00', '17:00', 'available', 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 5, '09:00', '17:00', 'available', 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor';

-- Add intern availability (more flexible schedules)
INSERT INTO time_slots (user_id, day_of_week, start_time, end_time, status, notes)
SELECT u.id, day_num, '10:00', '16:00', 'available', 'Available for internship work'
FROM users u 
CROSS JOIN generate_series(1, 5) AS day_num
WHERE u.role = 'intern';
