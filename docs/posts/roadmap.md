# Agent 学习 + 实战路线图（工程师版）

目标不是“看懂概念”，而是 30 天做出一个 Agent 系统作品集。

## 最终目标

- 1 个 Agent OS 项目
- 1 个 Multi-Agent 项目
- 1 个 Coding Agent
- 20+ 技术笔记

## 30 天学习路线

分 4 个阶段：

1. Agent 基础（Day 1-7）
2. Agent Runtime（Day 8-14）
3. Multi-Agent（Day 15-21）
4. Agent OS（Day 22-30）

## 第一阶段：Agent 基础（Day 1-7）

目标：理解 Agent 的核心结构。

核心知识：`agent loop`、`tool calling`、`memory`、`context`

### Day 1

- 主题：What is Agent
- 内容：Chatbot vs Agent、Agent Architecture、Claw 系统
- 输出：[Day 1 笔记](/posts/day01-agent-basics)

### Day 2

- 主题：Agent Loop
- 内容：observe、plan、act、update
- 实践：写一个最小 Agent Loop
- 输出：`Day02-agent-loop.md`

### Day 3

- 主题：Tool System
- 内容：tool schema、tool router、function calling
- 实践：实现 tool registry
- 输出：`Day03-tool-system.md`

### Day 4

- 主题：Context Management
- 内容：prompt design、token control、context builder
- 输出：`Day04-context.md`

### Day 5

- 主题：Memory System
- 内容：short-term memory、long-term memory、vector db
- 实践：实现 memory store

### Day 6

- 主题：Task State
- 内容：task tracking、step history、agent state machine

### Day 7

- 主题：Building First Agent
- 实践：做一个完整 Agent（read file、run bash、loop）
- 项目：`mini-agent`

## 第二阶段：Agent Runtime（Day 8-14）

目标：理解并实现 Agent Runtime。

### Day 8

- 主题：Agent Runtime Architecture
- 研究：Claude Code、OpenClaw
- 输出：`Day08-runtime.md`

### Day 9

- 主题：Scheduler
- 内容：task queue、cron、job execution
- 实践：实现 scheduler

### Day 10

- 主题：Error Handling
- 内容：retry、fallback、timeout

### Day 11

- 主题：Agent Planning
- 内容：react、reflection、tree of thought

### Day 12

- 主题：Evaluation
- 内容：agent evaluation、success criteria

### Day 13

- 主题：Coding Agent
- 实现：file read、file edit、bash
- 项目：`claude-code-lite`

### Day 14

- 主题：Agent Runtime 完整实现
- 项目：`agent-runtime`

## 第三阶段：Multi-Agent（Day 15-21）

目标：实现 Agent 团队。

### Day 15

- 主题：Multi-Agent Architecture
- 内容：coordinator、workers

### Day 16

- 主题：Agent Communication
- 内容：file bus、message queue、shared memory

### Day 17

- 主题：Role-based Agents
- 示例角色：research、writer、engineer

### Day 18

- 主题：Coordination
- 内容：task delegation、workflow

### Day 19

- 实践：实现 research agent

### Day 20

- 实践：实现 content agent

### Day 21

- 项目：`openclaw-mini`
- 建议结构：`agents/`、`bus/`、`scheduler/`

## 第四阶段：Agent OS（Day 22-30）

目标：做一个 Agent OS 原型。

### Day 22

- 主题：Agent OS Architecture
- 模块：runtime、scheduler、memory、tools、sandbox

### Day 23

- 主题：Tool Registry
- 实现：tool discovery、tool metadata

### Day 24

- 主题：Sandbox
- 研究：docker、microVM、wasm

### Day 25

- 主题：Agent State Management

### Day 26

- 主题：Long-running Agents

### Day 27

- 主题：Monitoring
- 关注：logs、metrics

### Day 28

- 项目：`agent-os`
- 建议结构：`runtime/`、`scheduler/`、`tools/`、`memory/`、`sandbox/`

### Day 29

- 优化：refactor、tests、docs

### Day 30

- 总结：Agent OS 完整架构
- 输出：`Day30-agent-os.md`

## 30 天后你会拥有

项目清单：

- `mini-agent`
- `claude-code-lite`
- `openclaw-mini`
- `agent-os`

知识体系：

- Agent Runtime
- Tool System
- Multi-Agent
- Sandbox
- Agent OS

## 这条路线最重要的一点

关键不是“看懂 Agent”，而是“做出 Agent”。

建议每一天都固定产出：

1. 1 篇技术笔记
2. 1 个可运行结果（代码或命令）
3. 1 条复盘结论
