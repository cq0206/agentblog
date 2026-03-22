# Inbox Triage Agent 系列总览

之前这篇文章把项目设计、代码结构、架构图、评测和简历表达都放在了一篇里，信息密度太高，不利于按模块阅读。

现在我把它拆成一个系列，按功能分成几篇独立文章：

1. [Inbox Triage Agent：项目总览与架构图](/posts/inbox-triage-agent-overview)
2. [Inbox Triage Agent：Loop 与 Planner 设计](/posts/inbox-triage-agent-loop-planner)
3. [Inbox Triage Agent：Tools、Memory 与 Validator](/posts/inbox-triage-agent-tools-memory-validator)
4. [Inbox Triage Agent：Trace、Eval 与工程闭环](/posts/inbox-triage-agent-trace-eval)

## 为什么要拆开

原因很简单：

- 项目总览适合先建立全局地图
- Loop 和 Planner 适合单独讲控制流
- Tools、Memory、Validator 适合单独讲边界与可靠性
- Trace 和 Eval 适合单独讲调试与迭代闭环

把这些内容拆开之后，每篇文章只回答一个核心问题，阅读和复盘都会轻很多。

## 系列阅读顺序

建议按下面的顺序读：

### 1. 先读总览

先建立这个项目到底在解决什么问题，以及为什么它适合做简历项目。

### 2. 再读 Loop 与 Planner

这一篇最适合理解“Agent 为什么不是一段 prompt”，而是一个控制循环。

### 3. 再读 Tools、Memory 与 Validator

这一篇重点看系统边界怎么收紧，以及为什么可靠性不能只靠模型自己。

### 4. 最后读 Trace 与 Eval

这一篇重点看系统如何调试、如何做 benchmark、如何形成真正的工程闭环。

## 项目仓库结构

这个系列对应的本地项目结构如下：

```text
src/
  agent.js
  planner.js
  tools.js
  classifier.js
  response.js
  validator.js
  eval.js
data/
  tools-db.json
  benchmarks.json
MEMORY.md
TECHNICAL_PLAN.md
```

## 适合什么人读

这个系列更适合下面几类人：

- 想做第一个 Agent 项目的工程师
- 想把 Agent 项目写进简历，但不想做成“聊天框套壳”的人
- 想从工程视角理解 loop、tools、memory、validator、eval 的人

## 系列入口

- [第一篇：项目总览与架构图](/posts/inbox-triage-agent-overview)
- [第二篇：Loop 与 Planner 设计](/posts/inbox-triage-agent-loop-planner)
- [第三篇：Tools、Memory 与 Validator](/posts/inbox-triage-agent-tools-memory-validator)
- [第四篇：Trace、Eval 与工程闭环](/posts/inbox-triage-agent-trace-eval)
