# Todo In-Memory Python Console App

A command-line todo application built with Python, using Rich for formatting and following clean architecture principles.

## Features

- Add, list, complete, and delete todo items
- Rich console interface with formatted tables
- In-memory storage for todos (no persistence)
- Clean architecture with domain, repository, services, and CLI layers
- Comprehensive test suite

## Requirements

- Python 3.14+
- uv package manager
- rich library
- pytest (for testing)

## Installation

1. Make sure you have uv installed
2. Install dependencies: `uv sync`
3. Run the application: `uv run python -m todo_app.main`

## Usage

The application supports both command-line and interactive modes:

### Command-line mode:
```bash
# Add a new todo
uv run python -m todo_app.main add "Buy groceries"
# Or with description
uv run python -m todo_app.main add "Buy groceries" --description "Milk, bread, eggs"

# List all todos
uv run python -m todo_app.main list

# Complete a todo
uv run python -m todo_app.main complete <todo-id>

# Delete a todo
uv run python -m todo_app.main delete <todo-id>

# Update a todo
uv run python -m todo_app.main update <todo-id> --title "New title" --description "New description"

# Run interactive mode (explicit)
uv run python -m todo_app.main interactive
```

### Interactive mode (Default):
Run `uv run python -m todo_app.main` to enter the enhanced interactive menu system by default. The interactive mode features:

- Beautiful Rich-based UI with styled panels and emojis
- Intuitive menu with command numbers (1-6) or command names
- Visual feedback and error handling
- Support for both numeric input (1, 2, 3, 4, 5, 6) and command names (add, list, complete, delete, update, quit)
- Clear help system and user-friendly prompts

Commands available in interactive mode:
- **1 or "add"**: Add a new todo
- **2 or "list"**: List all todos
- **3 or "complete"**: Mark a todo as completed
- **4 or "delete"**: Remove a todo
- **5 or "update"**: Modify a todo
- **6 or "quit"**: Exit interactive mode

## Project Structure

```
todo_app/
├── __init__.py
├── domain.py          # Todo entity & domain rules
├── repository.py      # In-memory storage logic
├── services.py        # Business operations (add/list/complete/delete)
├── cli.py             # CLI command handling
└── main.py            # CLI entry point

tests/
├── __init__.py
├── test_domain.py
├── test_services.py
├── test_cli_add.py
├── test_cli_list.py
├── test_cli_complete.py
└── test_cli_delete.py
```

## Architecture

The application follows clean architecture principles:

- **Domain Layer**: Contains the Todo entity and business rules
- **Repository Layer**: Handles in-memory storage and retrieval
- **Services Layer**: Implements business operations and validation
- **CLI Layer**: Provides user interface using Rich

## Running Tests

Execute the test suite with: `uv run python -m pytest tests/`

## License

MIT