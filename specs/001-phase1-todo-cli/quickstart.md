# Quickstart Guide: Phase I Todo CLI (In-Memory)

**Feature**: Phase I Todo CLI (In-Memory)
**Date**: 2025-12-31

## Prerequisites
- Python 3.13+
- uv package manager

## Setup
1. Install dependencies: `uv sync`
2. Run the application: `uv run todo --help`

## Basic Usage

### Add a Todo
```bash
uv run todo add "Buy groceries"
```

### List Todos
```bash
uv run todo list
```

### Complete a Todo
```bash
uv run todo complete <id>
```

### Delete a Todo
```bash
uv run todo delete <id>
```

## Example Workflow
```bash
# Add todos
uv run todo add "Buy milk"
uv run todo add "Walk the dog"
uv run todo add "Finish report"

# List all todos
uv run todo list

# Complete a todo
uv run todo complete 1

# Delete a todo
uv run todo delete 2

# List todos again
uv run todo list
```

## Error Handling
- Invalid commands will show help text and exit with code 1
- Invalid IDs will show error on stderr and exit with code 1
- Missing arguments will show error on stderr and exit with code 1

## Testing
Run all tests: `uv run pytest`
Run specific test: `uv run pytest tests/test_cli_add.py`