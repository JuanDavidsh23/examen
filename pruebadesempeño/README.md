# CRUDTASK 

## Description
CRUDTASK is a web application dedicated to the management of academic tasks that allows users to register, log in, manage their tasks and profile, as well as providing an administration panel to monitor system activity.



### For Users
**Registration and Login** - Create an account and access the system
**Dashboard** - View all tasks in an intuitive interface
**Task CRUD** - Create, read, update, and delete tasks
**Profile Management** - Edit personal data and password
**Task Filtering** - View tasks by status (all, pending, completed)
**Statistics** - View a summary of completed and pending tasks

### For Administrators
-**Control Panel** - Dashboard with system statistics
**User Management** - View, search, and delete users
**Task Monitoring** - View all system tasks
**System Activity** - Monitor user activity
**Global Statistics** - Rate of completeness, total tasks, etc.



## Installation and Configuration

### 1. Prerequisites
- Node.js installed
- npm (package manager)

### 2. Installing Dependencies
```bash
cd pruebadesempeño
npm install
```

### 3. Starting the json-server (API)
In a terminal:
```bash
npx json-server --watch db.json
```
This will start the server at `http://localhost:3000`

### 4. Starting Vite (Development Server)
In another terminal:
```bash
npm run dev
```

### 5. Accessing the Application
- Open your browser to `http://localhost:5173` (or the URL provided by Vite)

## Test Credentials

### Regular User
- Email: `santamariajuan34@gmail.com`
- Password: `123456`

### Administrator
- Email: `admin@crudtask.com`
- Password: `admin123`

## Usage Flow

### As a Regular User
1. **Register**: Create a new account at `/public/views/register.html`
2. **Login**: Log in with your credentials on the homepage
3. **Dashboard**: View all your tasks
4. **Create Task**: Click "+ New Task" to create a task
5. **Edit/Delete**: Manage your tasks using the action buttons
6. **Profile**: Update your personal information in "My Profile"

### As an Administrator
1. **Login**: Use admin credentials
2. **Admin Panel**: Automatically access the admin panel
3. **Users**: View and manage all system users
4. **Tasks**: Monitor all tasks for all users
5. **Statistics**: Monitor system activity

## Data Structure

### Users
```json
{
"id": "abc123",
"name": "Juan Pérez",
"email": "juan@example.com",
"password": "123456",
"role": "user|admin",
"registrationdate": "2026-02-02T12:00:00Z"
}
```

### Tasks
```json
{
"id": "task123",
"title": "Example Task",
"description": "Task Description",
"dueDate": "2026-02-15",
"priority": "high|medium|low",
"status": "pending|completed",

"userId": "abc123",

"creationDate": "2026-02-02T12:00:00Z"
}
```

## Technical Features

- **Local Authentication**: Use of localStorage to maintain session
- **Validation**: Validation of emails, passwords, and required fields
- **RESTful API**: Consumption of json-server
- **Route Protection**: Redirection based on authentication and role
- **Responsive Interface**: Adaptable design for different screen sizes
- **Filtering and Search**: Real-time filtering functionalities

## Security Notes

⚠️ **IMPORTANT**: This is a demo application. In production:
- Never store passwords in plain text
- Implement secure authentication (JWT, OAuth)
- Use real databases (MongoDB, PostgreSQL, etc.)
- Implement server-side validation
- Use HTTPS
- Implement CORS correctly

## Future Development

- [ ] Authentication with JWT
- [ ] Password hashing (bcrypt)
- [ ] Task due date notifications
- [ ] Grading system
- [ ] Report export
- [ ] Dark themes
- [ ] Real-time notifications (WebSockets)
- [ ] Calendar integration

## Support

For problems or questions, make sure to:
1. Verify that json-server is running
2. Verify that Vite is running
3. Check the browser console (F12)
4. Check the terminal console for errors

## License

This project is open source.