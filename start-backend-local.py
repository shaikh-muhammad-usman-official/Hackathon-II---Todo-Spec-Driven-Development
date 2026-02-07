#!/usr/bin/env python3
"""
Phase 4 Backend Local Development Startup Script
"""

import os
import sys
import subprocess
import platform
from pathlib import Path

def main():
    print("Starting Phase 4 Backend with local database configuration...")

    # Set environment for local development
    os.environ['ENVIRONMENT'] = 'development'
    os.environ['DATABASE_URL'] = 'sqlite:///./local_todo_dev.db'

    # Navigate to backend directory
    project_root = Path(__file__).parent
    backend_dir = project_root / "Phase 4 Local Kubernetes Deployment" / "Backend"

    if not backend_dir.exists():
        print(f"Error: Backend directory not found at {backend_dir}")
        sys.exit(1)

    os.chdir(backend_dir)

    # Check if virtual environment exists, if not create it
    venv_dir = backend_dir / "venv"
    if not venv_dir.exists():
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"])

    # Determine the Python executable path in the virtual environment
    if platform.system() == "Windows":
        python_exe = venv_dir / "Scripts" / "python.exe"
    else:
        python_exe = venv_dir / "bin" / "python"

    # Install/update dependencies
    print("Installing dependencies...")
    subprocess.run([str(python_exe), "-m", "pip", "install", "-r", "requirements.txt"])

    # Start the backend server
    print("Starting backend server...")
    subprocess.run([
        str(python_exe), "-m", "uvicorn",
        "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"
    ])

if __name__ == "__main__":
    main()