# Inbox Triage Agent：Tools、Memory 与 Validator

很多 Agent 项目最危险的地方，不是“不会做事”，而是“做得太自由”。

所以这一篇只讲系统边界。

边界主要由三层组成：

- Tools
- Memory
- Validator

## Tools：为什么必须 allowlist

工具调用层不应该是“让模型随便访问系统”，而应该是显式注册、显式描述、显式执行。

这个项目里只保留了 5 个工具：

```js
export const toolCatalog = {
  lookup_order: 'Fetch order facts by order id.',
  lookup_account: 'Fetch account facts by account id.',
  search_kb: 'Search the knowledge base for an issue-specific playbook.',
  request_missing_fields: 'Ask the user for the missing identifiers needed to continue.',
  escalate: 'Route the ticket to a human with a structured reason.'
};
```

这个工具表越小，越容易得到三个好处：

- planner 更容易选对
- trace 更容易复盘
- benchmark 更容易建立

## 为什么“一次一个工具”更好

因为它更容易观测。

如果一个 step 同时调了 3 个工具，你很难定位问题：

- 是哪个工具结果错了
- 是哪个工具描述误导了 planner
- 是哪个工具调用本来就不该发生

一次一个工具会慢一点，但更适合工程调试。

## Memory：为什么要独立于当前 state

短期状态和长期规则不应该混在一起。

这个项目里，长期规则放在 `MEMORY.md`，内容包括：

- refund policy
- shipping policy
- account policy
- escalation policy

这样做的核心意义是分层：

- `state` 保存当前 ticket 的事实与流程状态
- `memory` 保存相对稳定的系统规则

如果把二者混在一起，后面 prompt 和 trace 都会变得混乱。

## 一个合理的 state 长什么样

```js
{
  ticket,
  category: null,
  urgency: null,
  confidence: 0.55,
  facts: {
    order: null,
    account: null,
    kb: null
  },
  missingFieldRequests: 0,
  lastMissingFields: [],
  escalated: false
}
```

这里最重要的设计点是：

- `facts` 保存查回来的客观信息
- `missingFieldRequests` 和 `escalated` 保存流程状态

事实和流程分开，系统才不容易乱。

## Validator：为什么一定要独立

validator 的职责不是帮模型生成更好的话，而是把不该放出去的结果挡下来。

这个项目里它至少检查两件事：

- 输出是否完整
- 回复是否 grounded

一个精简版本大概是：

```js
const grounded = allowedSnippets.some((snippet) => result.replyDraft.includes(snippet));
const complete = Boolean(result.category && result.urgency && result.recommendedAction);

return {
  grounded,
  complete,
  ok: grounded && complete
};
```

这当然还不是生产级 validator，但它已经体现出一个重要原则：

不要让同一个组件既负责做决定，又负责检查自己有没有错。

## 低置信度和高风险为什么要直接升级

这也是 validator 和 policy 边界的一部分。

例如：

- 低 confidence
- 高风险退款
- 缺少关键 id
- enterprise 高优先级问题

这些情况不应该继续让系统“猜着回答”，而应该明确升级人工。

## 这一层最常见的坑

### 1. 把所有规则塞进 prompt

短期能跑，长期一定难维护。

### 2. 工具没有清晰描述

工具描述不清时，planner 选错工具的概率会明显上升。

### 3. 没有 validator

系统就会在证据不足时输出看起来很像对的答案。

## 下一篇

系统边界收紧之后，最后要补的是调试和迭代闭环：

- [Inbox Triage Agent：Trace、Eval 与工程闭环](/posts/inbox-triage-agent-trace-eval)
