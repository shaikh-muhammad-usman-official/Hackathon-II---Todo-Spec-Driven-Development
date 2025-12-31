"""
Integration tests for the Todo Console Application
"""
import pytest
from todo_app import TodoManager


class TestTodoAppIntegration:
    """Integration tests for the todo application"""

    def test_todo_lifecycle(self):
        """Test the full lifecycle of a todo item"""
        manager = TodoManager()

        # Add a new todo
        todo = manager.add_todo("Test Task", "Test Description")
        assert todo.title == "Test Task"
        assert todo.description == "Test Description"
        assert todo.completed is False

        # List todos and verify it's there
        todos = manager.list_todos()
        assert len(todos) == 1
        assert todos[0].id == todo.id

        # Complete the todo
        result = manager.complete_todo(todo.id)
        assert result is True
        assert todo.completed is True

        # Verify it's in completed list
        completed = manager.get_completed_todos()
        assert len(completed) == 1
        assert completed[0].id == todo.id

        # Verify it's not in pending list
        pending = manager.get_pending_todos()
        assert len(pending) == 0

        # Delete the todo
        result = manager.delete_todo(todo.id)
        assert result is True
        assert len(manager.list_todos()) == 0

    def test_multiple_todos(self):
        """Test managing multiple todo items"""
        manager = TodoManager()

        # Add multiple todos
        todo1 = manager.add_todo("Task 1", "Description 1")
        todo2 = manager.add_todo("Task 2", "Description 2")
        todo3 = manager.add_todo("Task 3", "Description 3")

        # Verify all are added
        all_todos = manager.list_todos()
        assert len(all_todos) == 3

        # Complete one
        manager.complete_todo(todo2.id)

        # Verify counts
        assert len(manager.get_completed_todos()) == 1
        assert len(manager.get_pending_todos()) == 2

        # Update one
        manager.update_todo(todo1.id, title="Updated Task 1", description="Updated Description 1")
        updated_todo = manager.get_todo(todo1.id)
        assert updated_todo.title == "Updated Task 1"
        assert updated_todo.description == "Updated Description 1"