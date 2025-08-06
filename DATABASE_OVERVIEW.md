# CIED Intern Management System - Database Schema

## Overview
The new database schema is a comprehensive system for managing internships, mentors, projects, and applications. It's designed to be scalable, maintainable, and feature-rich.

## Key Features ✨

### 1. **User Management**
- Role-based access (admin, mentor, intern, coordinator)
- Secure authentication with password hashing
- Profile management with bio, profile pictures, etc.

### 2. **Skills Management**
- Centralized skills catalog with categories
- Skill proficiency levels (beginner, intermediate, advanced, expert)
- Skills matching between mentors, interns, and projects

### 3. **Project Management**
- Project lifecycle (draft, active, completed, cancelled)
- Required vs preferred skills
- Learning objectives and deliverables
- Time commitment tracking

### 4. **Application System**
- Application status tracking (pending, reviewing, accepted, rejected, waitlisted)
- Document attachments (resume, portfolio, etc.)
- Interview scheduling and notes

### 5. **Availability Management**
- Time slot management for users
- Scheduling integration ready

## Database Tables

### Core Tables
- **users** - Base user information and authentication
- **mentors** - Extended mentor profiles and preferences
- **interns** - Student information and academic details
- **projects** - Available internship projects
- **applications** - Intern applications to projects
- **skills** - Centralized skills catalog

### Junction Tables
- **mentor_skills** - Mentor expertise and teaching capabilities
- **intern_skills** - Intern current skills and learning interests
- **project_skills** - Required/preferred skills for projects
- **intern_projects** - Active project assignments

### Supporting Tables
- **time_slots** - User availability schedules
- **application_documents** - File attachments for applications

## Sample Data Included
- 3 mentors (Software Engineer, Data Scientist, UX Designer)
- 3 interns (Computer Science, Data Science, Design students)
- 3 projects (E-commerce Development, Analytics Dashboard, UI/UX Redesign)
- 13 predefined skills across different categories
- Sample applications and availability schedules

## Views for Easy Querying
- **intern_application_details** - Complete application information
- **project_statistics** - Application counts and project metrics

## Advanced Features
- UUID primary keys for better scalability
- ENUM types for data integrity
- Automatic timestamp updates with triggers
- Proper indexing for performance
- Comprehensive foreign key relationships
- Data validation through constraints

## Database Connection Info
- **Host**: localhost:5432
- **Database**: CIED
- **User**: Andy
- **Container**: CIED (Docker)

## Next Steps for Your Website
1. **API Development**: Create REST endpoints for CRUD operations
2. **Authentication**: Implement JWT or session-based auth
3. **File Upload**: Set up document/image upload functionality
4. **Email Integration**: Notifications for application updates
5. **Dashboard**: Admin and user dashboards with statistics
6. **Search/Filter**: Advanced filtering for projects and applications
7. **Calendar Integration**: Scheduling interviews and meetings
