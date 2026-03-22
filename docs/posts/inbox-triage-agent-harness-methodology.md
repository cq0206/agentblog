# Harness 方法论：从 learn-claude-code 看 Agent 工程分层

很多人说“我要开发 Agent”，但真正落到工程时，最容易混淆的一点是：

到底在开发什么？

`learn-claude-code` 给出的最有价值视角，不是某个 Claude 技巧，而是把问题拆得很清楚：

- model 是 agent
- 工程师主要在构建 harness

这篇文章只讲这个方法论，以及它为什么对 `Inbox Triage Agent` 很重要。

## 一、什么是 harness 视角

把问题切成 harness 之后，你会更自然地把系统拆成这些层：

- tools
- knowledge
- observation
- action interfaces
- permissions

这会强迫你把注意力从“再写一个更复杂的 prompt”移开，转向：

- 如何给模型清晰的手
- 如何给模型干净的上下文
- 如何给模型明确的边界

## 二、learn-claude-code 最值得吸收的结构

这个仓库里反复强调的，不是某个神秘技巧，而是一整套渐进式机制：

- one loop
- tools
- planning
- on-demand knowledge loading
- context compression
- task graph
- background execution
- subagents
- team coordination
- worktree isolation

这些东西合起来，构成的不是“更花的 prompt plumbing”，而是更完整的 harness。

## 三、为什么这套思路适合 Inbox Triage Agent

因为 `Inbox Triage Agent` 本质上也是 harness 问题。

它真正难的不是“模型会不会说话”，而是：

- 什么时候该查订单
- 什么时候该查知识库
- 缺字段时该不该停下来
- 什么时候不该继续自动回答
- 什么时候必须升级人工

这些都不是 prompt 文案问题，而是系统分层问题。

## 四、在这个项目里，对应关系是什么

### 1. one loop

对应主控制循环：

- 读取 ticket
- 决定下一步
- 调一个工具
- 更新状态
- 判断是否结束

### 2. tools

对应 allowlisted tools：

- `lookup_order`
- `lookup_account`
- `search_kb`
- `request_missing_fields`
- `escalate`

### 3. planning

对应 `planner.js`。

它只负责 next action，而不直接负责最终回复。

### 4. knowledge loading

对应 `MEMORY.md` 和知识库工具。

重点不是一开始塞满 prompt，而是需要时加载 policy。

### 5. context management

对应显式 state：

- category
- urgency
- facts
- missing field flags
- escalated

### 6. task / trace / eval

这个项目还没有完整 task graph，但已经有：

- trace
- benchmark
- 明确停止条件

这已经足够支撑后续继续演化。

## 五、最值得借鉴的是“复杂性外移”

`learn-claude-code` 最值得借鉴的，不是“Claude”本身，而是这种分层意识：

- loop 尽量不变
- 新能力通过 harness 叠加
- 复杂性不塞进主循环

对 `Inbox Triage Agent` 来说，这意味着：

- loop 保持薄
- planner 独立
- tools 独立
- memory 独立
- validator 独立
- trace 和 eval 独立

这样每一层都能单独调试和替换。

## 六、如果不用 harness 视角，会发生什么

通常会发生三件事：

### 1. 主循环越来越胖

最后变成一个很难读的业务状态机。

### 2. prompt 越来越长

系统边界都靠文案堆出来，最终难以维护。

### 3. 很难做 benchmark

因为错误没有清晰归因，系统只能凭感觉迭代。

## 七、为什么这篇方法论文章重要

因为它决定你后面做的是：

- 一个会说话的 demo

还是：

- 一个有工程分层、可以迭代、可以评测的 Agent 系统

## 八、下一步该看什么

如果 harness 方法论已经清楚，下一步最值得看的就是产品层形态：

- [Agent-native 产品形态：从 HappyCapy 看运行时与工作台](/posts/inbox-triage-agent-agent-native-product)

## 参考

- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code)
