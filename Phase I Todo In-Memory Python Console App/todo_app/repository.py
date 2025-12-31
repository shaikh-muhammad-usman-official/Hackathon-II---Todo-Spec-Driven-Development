"""
In-memory repository for Todo entities
"""
from typing import Dict, List, Optional
from .domain import Todo


class TodoRepository:
    """
    In-memory repository for managing Todo entities
    """
    def __init__(self):
        self._todos: Dict[str, Todo] = {}
        self._next_id = 1

    def add(self, todo: Todo) -> Todo:
        """Add a new todo to the repository"""
        # Generate a sequential integer ID if not provided
        if todo.id is None or todo.id == "":
            todo.id = str(self._next_id)
            self._next_id += 1
        self._todos[todo.id] = todo
        return todo

    def get(self, todo_id: str) -> Optional[Todo]:
        """Get a todo by ID"""
        return self._todos.get(todo_id)

    def update(self, todo: Todo) -> Optional[Todo]:
        """Update an existing todo"""
        if todo.id in self._todos:
            self._todos[todo.id] = todo
            return todo
        return None

    def delete(self, todo_id: str) -> bool:
        """Delete a todo by ID"""
        if todo_id in self._todos:
            del self._todos[todo_id]
            return True
        return False

    def list_all(self) -> List[Todo]:
        """Get all todos"""
        return list(self._todos.values())

    def clear(self):
        """Clear all todos (for testing purposes)"""
        self._todos.clear()