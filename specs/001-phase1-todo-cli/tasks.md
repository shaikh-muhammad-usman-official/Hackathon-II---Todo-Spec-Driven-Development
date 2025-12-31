---
description: "Task list template for feature implementation"
---

# Tasks: Phase I Todo CLI (In-Memory)

**Input**: Design documents from `/specs/001-phase1-todo-cli/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan
- [X] T002 Initialize pyproject.toml with Python 3.13+ and dependencies (rich, pytest)
- [X] T003 [P] Configure .gitignore for Python project

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T004 Create todo_app/__init__.py
- [X] T005 [P] Create tests/__init__.py
- [X] T006 Create basic directory structure (todo_app/, tests/)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Todo (Priority: P1) 🎯 MVP

**Goal**: Implement ability for users to add new todo items to their list

**Independent Test**: User can run `todo add "Buy groceries"` and see the new item appear in the list with a unique ID and uncompleted status

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T007 [P] [US1] Contract test for add command in tests/test_cli_add.py
- [X] T008 [P] [US1] Unit test for domain Todo creation in tests/test_domain.py

### Implementation for User Story 1

- [X] T009 [P] [US1] Create Todo data class in todo_app/domain.py (depends on data-model.md)
- [X] T010 [P] [US1] Create in-memory repository in todo_app/repository.py
- [X] T011 [US1] Implement add_todo service in todo_app/services.py
- [X] T012 [US1] Implement add command in todo_app/cli.py
- [X] T013 [US1] Add add command to main.py CLI entry point
- [X] T014 [US1] Add error handling for missing title in add command

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - List Todos (Priority: P1)

**Goal**: Implement ability for users to view all their todo items in a formatted list

**Independent Test**: User can run `todo list` and see all todos displayed in a rich-formatted table with clear completion status

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T015 [P] [US2] Contract test for list command in tests/test_cli_list.py
- [X] T016 [P] [US2] Unit test for list service in tests/test_services.py

### Implementation for User Story 2

- [X] T017 [P] [US2] Implement list_todos service in todo_app/services.py
- [X] T018 [US2] Implement list command in todo_app/cli.py with rich table formatting
- [X] T019 [US2] Add list command to main.py CLI entry point
- [X] T020 [US2] Add empty state handling for list command

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Complete Todo (Priority: P2)

**Goal**: Implement ability for users to mark a specific todo as completed

**Independent Test**: User can run `todo complete <id>` and see the todo's status change to completed

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [X] T021 [P] [US3] Contract test for complete command in tests/test_cli_complete.py
- [X] T022 [P] [US3] Unit test for complete service in tests/test_services.py

### Implementation for User Story 3

- [X] T023 [P] [US3] Implement complete_todo service in todo_app/services.py
- [X] T024 [US3] Implement complete command in todo_app/cli.py
- [X] T025 [US3] Add complete command to main.py CLI entry point
- [X] T026 [US3] Add error handling for invalid ID in complete command

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Delete Todo (Priority: P2)

**Goal**: Implement ability for users to remove a specific todo from their list

**Independent Test**: User can run `todo delete <id>` and see the todo removed from the list

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [X] T027 [P] [US4] Contract test for delete command in tests/test_cli_delete.py
- [X] T028 [P] [US4] Unit test for delete service in tests/test_services.py

### Implementation for User Story 4

- [X] T029 [P] [US4] Implement delete_todo service in todo_app/services.py
- [X] T030 [US4] Implement delete command in todo_app/cli.py
- [X] T031 [US4] Add delete command to main.py CLI entry point
- [X] T032 [US4] Add error handling for invalid ID in delete command

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T033 [P] Add README.md with usage instructions from quickstart.md
- [X] T034 Add command help and error messages
- [X] T035 [P] Run all tests and ensure they pass
- [X] T036 Manual CLI smoke test following quickstart.md
- [X] T037 [P] Add error handling for all edge cases from spec.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for add command in tests/test_cli_add.py"
Task: "Unit test for domain Todo creation in tests/test_domain.py"

# Launch all models for User Story 1 together:
Task: "Create Todo data class in todo_app/domain.py"
Task: "Create in-memory repository in todo_app/repository.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence