# Research: Phase I Todo CLI (In-Memory)

**Feature**: Phase I Todo CLI (In-Memory)
**Date**: 2025-12-31
**Status**: Complete

## Research Summary

This research document addresses all technical decisions and clarifications needed for the Phase I Todo CLI implementation.

## Decision: Python CLI Argument Parsing
**Rationale**: Using Python's built-in `argparse` module for command-line argument parsing as it's part of the standard library and well-suited for simple CLI applications.
**Alternatives considered**:
- `click` - More features but introduces external dependency
- `typer` - Modern but introduces external dependency
- `sys.argv` only - Less structured approach

## Decision: Unique ID Generation
**Rationale**: Using a simple integer counter starting from 1, incrementing for each new todo within a single process run. This ensures uniqueness within a process and simplicity.
**Alternatives considered**:
- UUIDs - More complex and unnecessary for in-memory storage
- Timestamp-based - Potential collisions and more complex parsing
- Random numbers - Potential for collisions

## Decision: In-Memory Storage Structure
**Rationale**: Using Python's built-in `list` to store todo items with a `dict` for each todo. This provides simple, efficient in-memory storage with O(1) append operations and O(n) search operations which is acceptable for the scope.
**Alternatives considered**:
- `dict` with ID as key - More complex for list operations
- Custom class instances - More complex than needed

## Decision: Rich Formatting Approach
**Rationale**: Using `rich.table.Table` for displaying todos in a formatted table with clear visual distinction between completed and incomplete items. Using `rich.print` for error messages with styling.
**Alternatives considered**:
- Manual string formatting - Less visually appealing
- Other formatting libraries - Would add dependencies

## Decision: Error Handling Strategy
**Rationale**: Using explicit custom exceptions for different error conditions (e.g., `TodoNotFoundError`) with clear error messages. All errors output to stderr with non-zero exit codes as required by the specification.
**Alternatives considered**:
- Returning error codes - Less Pythonic
- Generic exception handling - Less specific

## Decision: Testing Approach
**Rationale**: Using pytest with separate test files for each component (domain, services, CLI) following the clean architecture boundaries. Testing both positive and negative cases.
**Alternatives considered**:
- unittest - More verbose
- No testing - Would violate constitution requirements