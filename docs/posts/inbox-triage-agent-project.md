# 从文章到项目：做一个能写进简历的 Inbox Triage Agent

这篇文章不讲空泛概念，直接回答一个更实际的问题：

读完 Agent 原理、架构、工程实践之后，应该做什么项目，才能在简历上看起来像真正做过 Agent，而不是包了一层聊天框。

我最后收敛到一个很小但很完整的题目：`Inbox Triage Agent`。

一句话介绍：

一个负责处理客服或运营工单的 Agent。它会先判断问题类型和紧急程度，再决定要不要查订单、查账号、查知识库、补充信息，最后输出结构化结论、回复草稿，以及是否需要升级人工。

## 为什么选这个题目

这个题目有四个优点。

### 1. 业务价值非常容易理解

即使不懂 Agent 的人，也能立刻听懂它在解决什么问题：

- 工单分诊
- 查事实
- 生成回复
- 决定是否升级

这比“做一个通用自主 Agent”更容易说清楚价值。

### 2. 很适合体现 Agent 的工程要点

这个项目天然需要：

- 控制循环
- 工具调用
- 上下文状态
- 长短期记忆
- 验证器
- 评测集
- Trace

也就是说，文章里最重要的工程点，基本都能落进去。

### 3. 范围够小

如果一个项目要靠讲故事才能证明它成立，它大概率不适合做简历项目。

Inbox Triage Agent 的边界很明确：

- 输入是一条工单
- 输出是一个决策对象
- 中间只能调用少数工具

这让它适合在 1 到 2 个周末内做完一个可运行版本。

### 4. 很容易做成“可验证”的项目

很多 Agent 项目看起来很酷，但没法评估。

这个题目天然可以做 benchmark：

- 分类是否正确
- 紧急程度是否正确
- 是否该升级人工
- 是否选择了正确工具
- 是否在拿到足够信息之后再结束

这会直接把项目从“demo”拉到“工程”。

## 项目目标

我给这个项目设定的目标很简单：

1. 输入一条工单
2. 判断类别和紧急程度
3. 缺信息就先补信息
4. 需要事实就调用工具查数据
5. 在可回答时输出 grounded 的回复
6. 风险高时升级人工
7. 记录完整 trace

最关键的是第 5 条和第 6 条。

很多“看起来像 Agent”的东西，问题都不在于它不会调用工具，而在于它会在证据不够时乱回答，或者在该升级人工时继续硬答。

## 最小工程架构

我把这个项目拆成了 6 个核心件。

### 1. Planner

Planner 负责下一步动作选择。

它不直接返回最终答案，而是先回答：

- 现在是什么问题
- 是否缺少关键字段
- 是不是该先查订单
- 是不是该先查知识库
- 当前是否应该升级人工
- 现在能不能结束

这个思路很重要：Agent 不是一次性产出所有内容，而是在循环里每次只决定下一步。

### 2. Tool Runner

为了让边界清楚，工具必须是 allowlist，而不是“让模型随便做事”。

这个项目里只保留 5 个工具：

- `lookup_order(orderId)`
- `lookup_account(accountId)`
- `search_kb(query)`
- `request_missing_fields(fields[])`
- `escalate(reason)`

这个约束很关键。工具越少，状态越清楚，越容易调试和评测。

### 3. State Store

状态分成两层：

- 当前 ticket 的工作状态
- 工具返回的事实

例如：

- category
- urgency
- confidence
- order facts
- account facts
- kb facts
- missing fields
- escalated

注意这里没有把所有东西都扔给 prompt，而是显式写进结构化状态。这就是工程化 Agent 和“纯 prompt 堆上下文”的一个重要区别。

### 4. Memory

我把长期规则单独放进 `MEMORY.md`，存的是稳定策略，而不是本次任务的临时状态。

里面放的内容包括：

- refund policy
- shipping policy
- account policy
- escalation policy

这对应文章里提到的思路：让短期上下文和长期记忆分层，别把所有东西都塞进一锅 prompt。

### 5. Validator

Validator 不负责生成答案，只负责挡住不该放出去的答案。

它至少要检查两件事：

- 输出是否完整
- 回复是否 grounded 在当前已知事实上

比如回复里如果提到了订单状态、ETA、账号状态或知识库结论，这些内容都必须来自工具结果或 memory，而不是模型自己补出来。

