"""
Tests for the CLI complete command
"""
from io import StringIO
import sys
from todo_app.services import TodoService
from todo_app.repository import TodoRepository
from todo_app.cli import TodoCLI


class TestCliComplete:
    """Tests for the CLI complete command"""

    def test_complete_command_success(self):
        """Test that complete command successfully marks todo as completed"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Add a todo first
        todo = service.add_todo("Test Todo")

        # Capture stdout
        captured_output = StringIO()
        sys.stdout = captured_output

        result = cli.complete(todo.id)

        # Restore stdout
        sys.stdout = sys.__stdout__

        output = captured_output.getvalue()
        assert result == 0
        assert "✓ Completed todo: Test Todo" in output

        # Verify the todo is actually completed
        updated_todo = service.get_todo(todo.id)
        assert updated_todo.completed is True

    def test_complete_command_nonexistent_todo(self):
        """Test that complete command shows error for non-existent todo"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Capture stderr
        captured_output = StringIO()
        sys.stderr = captured_output

        result = cli.complete("nonexistent")

        # Restore stderr
        sys.stderr = sys.__stderr__

        output = captured_output.getvalue()
        assert result == 1
        assert "not found" in output