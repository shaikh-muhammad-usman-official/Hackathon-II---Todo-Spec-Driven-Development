---
id: 004
title: Phase I Todo CLI Spec
stage: spec
date: 2025-12-31
surface: agent
model: Claude Sonnet 4.5
feature: phase1-todo-cli
branch: 001-phase1-todo-cli
user: shaikh-muhammad-usman
command: sp.specify
labels: [specification, cli, todo, python, phase1]
links:
  spec: specs/001-phase1-todo-cli/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-phase1-todo-cli/spec.md
  - specs/001-phase1-todo-cli/checklists/requirements.md
tests:
  - none
---

## Prompt

```text
/sp.specify — Phase I
Hackathon II – Todo (In-Memory CLI)
<!--
SP.SPECIFY
Phase: I
Scope: In-Memory Todo CLI
Constitution Version: 1.2.0
Spec-Kit: Plus (SDD-RI)
-->

# Phase I Specification — Todo CLI (In-Memory)

## 1. Purpose & Phase Boundary

This specification defines **Phase I** of the Hackathon II Todo system.

**Phase I objective**:
> Establish a deterministic, stateless, in-memory command-line Todo application that defines the domain model, contracts, and workflows for all future phases.

### Explicit Phase Constraints (NON-NEGOTIABLE)

Phase I MUST:
- Run as a **Python 3.13+ CLI application**
- Use **uv** for environment and dependency management
- Use **rich** for CLI rendering and usability
- Store all state **in memory only**
- Use **no database**
- Use **no filesystem persistence**
- Use **no environment variables**
- Use **no configuration files**
- Use **no authentication**
- Use **no networking**
- Use **no AI**
- Use **no background jobs**

Any capability not listed above is explicitly forbidden in Phase I.

---

## 2. Phase Exit Conditions (Success Criteria)

Phase I is complete only when:

- All commands behave exactly as specified
- Behavior is deterministic within a single run
- All state resets on process restart
- CLI output is clear, readable, and contract-stable
- rich enhances visibility without hiding data
- No Constitution v1.2.0 rules are violated
- No future-phase abstractions are introduced prematurely

---

## 3. Technology Constraints (MANDATORY)

### 3.1 Language & Runtime
- Python **3.13 or higher**
- No deprecated or experimental language features
- Type hints SHOULD be used where they improve clarity

### 3.2 Dependency & Environment Management
- **uv** MUST be used for:
  - Virtual environment management
  - Dependency installation
  - Application execution
- Other tools (`pip`, `poetry`, `conda`) MUST NOT be used

### 3.3 CLI Rendering
- **rich** MUST be used for:
  - Tables
  - Visual distinction of completed vs incomplete items
  - Error emphasis
- rich MUST NOT:
  - Obscure IDs
  - Hide raw values
  - Break piping or redirection

---

## 4. Domain Model (Authoritative)

### 4.1 Todo Entity

A Todo represents a single user task.

| Field | Type | Required | Description |
|------|------|----------|-------------|
| id | string | yes | Unique identifier (in-memory only) |
| title | string | yes | Short task description |
| completed | boolean | yes | Completion status |
| created_at | string (ISO-8601) | yes | Creation timestamp |

Rules:
- IDs MUST be unique within a single run
- IDs reset on restart
- Ordering is by `created_at`

---

## 5. CLI Contract (SOLE INTERFACE)

The CLI is the **only interface** in Phase I.

### 5.1 Command Shape

```bash
todo <command> [arguments]


Commands MUST:

Write normal output to stdout

Write errors to stderr

Exit with non-zero status on failure

Be usable in scripted and interactive contexts

5.2 Supported Commands
5.2.1 add

Creates a new Todo.

todo add "Buy milk"


Behavior:

Creates a Todo with completed = false

Generates an ID

Prints the created Todo using rich formatting

5.2.2 list

Lists all Todos.

todo list


Behavior:

Displays all Todos in creation order

Uses a rich table

Clearly distinguishes completion status

Prints a styled empty-state message if no Todos exist

5.2.3 complete

Marks a Todo as completed.

todo complete <id>


Behavior:

Sets completed = true

Errors if the ID does not exist

5.2.4 delete

Deletes a Todo.

todo delete <id>


Behavior:

Removes the Todo from memory

Errors if the ID does not exist

6. Output & Contract Rules

Output MUST be human-readable

Output MUST remain logically line-oriented

IDs MUST always be visible

rich formatting MUST enhance, not replace, meaning

Logical example:

[ ] 1 Buy milk
[x] 2 Finish assignment

7. Error Handling

Errors MUST:

Be printed to stderr

Be visually distinct using rich

Use clear, human-readable language

Exit with non-zero status

Examples:

Unknown command

Missing arguments

Invalid ID

8. State & Statelessness Rules

All state MUST live in memory

No files may be read or written

Restarting the process MUST reset all state

No caching beyond process lifetime

This establishes the stateless discipline required by later phases.

9. Determinism Requirements

Given the same sequence of commands within a single run, the system MUST:

Produce identical logical outputs

Avoid nondeterministic ordering

Avoid randomness beyond predictable ID sequencing

10. Explicit Non-Goals (Forbidden)

Phase I MUST NOT include:

Databases

Filesystem persistence

Environment variables

Config files

Authentication

Networking

Web frameworks

AI agents

Background schedulers

Event systems

11. Forward Compatibility (Design Intent Only)

While Phase I is simple, it MUST be designed so that:

Todo maps cleanly to a future database table

CLI commands map to future REST endpoints

Business logic is separable from CLI concerns

rich usage does not leak into domain logic

This is design intent, not implementation.

12. Acceptance Criteria (Executable Truth)

The system SHALL:

Add Todos via CLI

List Todos using rich tables

Complete Todos by ID

Delete Todos by ID

Handle invalid input gracefully

Reset all state on restart

Use uv for execution and dependency management

Run on Python 3.13+

Use rich for CLI rendering

Fully comply with Constitution v1.2.0

Failure of any criterion fails Phase I.

13. Traceability & Next Step

Governing Document: Hackathon II – Todo SDD Constitution v1.2.0

Next Required Artifact: /sp.plan (Phase I execution plan)

No implementation may begin until /sp.plan is generated and approved.


---

## ✅ What this unlocks now

- Your **Constitution + Specify are fully synced**
- Agents cannot:
  - leak envs
  - sneak future-phase tech
  - invent hidden state
- You are **100% ready for `/sp.plan`**

---

### 🚀 Next mandatory SDD step
👉 **Generate `/sp.plan` for Phase I**

If you say **“write sp.plan”**, I’ll produce:
- A task-safe, agent-executable plan
- Explicit uv + rich checkpoints
- Zero chance of phase leakage

You’re building this the *right* way.
```

## Response snapshot

Created the feature specification for Phase I Todo CLI (In-Memory) with user stories for adding, listing, completing, and deleting todos. The specification includes all required functional requirements and success criteria while adhering to the strict Phase I constraints of in-memory storage, no persistence, and Python 3.13+ with rich formatting. Created a quality checklist validating that all requirements are met.

## Outcome

- ✅ Impact: Phase I Todo CLI specification created with complete user stories and requirements
- 🧪 Tests: No tests created in this phase
- 📁 Files: Created spec.md and requirements checklist
- 🔁 Next prompts: Ready for /sp.plan to generate implementation plan
- 🧠 Reflection: Specification fully compliant with Constitution v1.2.0 and Phase I constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Generate implementation plan with /sp.plan