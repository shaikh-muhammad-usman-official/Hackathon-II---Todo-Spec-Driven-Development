@echo off
REM Phase 4 Backend Local Development Startup Script

echo Starting Phase 4 Backend with local database configuration...

REM Set environment for local development
set ENVIRONMENT=development
set DATABASE_URL=sqlite:///./local_todo_dev.db

REM Navigate to backend directory
cd /d "%~dp0\Phase 4 Local Kubernetes Deployment\Backend"

REM Check if virtual environment exists, if not create it
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/update dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start the backend server
echo Starting backend server...
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause