"""
Unit tests for Todo services
"""
import pytest
from todo_app.services import TodoService
from todo_app.repository import TodoRepository
from todo_app.domain import Todo


class TestTodoService:
    """Tests for the TodoService"""

    @pytest.fixture
    def service(self):
        """Create a fresh service for each test"""
        repository = TodoRepository()
        return TodoService(repository)

    def test_add_todo_creates_new_todo(self, service):
        """Test adding a new todo"""
        todo = service.add_todo("Test Title", "Test Description")

        assert todo.title == "Test Title"
        assert todo.description == "Test Description"
        assert todo.completed is False
        assert todo.id is not None
        assert len(service.list_todos()) == 1

    def test_add_todo_without_description(self, service):
        """Test adding a todo without description"""
        todo = service.add_todo("Test Title")

        assert todo.title == "Test Title"
        assert todo.description == ""
        assert todo.id is not None

    def test_get_todo_by_id(self, service):
        """Test getting a todo by ID"""
        original = service.add_todo("Test Title")
        retrieved = service.get_todo(original.id)

        assert retrieved is not None
        assert retrieved.id == original.id
        assert retrieved.title == original.title

    def test_get_nonexistent_todo_returns_none(self, service):
        """Test getting a non-existent todo returns None"""
        result = service.get_todo("nonexistent")

        assert result is None

    def test_list_todos_returns_all_todos(self, service):
        """Test listing all todos"""
        service.add_todo("Todo 1")
        service.add_todo("Todo 2")

        todos = service.list_todos()

        assert len(todos) == 2

    def test_update_todo_updates_fields(self, service):
        """Test updating a todo's fields"""
        original = service.add_todo("Original Title", "Original Description")
        updated = service.update_todo(original.id, "New Title", "New Description")

        assert updated is not None
        assert updated.title == "New Title"
        assert updated.description == "New Description"

    def test_update_todo_partial_fields(self, service):
        """Test updating only one field of a todo"""
        original = service.add_todo("Original Title", "Original Description")
        updated = service.update_todo(original.id, title="New Title")  # Only update title

        assert updated is not None
        assert updated.title == "New Title"
        assert updated.description == "Original Description"  # Description should remain unchanged

    def test_update_nonexistent_todo_returns_none(self, service):
        """Test updating a non-existent todo returns None"""
        result = service.update_todo("nonexistent", "New Title")

        assert result is None

    def test_complete_todo_marks_as_completed(self, service):
        """Test completing a todo"""
        original = service.add_todo("Test Title")
        assert original.completed is False

        completed = service.complete_todo(original.id)

        assert completed is not None
        assert completed.completed is True
        assert completed.completed_at is not None

    def test_complete_nonexistent_todo_returns_none(self, service):
        """Test completing a non-existent todo returns None"""
        result = service.complete_todo("nonexistent")

        assert result is None

    def test_delete_todo_removes_from_repository(self, service):
        """Test deleting a todo removes it from repository"""
        original = service.add_todo("Test Title")
        assert len(service.list_todos()) == 1

        success = service.delete_todo(original.id)

        assert success is True
        assert len(service.list_todos()) == 0

    def test_delete_nonexistent_todo_returns_false(self, service):
        """Test deleting a non-existent todo returns False"""
        result = service.delete_todo("nonexistent")

        assert result is False

    def test_get_completed_todos_only_returns_completed(self, service):
        """Test getting only completed todos"""
        todo1 = service.add_todo("Todo 1")
        todo2 = service.add_todo("Todo 2")
        service.complete_todo(todo1.id)

        completed = service.get_completed_todos()
        pending = service.get_pending_todos()

        assert len(completed) == 1
        assert len(pending) == 1
        assert completed[0].id == todo1.id
        assert pending[0].id == todo2.id