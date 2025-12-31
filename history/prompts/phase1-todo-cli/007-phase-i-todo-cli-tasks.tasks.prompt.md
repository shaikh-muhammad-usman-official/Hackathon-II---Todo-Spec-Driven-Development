---
id: 007
title: Phase I Todo CLI Tasks
stage: tasks
date: 2025-12-31
surface: agent
model: Claude Sonnet 4.5
feature: phase1-todo-cli
branch: 001-phase1-todo-cli
user: shaikh-muhammad-usman
command: sp.tasks
labels: [tasks, specification, cli, todo, python, inmemory]
links:
  spec: specs/001-phase1-todo-cli/spec.md
  plan: specs/001-phase1-todo-cli/plan.md
  tasks: specs/001-phase1-todo-cli/tasks.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-phase1-todo-cli/tasks.md
tests:
  - none
---

## Prompt

```text
/sp.task

You are a Spec-Driven Development execution agent operating under
Panaversity Agent Factory's Spec-Kit Plus (SDD-RI) framework.

PROJECT CONTEXT
---------------
Project: The Evolution of Todo
Hackathon: Hackathon II
Phase: Phase I — Todo In-Memory CLI
Artifact: SP.PLAN (Architectural & Execution Plan)
Constitution Version: 1.2.0
Spec Reference: Phase I Feature Specification

This task execution MUST strictly follow the approved Phase I Plan.

---------------------------------------
AUTHORITATIVE SOURCES (HIERARCHY)
---------------------------------------
1. speckit.constitution (v1.2.0)
2. Phase I Feature Specification
3. Phase I Execution Plan (this document)
4. speckit.tasks

If a conflict exists, STOP and request clarification.
No assumptions are allowed.

---------------------------------------
NON-NEGOTIABLE CONSTRAINTS
---------------------------------------
1. Spec-Kit lifecycle is mandatory:
   Specify → Plan → Tasks → Implement
2. NO code generation without an approved Task ID.
3. NO filesystem persistence of any kind.
4. NO databases, files, caches, or environment variables.
5. ALL state MUST be in-memory and process-bound.
6. Tests are REQUIRED and MUST pass.
7. Use ONLY Python 3.13+, uv, rich, pytest.
8. Follow the directory structure exactly as defined in the Plan.
9. Deterministic behavior only — no randomness or side effects.

---------------------------------------
MANDATORY PROJECT STRUCTURE
---------------------------------------
All code MUST live inside the following structure:
All code MUST live inside the following directory:

```text
Phase I: Todo In-Memory Python Console App/
│
├── pyproject.toml
├── README.md
│
├── todo_app/
│   ├── __init__.py
│   ├── domain.py          # Todo entity & domain rules
│   ├── repository.py      # In-memory storage logic
│   ├── services.py        # Business operations (add/list/complete/delete)
│   ├── cli.py             # CLI command handling
│   └── main.py            # CLI entry point
│
├── tests/
│   ├── __init__.py
│   ├── test_domain.py
│   ├── test_services.py
│   ├── test_cli_add.py
│   ├── test_cli_list.py
│   ├── test_cli_complete.py
│   └── test_cli_delete.py
│
└── .gitignore
---------------------------------------
PHASE I FUNCTIONAL SCOPE (ONLY)
---------------------------------------
Implement the following features exactly as specified:

1. Add Task
   - Title (required)
   - Description (optional)

2. List Tasks
   - Display all tasks
   - Show ID, title, completion status

3. Update Task
   - Update title and/or description by ID

4. Delete Task
   - Remove task by ID

5. Complete / Incomplete Task
   - Toggle completion state by ID

---------------------------------------
ARCHITECTURAL RESPONSIBILITIES
---------------------------------------
domain.py
- Define Task entity
- Enforce domain invariants
- No I/O or CLI logic

repository.py
- Maintain in-memory task collection
- ID assignment and lookup
- No business rules

services.py
- Implement all task operations
- Validate IDs and input
- Return deterministic results

cli.py
- Handle Rich-based CLI interactions
- Map user input to services
- No business logic

main.py
- Application bootstrap
- CLI startup only

---------------------------------------
CLI & UX REQUIREMENTS
---------------------------------------
- Use Rich for ALL console output
- Tables for listing tasks
- Clear success and error messages
- Graceful handling of invalid IDs
- No stack traces exposed to users

---------------------------------------
TESTING REQUIREMENTS
---------------------------------------
- pytest-based unit tests
- Test domain rules independently
- Test services without CLI
- Test CLI commands for:
  - add
  - list
  - complete
  - delete

---------------------------------------
EXECUTION INSTRUCTIONS
---------------------------------------
1. Read Phase I Feature Specification fully.
2. Validate against the Phase I Execution Plan.
3. Execute ONLY tasks defined in speckit.tasks.
4. Each implementation MUST reference its Task ID.
5. If any behavior is ambiguous, STOP and request a spec update.

---------------------------------------
SUCCESS CRITERIA
---------------------------------------
- Application runs via: `uv run python todo_app/main.py`
- All Phase I features work
- All tests pass
- No persistence beyond memory
- Full traceability: Spec → Plan → Task → Code

DO NOT BEGIN IMPLEMENTATION until speckit.tasks
for Phase I are present and approved.
```

## Response snapshot

Generated comprehensive task list for Phase I Todo CLI (In-Memory) application with 32 specific tasks organized by user stories. Tasks are structured following the Spec-Kit Plus methodology with Setup, Foundational, and User Story phases. Each task includes proper ID, parallelization markers, story labels, and exact file paths. The tasks follow the clean architecture pattern with domain, repository, services, and CLI layers as specified in the plan.

## Outcome

- ✅ Impact: Complete task breakdown with 32 specific executable tasks
- 🧪 Tests: Test tasks included as specified in requirements
- 📁 Files: Created tasks.md with proper structure and organization
- 🔁 Next prompts: Ready for implementation following task IDs
- 🧠 Reflection: Tasks organized by user stories enabling independent development

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation with T001