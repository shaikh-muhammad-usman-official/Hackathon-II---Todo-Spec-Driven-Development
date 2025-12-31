# Data Model: Phase I Todo CLI (In-Memory)

**Feature**: Phase I Todo CLI (In-Memory)
**Date**: 2025-12-31
**Source**: Feature specification requirements

## Todo Entity

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique identifier generated per run |
| title | string | yes | Short task description |
| completed | boolean | yes | Completion status |
| created_at | string (ISO-8601) | yes | Creation timestamp |

### Validation Rules
- `id`: Must be unique within a single process run
- `title`: Must be a non-empty string
- `completed`: Must be a boolean value (default: false)
- `created_at`: Must be in ISO-8601 format

### State Transitions
- `completed` can change from `false` to `true` via complete operation
- No other state transitions allowed

## Relationships
- No relationships between entities (single entity system)

## Constraints
- All data stored in-memory only
- Data resets on process restart
- IDs are sequential integers starting from 1 for each run