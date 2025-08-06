# Suggested API Endpoints for CIED Website

## Authentication Endpoints
```
POST /api/auth/login          # User login
POST /api/auth/logout         # User logout
POST /api/auth/register       # New user registration
GET  /api/auth/me            # Get current user info
PUT  /api/auth/profile       # Update user profile
```

## User Management
```
GET  /api/users              # List all users (admin only)
GET  /api/users/:id          # Get specific user
PUT  /api/users/:id          # Update user
DELETE /api/users/:id        # Delete user (admin only)
```

## Projects
```
GET  /api/projects           # List all projects (with filters)
POST /api/projects           # Create new project (mentor/admin)
GET  /api/projects/:id       # Get project details
PUT  /api/projects/:id       # Update project
DELETE /api/projects/:id     # Delete project
GET  /api/projects/:id/applications  # Get project applications
```

## Applications
```
GET  /api/applications       # List applications (filtered by user role)
POST /api/applications       # Submit new application
GET  /api/applications/:id   # Get application details
PUT  /api/applications/:id   # Update application status
DELETE /api/applications/:id # Withdraw application
POST /api/applications/:id/documents # Upload documents
```

## Skills
```
GET  /api/skills             # List all skills
POST /api/skills             # Add new skill (admin)
GET  /api/skills/categories  # Get skill categories
PUT  /api/users/:id/skills   # Update user skills
```

## Mentors
```
GET  /api/mentors            # List all mentors
GET  /api/mentors/:id        # Get mentor profile
GET  /api/mentors/:id/projects # Get mentor's projects
PUT  /api/mentors/:id        # Update mentor profile
```

## Interns
```
GET  /api/interns            # List all interns
GET  /api/interns/:id        # Get intern profile
GET  /api/interns/:id/applications # Get intern's applications
PUT  /api/interns/:id        # Update intern profile
```

## Time Slots / Availability
```
GET  /api/users/:id/availability    # Get user availability
PUT  /api/users/:id/availability    # Update availability
POST /api/scheduling/meetings       # Schedule meetings
```

## Dashboard & Statistics
```
GET  /api/dashboard/admin          # Admin dashboard data
GET  /api/dashboard/mentor         # Mentor dashboard data
GET  /api/dashboard/intern         # Intern dashboard data
GET  /api/statistics/projects      # Project statistics
GET  /api/statistics/applications  # Application statistics
```

## File Upload
```
POST /api/upload/resume           # Upload resume
POST /api/upload/portfolio        # Upload portfolio
POST /api/upload/profile-picture  # Upload profile picture
GET  /api/files/:id              # Download file
```

## Notifications (Future)
```
GET  /api/notifications          # Get user notifications
POST /api/notifications/mark-read # Mark notifications as read
POST /api/notifications/send     # Send notification (admin)
```

## Sample Implementation (Node.js/Express)

```javascript
// Example: Get projects with filtering
app.get('/api/projects', async (req, res) => {
  try {
    const { 
      status = 'active', 
      skills = [], 
      mentor_id,
      page = 1, 
      limit = 10 
    } = req.query;

    const offset = (page - 1) * limit;
    
    let query = `
      SELECT p.*, u.first_name as mentor_name, u.last_name as mentor_last_name
      FROM projects p
      JOIN mentors m ON p.mentor_id = m.id
      JOIN users u ON m.id = u.id
      WHERE p.status = $1
    `;
    
    const params = [status];
    
    if (mentor_id) {
      query += ` AND p.mentor_id = $${params.length + 1}`;
      params.push(mentor_id);
    }
    
    if (skills.length > 0) {
      query += ` AND p.required_skills && $${params.length + 1}`;
      params.push(skills);
    }
    
    query += ` ORDER BY p.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    
    res.json({
      projects: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.rowCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Database Query Examples

```sql
-- Get all projects with application counts
SELECT 
  p.*,
  COUNT(a.id) as application_count,
  u.first_name as mentor_name
FROM projects p
LEFT JOIN applications a ON p.id = a.project_id
JOIN mentors m ON p.mentor_id = m.id
JOIN users u ON m.id = u.id
GROUP BY p.id, u.first_name
ORDER BY p.created_at DESC;

-- Get intern with their skills
SELECT 
  u.first_name, u.last_name,
  i.major, i.university,
  s.name as skill_name,
  is.proficiency_level
FROM interns i
JOIN users u ON i.id = u.id
LEFT JOIN intern_skills is ON i.id = is.intern_id
LEFT JOIN skills s ON is.skill_id = s.id
WHERE u.email = 'emma.davis@university.edu';

-- Find matching mentors for a project
SELECT DISTINCT
  u.first_name, u.last_name,
  m.department,
  ms.proficiency_level
FROM mentors m
JOIN users u ON m.id = u.id
JOIN mentor_skills ms ON m.id = ms.mentor_id
JOIN skills s ON ms.skill_id = s.id
WHERE s.name = ANY(ARRAY['JavaScript', 'React', 'Node.js'])
  AND ms.can_teach = true
  AND m.current_interns < m.max_interns;
```
