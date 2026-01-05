"""
Tests for the CLI delete command
"""
from io import StringIO
import sys
from todo_app.services import TodoService
from todo_app.repository import TodoRepository
from todo_app.cli import TodoCLI


class TestCliDelete:
    """Tests for the CLI delete command"""

    def test_delete_command_success(self):
        """Test that delete command successfully removes todo"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Add a todo first
        todo = service.add_todo("Test Todo")
        assert len(repository.list_all()) == 1

        # Capture stdout
        captured_output = StringIO()
        sys.stdout = captured_output

        result = cli.delete(todo.id)

        # Restore stdout
        sys.stdout = sys.__stdout__

        output = captured_output.getvalue()
        assert result == 0
        assert "✓ Deleted todo" in output

        # Verify the todo is actually deleted
        assert len(repository.list_all()) == 0

    def test_delete_command_nonexistent_todo(self):
        """Test that delete command shows error for non-existent todo"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Capture stderr
        captured_output = StringIO()
        sys.stderr = captured_output

        result = cli.delete("nonexistent")

        # Restore stderr
        sys.stderr = sys.__stderr__

        output = captured_output.getvalue()
        assert result == 1
        assert "not found" in output