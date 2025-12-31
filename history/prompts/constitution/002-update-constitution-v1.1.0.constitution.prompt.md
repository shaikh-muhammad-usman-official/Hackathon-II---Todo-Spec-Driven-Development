---
id: 002
title: Update Constitution to v1.1.0
stage: constitution
date: 2025-12-31
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: master
user: shaikh-muhammad-usman
command: sp.constitution
labels: [constitution, governance, security, specification]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
  - .specify/templates/tasks-template.md
tests:
  - none
---

## Prompt

```text
<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: VIII (expanded), added new Principle III-A
Added sections: Environment Variable & Secret Safety, Phase-forward guidance
Removed sections: None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md – add env-safety checkpoint
- ✅ .specify/templates/spec-template.md – clarify future-phase compatibility
- ✅ .specify/templates/tasks-template.md – tag env-related tasks
Follow-up TODOs: None
-->

# Hackathon II – Todo SDD Constitution
<!-- Spec-Driven Development Constitution for Agentic Todo System -->

## Core Principles

### I. Spec-Driven Development Is Mandatory (NON-NEGOTIABLE)
All work in this project MUST follow the Spec-Kit Plus lifecycle:

**Specify → Plan → Tasks → Implement**

- No agent (Claude Code or otherwise) may write or modify code without:
  - An approved specification
  - A generated plan
  - An explicit task reference
- Any ambiguity MUST result in a spec update, not an assumption
- Manual coding by humans is prohibited; implementation is agent-generated only

---

### II. Constitution Supremacy
This Constitution is the **highest authority** in the project hierarchy.

Order of precedence:
1. **Constitution**
2. Specify
3. Plan
4. Tasks
5. Code

If conflicts arise, lower-level artifacts MUST be amended to comply with this Constitution.

---

### III. Phase-Gated Architecture
The system MUST evolve strictly by hackathon phases.

- Phase I: In-memory Python CLI only
- Phase II: Full-stack web (Next.js + FastAPI + SQLModel)
- Phase III: AI Chatbot using OpenAI Agents SDK + MCP
- Phase IV: Local Kubernetes (Minikube + Helm)
- Phase V: Cloud-native, event-driven (Kafka + Dapr)

Agents MUST NOT introduce:
- Databases before Phase II
- AI agents before Phase III
- Kubernetes or Kafka before Phase IV/V

Each phase requires its **own specs**, **own validation**, and **explicit completion**.

---

### III-A. Environment Variable & Secret Safety (STRICT)
**Real environment variables MUST NEVER be accessed, read, logged, or assumed.**

Rules:
- Agents MAY ONLY:
  - Reference environment variables symbolically
  - Generate `env.example` or `.env.example` files
- Agents MUST NOT:
  - Read actual `.env` files
  - Assume or infer real values
  - Inline secrets in code or configs
  - Log secret values
  - Commit credentials of any kind

Allowed:
```env
DATABASE_URL=postgresql://user:password@host/db
OPENAI_API_KEY=sk-xxxx
JWT_SECRET=replace_me
Forbidden:

process.env.X value inspection

Reading .env

Guessing cloud credentials

Embedding secrets in Helm charts, Dockerfiles, or YAML

This rule applies to all phases, including Kubernetes and cloud deployments.

IV. Library-First & Service-First Design
Every capability MUST be designed as:

A standalone library or service

With a clear responsibility

Independently testable

Explicit inputs and outputs

In later phases:

Backend services MUST be stateless

All state MUST reside in databases or Dapr state stores

AI agents MUST interact only via MCP tools

V. Text-Based & Contract-Driven Interfaces
All system boundaries MUST be explicit and inspectable.

CLI: stdin/args → stdout/stderr

APIs: JSON over HTTP

MCP Tools: strict schemas with typed parameters

Events: well-defined Kafka/Dapr event schemas

No hidden side effects.
No implicit coupling.

VI. Test-First Thinking (Even When Tests Are Generated)
Although agents generate code:

Acceptance criteria in specs act as executable truth

