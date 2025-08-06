-- Fixed Sample Data for CIED Intern Management System

-- Create Sample Projects with proper ENUM casting
INSERT INTO projects (title, description, detailed_description, mentor_id, status, start_date, end_date, max_interns, required_skills, preferred_skills, time_commitment_hours, learning_objectives, deliverables)
SELECT 
    'E-Commerce Website Development',
    'Build a modern e-commerce platform using React and Node.js',
    'This project involves creating a full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. The intern will work on both frontend and backend components, learning modern web development practices.',
    m.id,
    'active'::project_status,
    '2025-02-01'::date,
    '2025-07-31'::date,
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
    'active'::project_status,
    '2025-02-15'::date,
    '2025-08-15'::date,
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
    'draft'::project_status,
    '2025-03-01'::date,
    '2025-08-31'::date,
    1,
    ARRAY['UI/UX Design'],
    ARRAY['Communication', 'Problem Solving'],
    15,
    ARRAY['Learn user research methods', 'Master design tools', 'Understand mobile design principles'],
    ARRAY['Design mockups', 'User research report', 'Prototype presentation']
FROM mentors m
JOIN users u ON m.id = u.id
WHERE u.email = 'alex.wilson@company.com';

-- Add mentor skills with proper ENUM casting
INSERT INTO mentor_skills (mentor_id, skill_id, proficiency_level, years_experience, can_teach)
SELECT m.id, s.id, 'expert'::skill_level, 8, TRUE
FROM mentors m
JOIN users u ON m.id = u.id
JOIN skills s ON s.name IN ('JavaScript', 'React', 'Node.js', 'Git')
WHERE u.email = 'john.smith@company.com'

UNION ALL

SELECT m.id, s.id, 'advanced'::skill_level, 6, TRUE
FROM mentors m
JOIN users u ON m.id = u.id
JOIN skills s ON s.name IN ('Python', 'Data Analysis', 'Machine Learning', 'PostgreSQL')
WHERE u.email = 'jane.doe@company.com'

UNION ALL

SELECT m.id, s.id, 'expert'::skill_level, 5, TRUE
FROM mentors m
JOIN users u ON m.id = u.id
JOIN skills s ON s.name IN ('UI/UX Design', 'Communication', 'Problem Solving')
WHERE u.email = 'alex.wilson@company.com';

-- Add intern skills with proper ENUM casting
INSERT INTO intern_skills (intern_id, skill_id, proficiency_level, want_to_learn)
SELECT i.id, s.id, 'intermediate'::skill_level, FALSE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('JavaScript', 'React', 'Git')
WHERE u.email = 'emma.davis@university.edu'

UNION ALL

SELECT i.id, s.id, 'beginner'::skill_level, TRUE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('Node.js', 'PostgreSQL')
WHERE u.email = 'emma.davis@university.edu'

UNION ALL

SELECT i.id, s.id, 'intermediate'::skill_level, FALSE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('Python', 'Data Analysis')
WHERE u.email = 'lucas.brown@university.edu'

UNION ALL

SELECT i.id, s.id, 'beginner'::skill_level, TRUE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('Machine Learning', 'PostgreSQL')
WHERE u.email = 'lucas.brown@university.edu'

UNION ALL

SELECT i.id, s.id, 'advanced'::skill_level, FALSE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('UI/UX Design', 'Communication')
WHERE u.email = 'sophia.garcia@university.edu'

UNION ALL

SELECT i.id, s.id, 'beginner'::skill_level, TRUE
FROM interns i
JOIN users u ON i.id = u.id
JOIN skills s ON s.name IN ('JavaScript', 'React')
WHERE u.email = 'sophia.garcia@university.edu';

-- Create sample applications with proper ENUM casting
INSERT INTO applications (intern_id, project_id, status, cover_letter, why_interested, relevant_experience, goals)
SELECT 
    i.id,
    p.id,
    'pending'::application_status,
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
    'reviewing'::application_status,
    'I am writing to express my interest in the Customer Analytics Dashboard project. My background in data science and Python programming aligns well with this opportunity.',
    'Data visualization and business analytics fascinate me, and I believe this project will help me bridge the gap between technical skills and business insights.',
    'I have experience with Python data libraries like pandas and matplotlib. I also completed a course project analyzing student performance data.',
    'I aim to develop my skills in data visualization and learn how to derive actionable insights from complex datasets.'
FROM interns i
JOIN users u ON i.id = u.id
JOIN projects p ON p.title = 'Customer Analytics Dashboard'
WHERE u.email = 'lucas.brown@university.edu';

-- Add mentor time slots with proper time casting
INSERT INTO time_slots (user_id, day_of_week, start_time, end_time, status, notes)
SELECT u.id, 1, '09:00'::time, '17:00'::time, 'available'::availability_status, 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 2, '09:00'::time, '17:00'::time, 'available'::availability_status, 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 3, '09:00'::time, '17:00'::time, 'available'::availability_status, 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 4, '09:00'::time, '17:00'::time, 'available'::availability_status, 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor'
UNION ALL
SELECT u.id, 5, '09:00'::time, '17:00'::time, 'available'::availability_status, 'Available for meetings and mentoring'
FROM users u WHERE u.role = 'mentor';

-- Add intern availability with proper time casting
INSERT INTO time_slots (user_id, day_of_week, start_time, end_time, status, notes)
SELECT u.id, day_num, '10:00'::time, '16:00'::time, 'available'::availability_status, 'Available for internship work'
FROM users u 
CROSS JOIN generate_series(1, 5) AS day_num
WHERE u.role = 'intern';
