# Day 1: What Is Agent

今天的目标不是记定义，而是建立工程判断：  
什么时候该用 Chatbot，什么时候必须上 Agent。

## 今日目标

1. 说清 Chatbot 和 Agent 的边界
2. 说清 Agent 的最小执行结构
3. 说清 Claw/OpenClaw 代表的运行形态

## 1) Chatbot vs Agent

两者最关键的差异不是“模型能力”，而是“执行结构”。

### Chatbot（请求-响应）

- 模式：用户输入 -> 模型输出 -> 结束
- 优点：简单、上手快、成本低
- 局限：没有持续状态，不负责完整任务流程

### Agent（控制循环）

- 模式：感知 -> 决策 -> 执行 -> 更新 -> 再次感知
- 优点：可持续执行、可多步推进、可管理状态
- 价值：从“回答问题”升级为“完成任务”

一句话区分：`Chatbot 在回答`，`Agent 在做事`。

## 2) Agent 的最小工程架构

结合两篇材料，最小可用 Agent 可以拆成 4 个核心件：

1. `LLM 决策器`
功能：理解目标、分析上下文、产出下一步动作。

2. `工具接口`
功能：把模型输出变成真实动作（读写文件、执行命令、调用 API）。

3. `状态管理`
功能：维护任务进度、历史步骤、上下文和记忆。

4. `控制器（Loop Driver）`
功能：驱动循环、解析输出、调工具、重试失败、判断终止条件。

典型循环：

```text
Observe -> Plan -> Act -> Update -> Evaluate -> Repeat/Stop
```

## 3) Claw / OpenClaw 的理解框架

Day 1 不需要深入实现，先建立“形态地图”。

### A. 命令行 Agent（CLI/TUI）

- 代表：Claude Code、OpenCode、Codex CLI
- 形态：用户触发 -> 执行任务 -> 返回结果
- 适合：个人研发、快速试验、单任务自动化

### B. 服务型 Agent（OpenClaw 类）

- 形态：常驻运行，对外提供能力（HTTP/RPC/消息通道）
- 特征：持续会话、状态维护、多用户/多任务
- 适合：团队系统、流程编排、多 Agent 协作

你可以把 OpenClaw 看成一个“Agent Runtime 壳”，重点学习：

- 如何接入外部消息入口
- 如何驱动 Agent loop 常驻执行
- 如何做任务调度与错误恢复

## 4) AI Native 视角（Day 1 结论）

一个重要转变是：  
框架不是越重越好，而是让 Agent 拥有最小必要能力后，自主生长。

最小能力集可以是：

- `bash`
- `file_read`
- `file_write`

有了这些基础能力，Agent 就能通过 prompt 和技能持续扩展自己。

## 今日实践（必须完成，45-90 分钟）

### 实践 1：写出你的最小 Agent 设计卡

写在 `Day01-agent-basics.md` 的末尾：

- 目标任务（1 句话）
- 终止条件（任务什么状态算完成）
- 可用工具（至少 3 个）
- 失败处理（至少 2 条：retry/fallback）

### 实践 2：画一张执行链路图

```text
User/Trigger -> Controller -> LLM -> Tool -> State Update -> Controller
```

要求：能解释每一跳的数据是什么。

## 交付清单

1. 你的 Day 1 笔记（这篇）
2. 一张最小 Agent 执行链路图
3. 一个可执行的 Day 2 目标：实现最小 Agent Loop

## 参考

- [frostming: 创造一只龙虾，需要些什么?](https://frostming.com/posts/2026/create-a-claw/)
- [凌杰: Agent 的基础应用](https://github.com/owlman/CS_StudyNotes/blob/master/04_%E8%BD%AF%E4%BB%B6%E9%85%8D%E7%BD%AE%E4%B8%8E%E4%BD%BF%E7%94%A8/01.%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7/Agent%26Ollama/Agent%20%E7%9A%84%E5%9F%BA%E7%A1%80%E5%BA%94%E7%94%A8.md)
- [因为总感觉OpenClaw有点不顺手，所以我决定自己写一个](https://mp.weixin.qq.com/s/Y7dyRC7CJ09miHWU6LBzBA)
