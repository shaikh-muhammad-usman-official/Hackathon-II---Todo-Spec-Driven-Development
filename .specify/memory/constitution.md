<!-- SYNC IMPACT REPORT
Version change: 1.1.0 → 1.2.0
Modified principles: All principles enhanced to meet HARD REQUIREMENTS
Added sections: Enhanced statelessness requirements, contract-first interfaces, workflow enforcement
Removed sections: None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md – update env-safety checkpoint
- ✅ .specify/templates/spec-template.md – update requirements alignment
- ✅ .specify/templates/tasks-template.md – update task categorization
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
- This Constitution overrides specs, plans, tasks, and code in case of conflicts

### II. Constitution Supremacy
This Constitution is the **highest authority** in the project hierarchy.

Order of precedence:
1. **Constitution**
2. Specify
3. Plan
4. Tasks
5. Code

If conflicts arise, lower-level artifacts MUST be amended to comply with this Constitution.

### III. Phase-Gated Architecture
The system MUST evolve strictly by hackathon phases.

- Phase I: In-memory Python CLI only
- Phase II: Full-stack Web (Next.js + FastAPI + SQLModel)
- Phase III: AI Agents (OpenAI Agents SDK + MCP)
- Phase IV: Local Kubernetes (Minikube + Helm)
- Phase V: Cloud-native, event-driven (Kafka + Dapr)

Agents MUST NOT introduce future-phase capabilities early:
- Databases before Phase II
- AI agents before Phase III
- Kubernetes or Kafka before Phase IV/V

Each phase requires its **own specs**, **own validation**, and **explicit completion**.

### III-A. Environment Variable & Secret Safety (CRITICAL)
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
  - Embed secrets in Dockerfiles, Helm charts, or YAML files

Allowed examples:
```env
DATABASE_URL=postgresql://user:password@host/db
OPENAI_API_KEY=sk-xxxx
JWT_SECRET=replace_me
```

Explicit forbidden behaviors:
- `process.env.X` value inspection
- Reading `.env` files
- Guessing cloud credentials
- Embedding secrets in Dockerfiles, Helm charts, or YAML
- Logging secret values
- Hardcoding secrets in code

This rule applies to ALL phases, including Kubernetes and cloud deployments.

### IV. Statelessness & Determinism (MANDATORY)
The system MUST enforce stateless behavior:

Backend Services (Phase II+):
- MUST be stateless
- All state MUST reside in databases or Dapr state stores

AI Agents (Phase III+):
- MUST be stateless between requests
- MUST be deterministic given identical inputs and stored state
- MUST NOT maintain hidden memory or implicit context
- Behavior MUST be reproducible given same inputs and state

### V. Contract-First Interfaces (EXPLICIT BOUNDARIES)
All system boundaries MUST be explicit and inspectable with no implicit coupling:

- CLI: stdin/args → stdout/stderr
- HTTP APIs: JSON contracts over HTTP
- MCP Tools: typed schemas with strict parameters
- Events: documented payloads with defined schemas

No implicit coupling is permitted between system components.

### VI. Security & Identity (Phase-Aware)
Security requirements MUST evolve by phase:

**Phase II:**
- JWT-based authentication is mandatory
- Backend MUST verify JWTs independently
- User isolation MUST be enforced on every operation
- Secrets MUST exist only as placeholders in `env.example`

**Phase III:**
- MCP tools MUST require explicit user identity propagation
- No implicit trust MUST exist between agent and backend

**Phase IV:**
- Secrets MUST be referenced via Kubernetes Secrets (placeholders only)
- No secrets MUST be embedded inside container images or manifests

**Phase V:**
- Dapr or cloud-native secret managers MUST be used
- Zero secret exposure MUST be maintained in logs, code, or events

### VII. Test-First Thinking (Mandatory)
Although agents generate code:

- Acceptance criteria in specs act as executable truth
- Tasks MUST be testable in isolation
- Integration boundaries MUST be explicitly validated
- Stateless behavior MUST be verifiable across restarts

If behavior cannot be tested or observed, it is incorrectly designed.

### VIII. Library-First & Service-First Design
Every capability MUST be designed as:

- A standalone library or service
- With a clear responsibility
- Independently testable
- Explicit inputs and outputs

### IX. Event-Driven Future Compatibility
Even before Phase V, the system MUST prepare for event-driven architecture:

Before Kafka implementation:
- Task lifecycle MUST be event-friendly
- Async workflows MUST NOT rely on synchronous chains
- Side effects MUST be separable and trackable

Phase V mandates:
- Kafka or Kafka-compatible pub/sub systems
- Dapr abstractions preferred over direct SDKs
- Services MUST communicate via events, NOT chained APIs

This system evolves from CRUD → distributed intelligence.

### X. Cloud-Native by Design (Not by Accident)
From Phase IV onward, the system MUST assume:

- Horizontal scalability
- Pod restarts at any time
- No in-memory persistence
- Observability via logs and events
- Declarative infrastructure (Helm, YAML, blueprints)

If a component fails when restarted, it violates this Constitution.

## Development Constraints

- **Language**: Python 3.13+
- **Package Management**: uv
- **Frontend**: Next.js (App Router)
- **Backend**: FastAPI + SQLModel
- **AI**: OpenAI Agents SDK
- **MCP**: Official MCP SDK
- **Deployment**: Docker → Minikube → Cloud Kubernetes
- **Messaging**: Kafka (or Kafka-compatible via Dapr)

Any deviation MUST be justified in the spec and approved before implementation.

## Workflow Enforcement Rules

- No code without Tasks
- No Tasks without a Plan
- No Plan without a Specify
- No real secrets, ever
- Agents MUST stop and request clarification when underspecified
- All work MUST follow SDD lifecycle: Specify → Plan → Tasks → Implement

## Governance

- This Constitution applies to all agents, tools, and contributors
- Amendments require:
  - Documentation
  - Rationale
  - Migration plan
- All PRs and reviews MUST verify constitutional compliance
- Spec history MUST be preserved for auditability

This Constitution governs **how intelligence is designed, specified, planned, implemented, secured, and evolved across multiple hackathon phases**.

**Version**: 1.2.0 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-01