"""
Tests for the CLI list command
"""
from io import StringIO
import sys
from todo_app.services import TodoService
from todo_app.repository import TodoRepository
from todo_app.cli import TodoCLI


class TestCliList:
    """Tests for the CLI list command"""

    def test_list_command_with_todos(self):
        """Test that list command shows todos when they exist"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Add some todos
        service.add_todo("Todo 1", "Description 1")
        service.add_todo("Todo 2", "Description 2")

        # Capture stdout
        captured_output = StringIO()
        sys.stdout = captured_output

        result = cli.list()

        # Restore stdout
        sys.stdout = sys.__stdout__

        output = captured_output.getvalue()
        assert result == 0
        assert "Todo 1" in output
        assert "Todo 2" in output
        assert "Description 1" in output
        assert "Description 2" in output

    def test_list_command_empty_state(self):
        """Test that list command shows empty message when no todos exist"""
        repository = TodoRepository()
        service = TodoService(repository)
        cli = TodoCLI(service)

        # Capture stdout
        captured_output = StringIO()
        sys.stdout = captured_output

        result = cli.list()

        # Restore stdout
        sys.stdout = sys.__stdout__

        output = captured_output.getvalue()
        assert result == 0
        assert "No todos found" in output