"""
Unit tests for Todo domain entities
"""
import pytest
from datetime import datetime
from todo_app.domain import Todo


class TestTodo:
    """Tests for the Todo entity"""

    def test_create_todo_with_required_fields(self):
        """Test creating a todo with required fields"""
        todo = Todo(id="123", title="Test Todo")
        assert todo.id == "123"
        assert todo.title == "Test Todo"
        assert todo.description == ""
        assert todo.completed is False
        assert todo.created_at is not None
        assert todo.completed_at is None

    def test_create_todo_with_all_fields(self):
        """Test creating a todo with all fields"""
        created_time = datetime.now()
        todo = Todo(
            id="123",
            title="Test Todo",
            description="Test Description",
            completed=False,
            created_at=created_time
        )
        assert todo.id == "123"
        assert todo.title == "Test Todo"
        assert todo.description == "Test Description"
        assert todo.completed is False
        assert todo.created_at == created_time
        assert todo.completed_at is None

    def test_complete_marks_as_completed(self):
        """Test that complete() marks todo as completed"""
        todo = Todo(id="123", title="Test Todo")
        assert todo.completed is False
        assert todo.completed_at is None

        todo.complete()
        assert todo.completed is True
        assert todo.completed_at is not None

    def test_update_title(self):
        """Test updating todo title"""
        todo = Todo(id="123", title="Original Title")
        todo.update(title="New Title")
        assert todo.title == "New Title"

    def test_update_description(self):
        """Test updating todo description"""
        todo = Todo(id="123", title="Test Todo", description="Original Description")
        todo.update(description="New Description")
        assert todo.description == "New Description"

    def test_update_both_fields(self):
        """Test updating both title and description"""
        todo = Todo(id="123", title="Original Title", description="Original Description")
        todo.update(title="New Title", description="New Description")
        assert todo.title == "New Title"
        assert todo.description == "New Description"

    def test_validate_empty_title_raises_error(self):
        """Test that empty title raises ValueError"""
        todo = Todo(id="123", title="Valid Title")
        with pytest.raises(ValueError, match="Title cannot be empty"):
            todo.update(title="")

    def test_validate_empty_title_on_creation_raises_error(self):
        """Test that creating todo with empty title raises ValueError"""
        with pytest.raises(ValueError, match="Todo title cannot be empty"):
            Todo(id="123", title="")

    def test_validate_empty_title_after_stripping_raises_error(self):
        """Test that creating todo with whitespace-only title raises ValueError"""
        with pytest.raises(ValueError, match="Todo title cannot be empty"):
            Todo(id="123", title="   ")

    def test_validate_long_title_raises_error(self):
        """Test that very long title raises ValueError"""
        long_title = "x" * 201  # Exceeds 200 character limit
        with pytest.raises(ValueError, match="Todo title too long"):
            Todo(id="123", title=long_title)

    def test_validate_long_description_raises_error(self):
        """Test that very long description raises ValueError"""
        todo = Todo(id="123", title="Valid Title")
        long_description = "x" * 1001  # Exceeds 1000 character limit
        with pytest.raises(ValueError, match="Todo description too long"):
            todo.update(description=long_description)