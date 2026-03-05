# AI Computer 架构图（2026）

AI Computer 不是普通 chatbot，也不只是单个 agent。  
它强调的是：让 AI 像人一样使用计算机环境完成任务。

## 六层架构

1. User Interface
2. Agent Layer
3. Runtime Layer
4. Execution Layer
5. Sandbox Layer
6. Infrastructure

## 全局架构

```text
                User
                 |
                 v
           Chat / Command
                 |
                 v
            AI Computer
                 |
     +-----------+-----------+
     v           v           v
  Agent      Planner      Memory
     |           |           |
     +-----------+-----------+
                 v
            Agent Runtime
                 |
        +--------+--------+
        v        v        v
      Browser  Terminal  Python
      Engine    Engine   Runtime
        |        |        |
        +--------+--------+
                 v
           Execution Engine
                 |
         +-------+--------+
         v       v        v
      File IO  Network   APIs
                 |
                 v
              Sandbox
                 |
       +---------+---------+
       v         v         v
     Docker    microVM     WASM
                 |
                 v
            Infrastructure
```

## 每层职责

User Interface：

- chat
- command
- voice

Agent Layer：

- 理解任务
- 拆解任务
- 生成执行计划

Runtime Layer：

- observe -> plan -> act -> update
- context management
- tool routing
- state management

Execution Layer：

- browser automation
- terminal commands
- python execution
- file operations

Sandbox Layer：

- 隔离执行
- 资源限制
- 安全边界

Infrastructure：

- compute
- storage
- network
- queues

## AI Agent vs AI Computer

```text
AI Agent      : 单任务 / 短生命周期 / workflow
AI Computer   : 多任务 / 长期运行 / 计算环境
```

一句话：`Agent = worker`，`AI Computer = machine`。

## 关键趋势

未来软件形态可能从 App 转向 AI Computer。  
用户只给出目标，系统自动完成：规划、执行、验证、交付。

## 核心组件

- Agent Runtime
- Sandbox Matrix
- Tool Ecosystem
- Persistent Memory
- Task Scheduler

## 总结

```text
LLM + Runtime + Execution Engine + Sandbox = AI Computer
```

继续阅读：

- [Agent 工程师知识地图（2026）](/posts/knowledge-map-2026)
- [Agent OS 内核架构图（2026）](/posts/agent-os-kernel-2026)
