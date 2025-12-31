"""
Business services for Todo operations
"""
from typing import List, Optional
from .domain import Todo
from .repository import TodoRepository


class TodoService:
    """
    Business service for todo operations
    """
    def __init__(self, repository: TodoRepository):
        self.repository = repository

    def add_todo(self, title: str, description: str = "") -> Todo:
        """Add a new todo with validation"""
        todo = Todo(
            id="",  # Will be set by repository
            title=title,
            description=description
        )
        todo.validate()
        return self.repository.add(todo)

    def get_todo(self, todo_id: str) -> Optional[Todo]:
        """Get a todo by ID"""
        return self.repository.get(todo_id)

    def list_todos(self) -> List[Todo]:
        """List all todos"""
        return self.repository.list_all()

    def update_todo(self, todo_id: str, title: str = None, description: str = None) -> Optional[Todo]:
        """Update a todo with validation"""
        existing = self.repository.get(todo_id)
        if not existing:
            return None

        existing.update(title=title, description=description)
        existing.validate()
        return self.repository.update(existing)

    def complete_todo(self, todo_id: str) -> Optional[Todo]:
        """Mark a todo as completed"""
        existing = self.repository.get(todo_id)
        if not existing:
            return None

        existing.complete()
        return self.repository.update(existing)

    def delete_todo(self, todo_id: str) -> bool:
        """Delete a todo by ID"""
        return self.repository.delete(todo_id)

    def get_completed_todos(self) -> List[Todo]:
        """Get all completed todos"""
        return [todo for todo in self.repository.list_all() if todo.completed]

    def get_pending_todos(self) -> List[Todo]:
        """Get all pending todos"""
        return [todo for todo in self.repository.list_all() if not todo.completed]