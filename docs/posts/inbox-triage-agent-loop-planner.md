# Inbox Triage Agent：Loop 与 Planner 设计

Agent 项目最容易做错的地方，不是模型不够强，而是控制流设计得太乱。

这一篇只讲两件事：

- loop 怎么保持简单
- planner 为什么只该输出“下一步动作”

## 先看最小控制循环

核心 loop 非常短：

```js
for (let step = 1; step <= 8; step += 1) {
  const action = planNextAction(state);

  if (action.type === 'state_update') {
    state.category = action.payload.category;
    state.urgency = action.payload.urgency;
    state.confidence = estimateConfidence(state);
    continue;
  }

  if (action.type === 'tool_call') {
    const result = runTool(action, state);
    applyToolResult(state, action, result);
    state.confidence = estimateConfidence(state);
    continue;
  }

  if (action.type === 'finalize') {
    const finalResult = buildFinalResponse(state);
    const validation = validateFinalResponse(state, finalResult);
    return { result: finalResult, validation };
  }
}
```

这里最关键的不是代码短，而是主循环只负责三种事情：

- 更新状态
- 执行工具
- 处理停止条件

它不直接理解业务细节。

## 为什么 loop 一定要薄

因为一旦主循环开始接管所有业务分支，它很快就会变成一个难以维护的大状态机。

更稳的方式是：

- loop 负责 orchestration
- planner 负责 next action
- tools 负责 side effects
- validator 负责输出门禁

这样每一层都能单独调试。

## Planner 到底负责什么

planner 不负责“像客服一样回复”，而是负责决定下一步：

- 先分类
- 还是先查订单
- 还是先查账号
- 还是先追问缺失字段
- 还是应该直接升级人工
- 还是已经可以结束

所以它的输出一定要是结构化 action，而不是自由文本。

## 一个典型 planner 分支

比如 order id 缺失时：

```js
if (needsOrder(category) && !state.ticket.orderId && state.missingFieldRequests === 0) {
  return {
    type: 'tool_call',
    tool: 'request_missing_fields',
    input: { fields: ['orderId'] },
    reason: 'Order-related issues require an order id before policy or status decisions.'
  };
}
```

而当拿到 order id 之后：

```js
if (state.ticket.orderId && !state.facts.order) {
  return {
    type: 'tool_call',
    tool: 'lookup_order',
    input: { orderId: state.ticket.orderId },
    reason: 'Fetch order facts before answering.'
  };
}
```

这类设计的价值是：

- planner 输出可验证
- tool 执行边界清晰
- trace 更容易看懂

## 为什么不要让 planner 直接输出最终回复

如果 planner 同时做两件事：

- 决定下一步
- 直接生成最终答案

那你后面会很难区分，到底错在：

- 控制流
- 工具选择
- 还是回复生成

而把它拆开之后，系统就会更可解释。

## 时序图

```mermaid
sequenceDiagram
    participant User as User
    participant Loop as Agent Loop
    participant Planner as Planner
    participant Tool as Tool Runner
    participant State as State
    participant Validator as Validator

    User->>Loop: submit ticket
    Loop->>Planner: current state + memory
    Planner-->>Loop: next action
    alt tool call
        Loop->>Tool: run allowlisted tool
        Tool-->>Loop: tool result
        Loop->>State: update facts / flags
        Loop->>Planner: re-plan
    else finalize
        Loop->>Validator: validate final response
        Validator-->>Loop: pass / fail
        Loop-->>User: structured result + reply draft
    end
```

这个时序图强调的是“一次只推进一步”。

## 什么时候应该 finalize

不是模型觉得“差不多能答了”就结束，而是系统满足显式条件才结束：

- category 已有
- urgency 已有
- 必要 facts 已拿到
- 或者已经触发 escalation

这类停止条件越清楚，系统越稳定。

## 这一层最常见的坑

### 1. 主循环过胖

一堆业务规则直接写进 loop，本质上是在做硬编码状态机。

### 2. planner 输出自然语言

这样会让下游需要再做解析，稳定性迅速下降。

### 3. 工具和停止条件耦合在一起

最后会变成“工具跑完了但不知道能不能停”。

## 下一篇

控制流清楚之后，下一层就是系统边界：

- [Inbox Triage Agent：Tools、Memory 与 Validator](/posts/inbox-triage-agent-tools-memory-validator)
