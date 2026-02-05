# Evolution Todo App - Full Stack Application

This is a full-stack todo application with authentication and advanced task management features. The application consists of a FastAPI backend and a Next.js frontend.

## Features

- **Authentication**: Secure JWT-based authentication with signup/signin
- **Task Management**: Create, read, update, delete, and toggle completion of tasks
- **Advanced Features**: Due dates, priorities, tags, recurrence patterns, and notifications
- **User Preferences**: Customizable settings and themes
- **Responsive UI**: Modern UI with shadcn/ui components

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.12 (for local development)

## Running with Docker Compose (Recommended)

1. Navigate to the project root directory:
   ```bash
   cd hackathon-todo-app
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Local Development Setup

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd Phase 2 Full Stack ToDo_App/backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables (copy `.env.example` to `.env` and update values)

4. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd Phase 2 Full Stack ToDo_App/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{task_id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{task_id}` - Update a task
- `PATCH /api/{user_id}/tasks/{task_id}/complete` - Toggle task completion
- `DELETE /api/{user_id}/tasks/{task_id}` - Delete a task

## Troubleshooting

- If you encounter CORS issues, ensure the `CORS_ORIGINS` environment variable includes your frontend URL
- If authentication fails, check that JWT_SECRET is consistent between frontend and backend
- For database issues, verify that PostgreSQL is running and accessible

## Testing

To test the API functionality, run the test script:
```bash
python test_api.py
```