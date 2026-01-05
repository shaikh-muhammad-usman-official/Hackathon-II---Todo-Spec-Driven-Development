"""
Todo domain entities and business rules
"""
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Todo:
    """
    Todo entity representing a single task with business rules
    """
    id: str
    title: str
    description: str = ""
    completed: bool = False
    created_at: datetime = None
    completed_at: Optional[datetime] = None

    def complete(self):
        """Mark the todo as completed and record the completion time"""
        self.completed = True
        self.completed_at = datetime.now()

    def update(self, title: str = None, description: str = None):
        """Update todo properties with validation"""
        if title is not None:
            if not title.strip():
                raise ValueError("Title cannot be empty")
            self.title = title

        if description is not None:
            self.description = description

        # Re-validate the entire object after update
        self.validate()

    def validate(self):
        """Validate todo state according to business rules"""
        if not self.title or not self.title.strip():
            raise ValueError("Todo title cannot be empty")
        if len(self.title) > 200:  # reasonable limit
            raise ValueError("Todo title too long")
        if len(self.description) > 1000:  # reasonable limit
            raise ValueError("Todo description too long")

    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now()
        # Validate the todo upon creation
        self.validate()