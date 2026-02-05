# Startup Instructions for Evolution Todo - Full Stack Application

## Running the Backend Server

### Prerequisites
- Python 3.12+
- PostgreSQL database (or Neon DB connection)

### Steps to Start Backend
1. Navigate to the backend directory:
   ```bash
   cd Phase 2 Full Stack Todo/backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Ensure your `.env` file contains:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_NVJzxGUuie47@ep-ancient-leaf-ahnj197d-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-frontend-space.hf.space,https://your-backend-space.hf.space
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the backend server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

The backend will be available at `http://localhost:8000`

## Running the Frontend Server

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps to Start Frontend
1. Navigate to the frontend directory:
   ```bash
   cd Phase 2 Full Stack Todo/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure your `.env` file contains:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Testing the Connection

Once both servers are running:

1. Open your browser and go to `http://localhost:3000`
2. You should be able to sign up or sign in
3. Test creating, updating, and deleting tasks
4. Verify that all functionality works as expected

## API Endpoints

The backend provides the following key endpoints:
- `GET /` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET/POST/PUT/DELETE /api/{user_id}/tasks` - Task operations

## Troubleshooting

If you encounter issues:
1. Verify that the backend is running on port 8000
2. Check that CORS settings allow localhost:3000
3. Ensure database connection is working
4. Verify JWT secret is properly set
5. Check browser console for frontend errors
6. Check terminal for backend errors