Tasks MUST be testable in isolation

Integration boundaries MUST be explicitly validated

Stateless behavior MUST be verifiable across restarts

If behavior cannot be tested or observed, it is incorrectly designed.

VII. Stateless AI & Deterministic Behavior
AI agents in this system MUST be:

Stateless between requests

Deterministic given the same inputs + stored state

Dependent only on:

Specs

Conversation history from DB/state store

MCP tool results

No hidden memory.
No implicit context.
No agent improvisation.

VIII. Security & Identity (Phase-Aware)
Security requirements MUST evolve by phase:

Phase II

JWT-based authentication

Backend verifies JWT independently

User isolation enforced on every operation

Secrets declared only in env.example

Phase III

MCP tools require explicit user identity

No implicit trust between agent and backend

Phase IV

Secrets referenced via Kubernetes Secrets (placeholders only)

No secrets inside images or manifests

Phase V

Dapr Secrets or cloud-native secret managers

Zero secret exposure in logs, code, or events

IX. Cloud-Native by Design (Not by Accident)
From Phase IV onward, the system MUST assume:

Horizontal scalability

Pod restarts at any time

No in-memory persistence

Observability via logs and events

Declarative infrastructure (Helm, YAML, blueprints)

If a component fails on restart, it violates this Constitution.

X. Event-Driven Evolution (Future Compatibility)
Advanced features (Phase V) MUST use events, not synchronous chains.

Even in earlier phases:

Task lifecycle MUST be event-friendly

Side effects MUST be separable

Async workflows MUST NOT assume direct calls

Phase V mandates:

Kafka or Kafka-compatible pub/sub

Dapr abstractions preferred over direct SDKs

Services communicate via events, not chained APIs

This system evolves from CRUD → distributed intelligence.

Development Constraints
Language: Python 3.13+

Package Management: uv

Frontend: Next.js (App Router)

Backend: FastAPI + SQLModel

AI: OpenAI Agents SDK

MCP: Official MCP SDK

Deployment: Docker → Minikube → Cloud Kubernetes

Messaging: Kafka (or Kafka-compatible via Dapr)

Any deviation MUST be justified in the spec and approved before implementation.

Workflow Enforcement Rules
No code without a Task ID

No Tasks without a Plan

No Plan without an approved Specify

No real secrets, ever

Agents MUST stop and request clarification when underspecified

Governance
This Constitution applies to all agents, tools, and contributors

Amendments require:

Documentation

Rationale

Migration plan

All PRs and reviews MUST verify constitutional compliance

Spec history MUST be preserved for auditability

This Constitution governs how intelligence is designed, evolved, and deployed.

Version: 1.1.0 | Ratified: 2025-12-01 | Last Amended: 2025-12-01

markdown
Copy code

---

## 🧠 Why this is now "expert-level"

- 🔐 **Secrets are constitutionally protected**
- 🧭 **Future phases are enforced, not implied**
- 🤖 **Agents cannot leak envs even accidentally**
- ☁️ **Cloud reviewers will immediately green-flag this**
- 🏆 **Matches Panaversity's internal SDD expectations**
```

## Response snapshot

Updated the constitution from version 1.0.0 to 1.1.0, adding a new Principle III-A for Environment Variable & Secret Safety and expanding the Security & Identity requirements. The update includes strict rules about environment variables and secrets, requiring agents to only reference them symbolically and never access real values. Also updated dependent templates to align with the new constitution: plan template now includes environment safety checks, spec template includes future-phase compatibility guidance, and tasks template includes environment-related task tagging.

## Outcome

- ✅ Impact: Constitution updated to v1.1.0 with enhanced security requirements
- 🧪 Tests: No tests created in this phase
- 📁 Files: Updated constitution.md and 3 template files
- 🔁 Next prompts: Continue with feature specification following updated constitution
- 🧠 Reflection: New security requirements will prevent accidental secret exposure

## Evaluation notes (flywheel)

- Failure modes observed: None in this update
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Implement first feature following new security requirements