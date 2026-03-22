# Agent-native 产品形态：从 HappyCapy 看运行时与工作台

如果说 `learn-claude-code` 更像“怎么做 harness”的教学实现，那 `happycapy` 更像“agent-native product 应该怎么长”的产品化参考。

这一篇不讲方法论，而是讲产品层。

## 一、HappyCapy 当前公开信息里最重要的关键词

从公开页面能提炼出几组很有代表性的产品描述：

- `Turn your browser into an agent native computer`
- `Let AI agents work for you 24/7`
- `Delegate work with Claude Code`
- `powered by 150 plus AI models`
- `secure sandbox environment`

这些话如果翻译成工程语言，其实在讲五种产品能力。

## 二、浏览器即运行时入口

“Turn your browser into an agent native computer” 这句话的重点不是浏览器，而是运行时入口。

它暗示的不是“网页里有个聊天框”，而是：

- 浏览器本身就是工作台
- Agent 在其中有持续操作环境
- 用户不是只发一次请求，而是在管理一个运行中的系统

这和普通 AI chat 产品差别很大。

## 三、24/7 agent execution

“Let AI agents work for you 24/7” 意味着系统不再是同步问答，而是具备：

- 长任务
- 后台执行
- 持续运行
- 恢复与通知

对 `Inbox Triage Agent` 来说，这就是从“单 ticket demo”走向“持续处理工单队列”的关键分水岭。

## 四、Claude Code delegation

“Delegate work with Claude Code” 很值得注意。

它说明产品层不一定自己重新发明 agent runtime，而可以把已有强 runtime 包装成更可用的入口。

从产品设计角度看，这代表：

- 用户关心的是 delegation experience
- runtime 可以是底层能力
- 产品重点在工作流、权限和体验整合

## 五、多模型不是卖点，而是架构信号

“150 plus AI models” 真正重要的地方，不是数字，而是它在暗示：

- 模型层是可替换的
- 产品层不应该和单模型强耦合
- routing 和 orchestration 会变成一等公民

这也意味着一个成熟产品会考虑：

- 轻模型做分类
- 强模型做复杂判断
- 中等模型做 draft generation
- 规则和模型一起做 validation

## 六、安全沙箱是产品能力，不是附属能力

“secure sandbox environment” 这句话特别重要。

很多人做 Agent 产品时，会把安全边界放到最后补。

但真正的 agent-native product 恰恰相反：

- sandbox
- approvals
- permissions
- trust boundaries

这些都应该是核心卖点的一部分。

## 七、如果把 Inbox Triage Agent 往这个方向推，要补什么

现在的 `Inbox Triage Agent` 已经有了：

- loop
- planner
- tools
- memory
- validator
- trace
- eval

但如果要更接近 HappyCapy 这种产品形态，我会优先补下面几层。

### 1. 长任务与后台队列

- 持续处理多个 ticket
- 支持恢复
- 支持通知

### 2. 前端工作台

- ticket queue
- trace viewer
- reviewer panel
- model routing 面板

### 3. 权限系统

- 不同工具不同权限等级
- 高风险动作审批
- 外部系统 trust boundary

### 4. 多 worker 结构

- 分类 agent
- 检索 agent
- draft agent
- 风险审查 agent

### 5. 多模型策略

- 分类轻模型
- 风险判断强模型
- draft 中模型
- validator 规则加模型混合

## 八、产品化路线图

如果把这条路写成演化顺序，我会这样排：

```text
Local loop
-> Structured tools
-> Persistent state
-> Background jobs
-> Human review
-> Permissions
-> Multi-model routing
-> Browser workspace/runtime
```

这条路线的关键不是“界面更好看”，而是系统从一次性 demo 变成真正可运营的 runtime。

## 九、为什么这篇要和 harness 方法论分开

因为它们回答的是两类不同问题：

- harness 方法论回答：系统底层怎么搭
- agent-native 产品形态回答：系统最终怎么被人使用

前者偏工程分层，后者偏 runtime 和工作台设计。

## 十、结论

如果你把 `Inbox Triage Agent` 放在成长路径里看，它最好的位置不是终点，而是中间层：

- 往下接 harness engineering
- 往上接 agent-native product

这也是为什么我觉得 HappyCapy 最值得参考的，不只是视觉包装，而是它对“浏览器工作台、持续执行、多模型、沙箱”的产品层组合。

## 参考

- [happycapy.ai/app](https://happycapy.ai/app)
