# CLI Contract: Todo Application

**Version**: 1.0
**Feature**: Phase I Todo CLI (In-Memory)
**Date**: 2025-12-31

## Command Structure
```
todo <command> [arguments]
```

## Commands

### `add` - Add a new todo
**Usage**: `todo add <title>`
**Input**: Title as string argument
**Output**: Todo details printed to stdout
**Success Exit Code**: 0
**Error Exit Code**: 1
**Error Conditions**:
- Missing title argument

### `list` - List all todos
**Usage**: `todo list`
**Input**: No arguments
**Output**: Table of todos to stdout
**Success Exit Code**: 0
**Error Exit Code**: 1
**Error Conditions**: None

### `complete` - Mark todo as completed
**Usage**: `todo complete <id>`
**Input**: ID as string argument
**Output**: Success message to stdout
**Success Exit Code**: 0
**Error Exit Code**: 1
**Error Conditions**:
- Missing ID argument
- Invalid ID format
- Todo with ID not found

### `delete` - Delete a todo
**Usage**: `todo delete <id>`
**Input**: ID as string argument
**Output**: Success message to stdout
**Success Exit Code**: 0
**Error Exit Code**: 1
**Error Conditions**:
- Missing ID argument
- Invalid ID format
- Todo with ID not found

## Error Handling
- All errors output to stderr
- All error exit codes are non-zero
- Error messages are human-readable

## Output Format
- Normal output to stdout
- Error output to stderr
- Rich-formatted tables for list command
- Clear visual distinction between completed/incomplete todos