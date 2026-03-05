# Agent 工程师知识地图（2026 版）

这张地图用于避免在 Agent 学习中“只学概念、不做系统”。

## 7 个核心模块

1. Agent Loop
2. Tool System
3. Memory
4. Runtime
5. Multi-Agent
6. Sandbox
7. Agent OS

## 1) Agent Loop

关注点：

- 任务分解
- 计划与执行循环
- 状态更新

验收标准：

- 能稳定执行 observe -> plan -> act -> update

## 2) Tool System

关注点：

- tool schema
- tool registry
- tool router
- function calling

验收标准：

- 能动态发现工具并可靠调用

## 3) Memory

关注点：

- short-term memory
- long-term memory
- retrieval

验收标准：

- 能基于历史任务改善下一步决策

## 4) Runtime

关注点：

- scheduler
- error handling
- retry/fallback
- evaluation

验收标准：

- 任务失败可恢复、可追踪、可评估

## 5) Multi-Agent

关注点：

- coordinator + workers
- message bus
- role-based collaboration

验收标准：

- 多 agent 协作有清晰边界和通信协议

## 6) Sandbox

关注点：

- 隔离执行
- 权限边界
- 资源限制

验收标准：

- 任务执行可控，不污染宿主环境

## 7) Agent OS

关注点：

- runtime、scheduler、memory、tools、sandbox 一体化
- 可观测性与长期运行

验收标准：

- 形成可扩展的 Agent 操作系统原型

## 建议用法

每次学新内容时，先定位到这 7 个模块之一，再回答三个问题：

1. 这属于哪个模块？
2. 这个模块的最小可运行产物是什么？
3. 这个模块如何与其他模块连接？
