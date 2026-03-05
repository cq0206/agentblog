# Agent 工程师知识地图（2026 版）

这不是学习清单，而是 Agent 系统工程结构图。  
核心问题是：一个生产级 AI Agent 系统到底由哪些模块组成？

## 7 个核心模块

1. Agent Loop
2. Tool System
3. Memory
4. Runtime
5. Planning
6. Multi-Agent
7. Sandbox

## 整体架构

```text
            User
              |
              v
        Agent Runtime
              |
     +--------+--------+
     |        |        |
     v        v        v
 Planning   Memory    Tools
     |                 |
     v                 v
 Multi-Agent        Sandbox
```

## 1) Agent Loop

所有 Agent 都运行在循环里：

```text
observe -> plan -> act -> update -> loop
```

工程链路：

```text
task -> context builder -> LLM planner -> tool execution -> state update
```

关键问题：

- loop termination
- step budget
- error handling

典型实现：

- ReAct
- Tool calling loop
- Reflection loop

## 2) Tool System

Agent 的能力来自工具。没有 tool 的 LLM 只是聊天机器人。

典型工具：

- filesystem
- bash
- browser
- search
- database
- api

工程结构：

- tool registry
- tool schema
- tool router
- tool execution

重要设计点：

- tool description
- tool parameters
- tool result format

## 3) Memory

Memory 解决 Agent 的状态问题。

分类：

- Short-term memory：recent actions、tool outputs、conversation
- Long-term memory：user preferences、experience、knowledge

工程实现：

- vector database
- knowledge graph
- file memory

关键问题：

- retrieval
- compression
- summarization

## 4) Runtime

Runtime 是 Agent 系统核心。LLM 只是 runtime 的一个组件。

Runtime 负责：

- task scheduling
- context construction
- tool routing
- state management
- loop control

典型结构：

```text
task queue -> runtime -> planner -> tool router -> environment
```

## 5) Planning

Planning 决定 Agent 的上限能力。

常见方法：

- ReAct：reason -> act
- Tree-of-Thought：multiple reasoning paths
- Reflection：plan -> critique -> improve
- Task decomposition：big task -> sub tasks

## 6) Multi-Agent

复杂系统通常需要多个 Agent 协作。

典型结构：

- coordinator
- workers

常见角色：

- research agent
- coding agent
- content agent
- review agent

通信方式：

- file bus
- shared memory
- message queue

设计问题：

- task delegation
- conflict resolution
- coordination

## 7) Sandbox

Agent 会执行代码，必须隔离环境。

可能执行：

- bash
- python
- browser automation
- file writes

常见技术：

- Docker
- microVM
- WASM
- container snapshot

核心职责：

- security
- resource limits
- isolation

## 完整系统结构

```text
User
 |
 v
Agent Runtime
 |
 +-- Planner
 +-- Memory
 +-- Tool System
 +-- Task Scheduler
 +-- State Manager
 |
 v
Execution Environment
 |
 +-- Filesystem
 +-- Browser
 +-- Terminal
 +-- APIs
 |
 v
Sandbox
```

## Agent 工程师技能结构

AI：

- LLM
- prompting
- reasoning
- evaluation

Systems：

- runtime
- distributed systems
- queues
- state machines

Infra：

- containers
- sandbox
- resource isolation

Software Engineering：

- API design
- tool abstraction
- testing
- monitoring

## 2026 核心竞争力

不是只做 prompt engineering，而是：

- runtime design
- tool architecture
- sandbox infra

因此 Agent 工程师更像 AI systems engineer。

## 2026 Agent 技术栈参考

LLM：

- OpenAI
- Anthropic
- Gemini

Runtime：

- TypeScript
- Python

Memory：

- pgvector
- Chroma
- Weaviate

Sandbox：

- Docker
- Firecracker
- WASM

Orchestration：

- Temporal
- Redis queue
- Kafka

## 总结

Agent 系统本质是系统工程问题，不只是模型问题。

核心结构：

```text
LLM + Runtime + Tools + Sandbox = AI Operating System
```

继续阅读：

- [Agent OS 内核架构图（2026）](/posts/agent-os-kernel-2026)
- [AI Computer 架构图（2026）](/posts/ai-computer-architecture-2026)