### 6. Trace

每次运行都记录：

- planner decision
- tool call result
- validator result
- final output

Trace 的价值不是“好看”，而是出了错之后能定位到底是：

- 分类错了
- 工具描述不准
- 缺信息没拦住
- 升级规则不对
- validator 没挡住

## 控制循环长什么样

核心 loop 并不复杂。

```text
Read Ticket
-> Infer Category/Urgency
-> Plan Next Action
-> Run One Tool
-> Update State
-> Validate Stop Condition
-> Finalize or Repeat
```

这也是这类项目最值得练的地方：

不要让主循环越来越胖，不要把所有分支逻辑塞成一个状态机。

更稳的做法是：

- 主循环保持薄
- 能力通过工具扩展
- 规则通过 memory 扩展
- 可靠性通过 validator 和 eval 保证

## 为什么我没有一上来就接大模型

这版实现是本地可运行版本，Planner 先用启发式逻辑实现，而不是直接接线上模型。

原因有三个。

### 1. 先把系统边界跑通

如果一上来就接模型，很容易把所有问题都归咎于“模型不够聪明”。

但真正影响工程效果的，很多时候是：

- 工具定义不清楚
- 状态结构混乱
- 停止条件不明确
- 没有 validator
- 没有 eval

先用确定性 Planner，把这些地方做清楚，系统会更稳。

### 2. 方便做可重复评测

如果一开始就用随机性较强的模型输出，benchmark 波动会掩盖系统设计问题。

本地 deterministic planner 更适合先把 harness 打稳。

### 3. 方便后续替换

这个项目的接口设计是故意留缝的。

未来如果换成 LLM Planner，只需要替换“下一步动作选择”的实现，而不需要推倒：

- 工具 schema
- 状态管理
- validator
- trace
- eval harness

这才是值得在简历里讲的“可演化架构”。

## 具体实现里有哪些技术点

下面这些点，都是我认为值得在 blog 里展开、也值得在面试里重点讲的。

### 1. 显式状态，而不是隐式 prompt

如果状态不落在结构里，你最后只会得到一个越来越长、越来越难维护的 prompt。

这个项目把关键状态单独建模：

- `category`
- `urgency`
- `confidence`
- `facts.order`
- `facts.account`
- `facts.kb`
- `missingFieldRequests`
- `lastMissingFields`
- `escalated`

这样调试时就知道错在什么字段，不用靠猜。

### 2. 一次只跑一个工具

一次一个工具不是保守，而是为了可观测性。

如果一次做三件事，出了错你根本不知道是哪一步导致结果偏了。

一个好的 Agent loop，往往不是最快的，而是最容易定位问题的。

### 3. Missing information 是一等公民

很多项目默认输入永远完整，这几乎不符合真实业务。

所以我把 `request_missing_fields` 做成正式工具，而不是把“补信息”藏进回复文案里。

这有两个好处：

- 可以显式记一次“我已经问过了”
- 问过一轮还缺信息时，可以明确升级人工

### 4. Confidence 不是装饰字段

很多 demo 会放一个 confidence，但它对系统没任何实际作用。

这个项目里，confidence 真正参与决策：

- 低于阈值就升级人工
- 配合 category、facts、missing fields 一起更新

这让它不只是“展示字段”，而是控制边界的一部分。

### 5. Validator 独立于 Planner

这点很重要。

如果让同一个组件既负责做决定，又负责检查自己有没有错，最后通常只会得到“自己认为自己没问题”。

独立 validator 的意义在于：

- planner 负责推进任务
- validator 负责拦错

这两个职责必须分开。

### 6. Benchmark 要先有，再去调系统

如果没有 benchmark，你每次改完都只能靠感觉判断“好像更好了”。

这个项目先准备了一组小 benchmark，覆盖：

- 订单延迟
- 密码重置
- VIP 丢件
- 损坏退款
- 缺少 order id 的退款请求

然后统一计算：

- category accuracy
- urgency accuracy
- escalation accuracy
- completion rate

这是一个非常小的 harness，但已经能帮你避免“瞎调 prompt”。

## 当前结果

本地 demo 跑了 3 个案例：

- 普通延迟订单
- 损坏商品退款
- 缺失 order id 的退款请求

评测集目前是一个 5 条样本的 toy benchmark，当前结果是：

