"""
Tests for the CLI add command
"""
from io import StringIO
import sys
from unittest.mock import patch
from todo_app.services import TodoService
from todo_app.repository import TodoRepository
from todo_app.cli import TodoCLI


class TestCliAdd:
    """Tests for the CLI add command"""

    def test_add_command_success(self):
        """Test that add command successfully adds a todo"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Capture stdout
        captured_output = StringIO()
        sys.stdout = captured_output

        result = cli.add("Test Title", "Test Description")

        # Restore stdout
        sys.stdout = sys.__stdout__

        output = captured_output.getvalue()
        assert result == 0
        assert "✓ Added todo: Test Title" in output
        assert len(repository.list_all()) == 1

        # Check the created todo
        todo = repository.list_all()[0]
        assert todo.title == "Test Title"
        assert todo.description == "Test Description"

    def test_add_command_without_description(self):
        """Test that add command works without description"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Capture stdout
        captured_output = StringIO()
        sys.stdout = captured_output

        result = cli.add("Test Title")

        # Restore stdout
        sys.stdout = sys.__stdout__

        output = captured_output.getvalue()
        assert result == 0
        assert "✓ Added todo: Test Title" in output
        assert len(repository.list_all()) == 1

        # Check the created todo
        todo = repository.list_all()[0]
        assert todo.title == "Test Title"
        assert todo.description == ""

    def test_add_command_with_invalid_title_shows_error(self):
        """Test that add command shows error for invalid title"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Capture stderr
        captured_output = StringIO()
        sys.stderr = captured_output

        result = cli.add("")  # Empty title should fail

        # Restore stderr
        sys.stderr = sys.__stderr__

        output = captured_output.getvalue()
        assert result == 1
        assert "Error:" in output
        assert len(repository.list_all()) == 0