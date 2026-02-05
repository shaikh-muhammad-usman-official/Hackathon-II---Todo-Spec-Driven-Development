# Deployment Guide: Evolution Todo - Full Stack Application

## Overview
This guide explains how to deploy the Evolution Todo full stack application with backend and frontend components, featuring a complete black and orange styling.

## Backend Deployment (Hugging Face Space)

### 1. Prepare Backend Repository
- Fork the backend repository to your Hugging Face account
- Ensure the following files are present:
  - `Dockerfile` - Container configuration
  - `main.py` - FastAPI application
  - `requirements.txt` - Python dependencies
  - `README_HF.md` - Hugging Face Space configuration

### 2. Configure Environment Variables
In your Hugging Face Space settings, add the following secrets:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
JWT_SECRET=your_super_long_random_secret_string_for_jwt_tokens
CORS_ORIGINS=https://your-frontend-domain.hf.space,https://your-frontend-app.hf.space
```

### 3. Deploy Backend
- The Space will automatically build and deploy using the Dockerfile
- Monitor the build logs for any errors
- Once deployed, note the backend URL (e.g., `https://your-username-evolution-todo-api.hf.space`)

## Frontend Deployment (Hugging Face Space)

### 1. Prepare Frontend Repository
- Fork the frontend repository to your Hugging Face account
- Ensure the following files are present:
  - `Dockerfile` - Container configuration
  - `next.config.ts` - Next.js configuration
  - `package.json` - Node.js dependencies

### 2. Configure Environment Variables
In your Hugging Face Space settings, add the following secrets:

```
NEXT_PUBLIC_API_URL=https://your-backend-space-name.hf.space
```

### 3. Deploy Frontend
- The Space will automatically build and deploy using the Dockerfile
- The frontend will connect to your backend API

## Configuration Details

### Backend Configuration (`main.py`)
- FastAPI application with CORS enabled
- JWT authentication system
- PostgreSQL database integration
- Port 7860 for Hugging Face compatibility

### Frontend Configuration (`globals.css`)
- Complete black and orange styling implemented
- Modern, clean UI design
- Responsive layout
- Proper API connection handling

### API Integration
- Frontend connects to backend via `NEXT_PUBLIC_API_URL`
- All API calls use Axios with proper error handling
- JWT tokens stored in localStorage
- Automatic token refresh on requests

## Features Included

### Backend Features
- User authentication (signup/signin)
- Full CRUD operations for tasks
- Task management with priorities and due dates
- Bulk operations (complete/delete multiple tasks)
- Search functionality
- Data export/import (JSON/CSV)
- Statistics and analytics

### Frontend Features
- Clean black and orange UI theme
- Task management interface
- Real-time updates
- Responsive design
- Advanced filtering and sorting
- Bulk selection and operations
- Data import/export capabilities

## Testing the Connection

Once both deployments are successful:

1. Access the frontend URL
2. Create a new account or sign in
3. Verify that tasks can be created, updated, and deleted
4. Check that all API endpoints are working properly
5. Test bulk operations and search functionality

## Troubleshooting

### Common Issues:
- Ensure CORS_ORIGINS includes the frontend URL
- Verify JWT_SECRET is the same length as required
- Check that DATABASE_URL is properly formatted
- Confirm port configurations match (7860 for backend)

### API Connection Issues:
- Verify NEXT_PUBLIC_API_URL is correctly set
- Check browser console for CORS errors
- Ensure backend is accessible from frontend

## Security Considerations
- Store JWT_SECRET securely as a secret
- Use HTTPS for production deployments
- Validate all user inputs
- Implement rate limiting if needed