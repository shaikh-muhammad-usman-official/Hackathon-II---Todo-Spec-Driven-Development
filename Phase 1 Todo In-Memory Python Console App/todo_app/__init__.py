"""
Todo In-Memory Python Console Application - Main Package
"""

from .domain import Todo as TodoItem
from .services import TodoService
from .repository import TodoRepository
from typing import List, Optional


class TodoManager:
    """
    Adapter class to match the expected interface in main.py
    """
    def __init__(self):
        self.repository = TodoRepository()
        self.service = TodoService(self.repository)

    def add_todo(self, title: str, description: str = "") -> TodoItem:
        """Add a new todo item"""
        return self.service.add_todo(title, description)

    def get_todo(self, todo_id: str) -> Optional[TodoItem]:
        """Get a todo item by ID"""
        return self.service.get_todo(todo_id)

    def list_todos(self) -> List[TodoItem]:
        """Get all todo items"""
        return self.service.list_todos()

    def update_todo(self, todo_id: str, title: str = None, description: str = None) -> bool:
        """Update a todo item"""
        result = self.service.update_todo(todo_id, title, description)
        return result is not None

    def complete_todo(self, todo_id: str) -> bool:
        """Mark a todo item as completed"""
        result = self.service.complete_todo(todo_id)
        return result is not None

    def delete_todo(self, todo_id: str) -> bool:
        """Delete a todo item"""
        return self.service.delete_todo(todo_id)

    def get_completed_todos(self) -> List[TodoItem]:
        """Get all completed todo items"""
        return self.service.get_completed_todos()

    def get_pending_todos(self) -> List[TodoItem]:
        """Get all pending todo items"""
        return self.service.get_pending_todos()


__all__ = ['TodoItem', 'TodoManager']