```json
{
  "total": 5,
  "categoryAccuracy": 100,
  "urgencyAccuracy": 100,
  "escalationAccuracy": 100,
  "completionRate": 100
}
```

这个结果当然不代表系统已经“强”，它只代表一件事：

这个小系统现在已经有了可重复验证的工程闭环。

这比单纯做一个演示视频更重要。

## 项目结构

这一版我把代码拆成下面这些文件：

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

这种拆法故意让每个模块职责单一：

- `agent.js` 负责 loop
- `planner.js` 负责下一步动作
- `tools.js` 负责工具边界
- `validator.js` 负责质量门禁
- `eval.js` 负责衡量结果

## 如果把它升级成真正的生产版

这个项目已经有一个清晰的升级路径。

### 第一步

把启发式 Planner 换成 LLM Planner。

但仍然要求它只输出结构化 action，而不是直接自由发挥回复。

### 第二步

把 fake tool backend 换成真实系统：

- CRM
- 订单服务
- 知识库检索
- 工单系统

### 第三步

把 trace 和 state 存到数据库中，用于：

- 人工复盘
- 在线抽样评估
- 错误归因

### 第四步

引入 human-in-the-loop UI：

- 允许人工批准升级
- 允许人工修改回复
- 回收纠正样本进入 benchmark

这时项目就会从一个本地 demo，变成一个真正有产品化可能的 Agent 系统。

## 这类项目最容易踩的坑

我觉得有 5 个坑特别常见。

### 1. 以为“接了工具”就等于做了 Agent

不对。

工具只是执行能力，不是系统设计。

真正难的是：

- 什么时候调工具
- 调完怎么更新状态
- 什么条件下停止
- 什么条件下不该继续答

### 2. 把所有规则塞进 prompt

短期能跑，长期一定崩。

policy、memory、state、tool descriptions、validator 这些东西应该拆开管理。

### 3. 没有 benchmark 就开始优化

没有 benchmark 的优化，大多数只是“感觉更好”。

### 4. Trace 太少

如果只记最终输出，不记中间决策，系统一错你就完全不知道错在哪一步。

### 5. 先追求模型能力，后补工程能力

这个顺序常常会让项目越来越不可控。

更稳的顺序是：

1. 先把 loop 跑通
2. 再把工具边界收紧
3. 再把 validator 和 eval 补上
4. 最后再换更强的 Planner

## 这个项目怎么写进简历

下面是我认为比较靠谱的写法。

### 写法一：偏工程实现

- 设计并实现一个 Inbox Triage Agent，用于支持工单分类、事实检索、回复草拟与人工升级决策。
- 将 Agent 拆分为 planner、tool runner、memory、validator、trace、eval harness 等模块，提升系统可观测性与可靠性。
- 基于本地 benchmark 评估分类、紧急度与升级决策准确率，建立可重复验证的 Agent 调优闭环。

### 写法二：偏可靠性

- 为工单 Agent 构建显式状态管理、知识策略记忆、验证器与 trace 体系，减少“无依据回答”和错误自动化决策风险。
- 通过缺失信息追问、低置信度升级人工、工具白名单等机制，为多步 Agent 流程建立安全边界。

## 面试里怎么讲才像真的做过

我会建议重点讲这三句话。

### 1. 我没有把重点放在“让模型显得更聪明”

而是放在：

- 工具定义
- 状态结构
- validator
- eval

### 2. 我刻意让主循环保持简单

真正复杂的部分被拆到了：

- memory
- tools
- policy
- trace
- benchmark

### 3. 我先做确定性 harness，再替换成 LLM Planner

因为如果系统边界和评测框架没建立起来，换更强模型通常也只是在放大不稳定性。

## 最后

如果你只想做一个“看起来像 Agent”的东西，做聊天框就够了。

但如果你想做一个能写进简历、也能在面试里讲得住的 Agent 项目，那重点就不是“能不能调用模型”，而是：

- 有没有清晰的控制循环
- 有没有可解释的工具边界
- 有没有显式状态
- 有没有 memory 分层
- 有没有 validator
- 有没有 trace
- 有没有 benchmark

Inbox Triage Agent 不是最炫的题目，但它足够小、足够完整，也足够像真正的工程问题。

这正是它适合作为第一个 Agent 项目的原因。
