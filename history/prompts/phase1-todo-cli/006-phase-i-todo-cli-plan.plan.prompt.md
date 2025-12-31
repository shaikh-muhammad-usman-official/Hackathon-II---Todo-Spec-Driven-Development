---
id: 006
title: Phase I Todo CLI Plan
stage: plan
date: 2025-12-31
surface: agent
model: Claude Sonnet 4.5
feature: phase1-todo-cli
branch: 001-phase1-todo-cli
user: shaikh-muhammad-usman
command: sp.plan
labels: [plan, specification, cli, todo, python, inmemory]
links:
  spec: specs/001-phase1-todo-cli/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-phase1-todo-cli/plan.md
  - specs/001-phase1-todo-cli/research.md
  - specs/001-phase1-todo-cli/data-model.md
  - specs/001-phase1-todo-cli/quickstart.md
  - specs/001-phase1-todo-cli/contracts/cli-contract.md
tests:
  - none
---

## Prompt

```text
/sp.plan — Phase I
Hackathon II – Todo In-Memory Python Console App
<!--
SP.PLAN
Phase: I
Artifact: Architectural & Execution Plan
Constitution Version: 1.2.0
Spec Reference: Phase I Feature Specification
Spec-Kit: Plus (SDD-RI)
-->

# Phase I Execution Plan — Todo In-Memory CLI

## 1. Plan Objective

This plan defines the **production-grade architectural and execution steps** required to implement **Phase I** of the Hackathon II Todo system.

**Goal**:
> Deliver a deterministic, in-memory, Python 3.13+ CLI Todo application using `uv`, `rich`, and `pytest`, fully compliant with Constitution v1.2.0.

This plan is **binding**. Tasks and implementation MUST follow it exactly.

---

## 2. Architectural Principles (Applied)

This plan enforces:

- Spec-driven execution
- Stateless, in-memory design
- Contract-first CLI interfaces
- Clear separation of concerns
- Testable business logic
- Zero environment variable usage
- Zero filesystem persistence

---

## 3. Project Directory Structure (MANDATORY)

> ⚠️ **Important**: No `src/` directory at repository root.

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

Structural Rules

Domain logic MUST NOT import rich

CLI layer MAY import rich

Tests MUST NOT depend on formatting details

No circular imports permitted

4. Dependency Management Plan (uv)
4.1 Tooling

Python 3.13+

Dependency manager: uv

4.2 Dependencies

Declared in pyproject.toml:

rich — CLI rendering

pytest — testing framework

No other runtime dependencies permitted.

5. Component Responsibilities
5.1 Domain Layer (domain.py)

Define Todo data structure

Enforce invariants (id, title, completed, timestamp)

No I/O

No formatting

No global state

5.2 Repository Layer (repository.py)

Maintain in-memory list of todos

Generate unique IDs per run

Provide CRUD-style access

Reset state on process restart

5.3 Service Layer (services.py)

Implement business use cases:

add_todo

list_todos

complete_todo

delete_todo

Raise explicit errors for invalid operations

Remain deterministic

5.4 CLI Layer (cli.py)

Parse user commands

Invoke services

Handle errors

Apply rich formatting

Route output correctly:

stdout → success

stderr → errors

5.5 Entry Point (main.py)

CLI bootstrap

Argument dispatch

Exit code handling

6. Testing Strategy (Production-Grade)
6.1 Testing Framework

pytest (MANDATORY)

PyTorch is explicitly excluded because it is not a testing framework and violates architectural intent.

6.2 Test Categories
Domain Tests

Validate Todo creation

Validate default values

Validate immutability rules

Service Tests

Add todo

Complete todo

Delete todo

Invalid ID handling

CLI Tests

Simulate CLI calls

Validate stdout output presence

Validate stderr on errors

Validate exit codes

Do NOT assert on colors or styles

6.3 Determinism Tests

Same command sequence → same results

IDs increment predictably

No shared state between test runs

7. Error Handling Plan

All errors MUST:

Be explicit

Be human-readable

Exit with non-zero status

No silent failures

No swallowed exceptions

8. Non-Goals (Reconfirmed)

This plan MUST NOT introduce:

Databases

Files

Environment variables

Config files

Authentication

Networking

AI agents

Background jobs

Event systems

9. Execution Order (Strict)

Initialize uv project

Define domain model

Implement repository

Implement services

Implement CLI

Write tests (pytest)

Validate determinism

Manual CLI smoke test

Phase I validation

10. Phase Exit Checklist

Phase I is complete only if:

All tests pass

All acceptance criteria satisfied

CLI behaves deterministically

No Constitution v1.2.0 violations

No future-phase code present

11. Traceability

Constitution: Hackathon II – Todo SDD Constitution v1.2.0

Specification: Phase I Feature Specification

Next Artifact: /sp.tasks

Implementation MUST NOT begin until /sp.tasks is generated.


---

## ✅ Why this plan is **production-grade**

- ✔ Clean architecture
- ✔ Deterministic behavior
- ✔ Correct tooling choices
- ✔ Judge-safe decisions
- ✔ No accidental scope creep
- ✔ Testable, reviewable, auditable

---

### 🚀 Next mandatory SDD step
👉 **Generate `/sp.tasks`**

If you say **“write sp.tasks”**, I’ll break this plan into **precise, agent-executable tasks** with zero ambiguity.

You’re building this the *right* way.
```

## Response snapshot

Created the implementation plan for Phase I Todo CLI (In-Memory) with complete project structure, technical context, and constitutional compliance checks. Generated all required Phase 0 and Phase 1 artifacts including research.md, data-model.md, quickstart.md, and CLI contract documentation. The plan enforces clean architecture with separation of concerns and ensures compliance with Constitution v1.2.0 requirements.

## Outcome

- ✅ Impact: Complete implementation plan with all required artifacts
- 🧪 Tests: No tests executed in this phase
- 📁 Files: Created plan.md, research.md, data-model.md, quickstart.md, and contracts/
- 🔁 Next prompts: Ready for /sp.tasks to generate executable tasks
- 🧠 Reflection: Plan fully compliant with Constitution and clean architecture principles

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Generate tasks with /sp.tasks