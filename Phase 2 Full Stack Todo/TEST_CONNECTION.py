#!/usr/bin/env python3
"""
Test script to verify backend API functionality.
This script tests authentication and task creation endpoints.
"""

import requests
import json
import time
import sys

BASE_URL = "http://localhost:8000"

def test_api_connection():
    """Test if the API is running and accessible."""
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✅ API connection successful")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ API connection failed. Status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API connection failed: {e}")
        return False

def test_signup(email, password, name):
    """Test user signup functionality."""
    try:
        signup_data = {
            "email": email,
            "password": password,
            "name": name
        }

        response = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_data)

        if response.status_code == 200:
            result = response.json()
            print("✅ Signup successful")
            return result.get("token"), result.get("user")
        else:
            print(f"❌ Signup failed. Status: {response.status_code}")
            print(f"Response: {response.text}")
            return None, None
    except Exception as e:
        print(f"❌ Signup failed: {e}")
        return None, None

def test_signin(email, password):
    """Test user signin functionality."""
    try:
        signin_data = {
            "email": email,
            "password": password
        }

        response = requests.post(f"{BASE_URL}/api/auth/signin", json=signin_data)

        if response.status_code == 200:
            result = response.json()
            print("✅ Signin successful")
            return result.get("token"), result.get("user")
        else:
            print(f"❌ Signin failed. Status: {response.status_code}")
            print(f"Response: {response.text}")
            return None, None
    except Exception as e:
        print(f"❌ Signin failed: {e}")
        return None, None

def test_create_task(token, user_id, title, description=None):
    """Test task creation functionality."""
    try:
        task_data = {
            "title": title,
            "description": description or f"Test task created at {time.time()}",
            "due_date": None,
            "priority": "medium",
            "tags": ["test"],
            "recurrence_pattern": None,
            "reminder_offset": None
        }

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        response = requests.post(f"{BASE_URL}/api/{user_id}/tasks",
                                json=task_data, headers=headers)

        if response.status_code == 200:  # Changed from 201 to 200 as FastAPI typically returns 200
            result = response.json()
            print("✅ Task creation successful")
            return result
        else:
            print(f"❌ Task creation failed. Status: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Task creation failed: {e}")
        return None

def test_get_tasks(token, user_id):
    """Test getting tasks for a user."""
    try:
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        response = requests.get(f"{BASE_URL}/api/{user_id}/tasks", headers=headers)

        if response.status_code == 200:
            result = response.json()
            print(f"✅ Get tasks successful. Found {result.get('count', {}).get('total', 0)} tasks")
            return result
        else:
            print(f"❌ Get tasks failed. Status: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Get tasks failed: {e}")
        return None

def main():
    print("Testing Backend API Functionality...")

    # Wait a moment for the server to start if it's just been launched
    print("Waiting for server to be ready...")
    time.sleep(2)

    # Test API connection
    if not test_api_connection():
        print("❌ Cannot connect to API. Make sure the backend is running on http://localhost:8000")
        sys.exit(1)

    # Test authentication
    test_email = f"test_{int(time.time())}@example.com"
    test_password = "testpassword123"
    test_name = "Test User"

    print(f"\nTesting signup with email: {test_email}")
    token, user = test_signup(test_email, test_password, test_name)

    if not token:
        print("❌ Signup failed, attempting signin with existing user...")
        token, user = test_signin(test_email, test_password)

    if not token or not user:
        print("❌ Both signup and signin failed.")
        sys.exit(1)

    user_id = user.get("id")
    print(f"Authenticated as user: {user_id}")

    # Test task creation
    print("\nTesting task creation...")
    task = test_create_task(token, user_id, "Test Task", "This is a test task")

    if not task:
        print("❌ Task creation failed.")
        sys.exit(1)

    task_id = task.get("id")
    print(f"Created task with ID: {task_id}")

    # Test getting tasks
    print("\nTesting task retrieval...")
    tasks_result = test_get_tasks(token, user_id)

    if tasks_result:
        print("✅ All API tests passed!")
        print(f"Total tasks: {tasks_result.get('count', {}).get('total', 0)}")
        print(f"Pending tasks: {tasks_result.get('count', {}).get('pending', 0)}")
        print(f"Completed tasks: {tasks_result.get('count', {}).get('completed', 0)}")
    else:
        print("❌ Task retrieval failed.")
        sys.exit(1)

if __name__ == "__main__":
    main()