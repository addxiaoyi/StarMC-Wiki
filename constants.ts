
import { NavItem, WikiPage } from './types';

export const SERVER_NAME = "舵星归途 StarMC";
export const OFFICIAL_WEBSITE = "https://star-web.top";
export const GITHUB_DOCS_PATH = "(docs)";

export const SERVER_IPS = {
  primary: "mc.star-mc.top",
  secondary: "play.star-mc.top",
  mod: "mod.star-mc.top"
};

export const NAVIGATION: NavItem[] = [
  {
    title: "新手入门",
    items: [
      { title: "服务器简介", path: "/wiki/intro" },
      { title: "加入教程", path: "/wiki/join" },
      { title: "服务器规范", path: "/wiki/rules" },
      { title: "公告与服务器指南", path: "/wiki/announcement" },
    ]
  },
  {
    title: "游戏机制",
    items: [
      { title: "基础指令", path: "/wiki/commands" },
      { title: "领地系统", path: "/wiki/residence" },
      { title: "经济与贸易", path: "/wiki/economy" },
    ]
  },
  {
    title: "进阶指南",
    items: [
      { title: "红石限制说明", path: "/wiki/redstone" },
      { title: "皮肤与披风", path: "/wiki/customization" },
      { title: "常见问题 FAQ", path: "/wiki/faq" },
    ]
  }
];

export const MOCK_PAGES: WikiPage[] = [
  {
    id: "announcement",
    slug: "announcement",
    title: "公告与服务器指南",
    category: "新手入门",
    lastUpdated: "2026-02-08",
    content: `# 公告与服务器指南

> 群文件可以下载东西❗

## 官网与状态
- 服务器官网（制作中）：https://star-web.top
- 服务器状态页：https://status.s3.fan/s/starmc

## 通用测试服
- pm.rainplay.cn:56586

## 连接线路
- 主线路：\`${SERVER_IPS.primary}\`
- 备用线路：\`${SERVER_IPS.secondary}\`
- 模组服：\`${SERVER_IPS.mod}\`

## 版本与跨服
- 插件群组服 IP 在另一个公告（支持跨版本，推荐使用 1.21.8 进入所有服务器）
- 提示：进入提示需要密码且没有注册选项？
  - 正版玩家：请联系管理
  - 离线登录：请更换一个未被注册的名字（密码为你自行设置，请妥善保管）

## 服务器矩阵
1. Pylon 科技生存服（等待中）1.21.8（预计年底到明年春节开放）
2. 纯生存服（运行中）更新至 1.21.10（不出意外存档不更换）
3. 空岛粘液科技生存服（运行中）1.21.4
4. 小游戏（大致完善，更新中）1.20.4（暂时使用 Shift+F 打开跨服传送）
5. 诺娜大陆（开发中）1.21.4
6. 无尽地牢（运行中）1.21.1
7. 无政府国战（权力宝石之争）（运行中）1.21.8

## 模组相关
2. 不定时模组服：star-web.top 下载群内模组端游玩（运行中）
3. 模组枪战服：gun.star-mc.top（开发中）
4. 舵星归途 RPG：star-mc.top（开发中）

## 领地插件教程
### 第一步：圈地创建领地
1. 准备工具：拿出 **木锄头**（选区专用工具）
2. 选择区域：
   - 左键点击领地的一个对角（如房子左下角或地底最深处）
   - 右键点击另一个对角（如房子右上角或天空最高处）
   - 计费根据体积大小决定
3. 创建领地：选中区域后输入：
   - \`/res create [你的领地名字]\`
   - 例子：\`/res create MyHouse\`

### 第二步：管理你的领地
1. 添加/移除信任玩家
   - 添加：\`/res padd [你的领地名字] [朋友ID]\`
   - 移除：\`/res remove [你的领地名字] [朋友ID]\`
   - 小贴士：站在领地中时可省略领地名，默认为当前所在领地
2. 设置领地权限（Flags）
   - 格式：\`/res set [你的领地名字] [权限名] [t/f]\`

### 第三步：实用命令
- 传送到领地：\`/res tp [你的领地名字]\`
- 重命名领地：\`/res rename [旧名字] [新名字]\`
- 删除领地：\`/res delete [你的领地名字]\`
- 重要提示：\`[]\` 为占位符，需要替换为你的实际内容
- 查看限制：\`/res limits\` 查看还能创建多少个领地

## 社区与文档
- Discord 频道：https://discord.gg/tZHTRKYzHh
- FCL 启动器教程（腾讯文档）：https://docs.qq.com/doc/DZXBvd3N0WnhGU1Vr
`
  },
  {
    id: "intro",
    slug: "intro",
    title: "服务器简介",
    category: "新手入门",
    lastUpdated: "2025-11-20",
    content: `# 欢迎来到 舵星归途 StarMC\n\n这是一个以**技术交流**与**纯净生存**为核心的 Minecraft 服务器。我们致力于提供一个稳定、公正且富有创造力的环境。\n\n## 服务器特色\n- **极致性能**：采用高端硬件配置，保证流畅的游戏体验。\n- **官方网站**：[star-web.top](https://star-web.top)\n- **纯净体验**：保留原汁原味的生存快感。\n\n> "无论你来自何方，这里都是你的星际港湾。"`,
  },
  {
    id: "join",
    slug: "join",
    title: "加入教程",
    category: "新手入门",
    lastUpdated: "2025-11-22",
    content: `# 如何加入服务器\n\n加入 舵星归途 非常简单，请使用以下地址连接：\n\n### 服务器地址\n- **主线路**：\`${SERVER_IPS.primary}\`\n- **备用线路**：\`${SERVER_IPS.secondary}\`\n- **模组服**：\`${SERVER_IPS.mod}\`\n\n### 客户端版本\n请使用 Minecraft Java Edition 客户端连接。版本建议保持在 1.20.x 或 1.21.x。`,
  },
  {
    id: "rules",
    slug: "rules",
    title: "服务器规范",
    category: "新手入门",
    lastUpdated: "2025-12-01",
    content: `# 服务器规范\n\n为了维护良好的游戏环境，请务必遵守以下规则：\n\n1. **严禁作弊**：禁止使用任何破坏平衡的外挂。\n2. **尊重他人**：禁止任何形式的语言攻击或骚扰行为。\n3. **建筑保护**：禁止破坏他人建筑。\n4. **红石限制**：请查阅详细的红石限制说明。`,
  },
  {
    id: "commands",
    slug: "commands",
    title: "基础指令",
    category: "游戏机制",
    lastUpdated: "2025-12-05",
    content: `# 基础指令指南\n\n在服务器中，你可以使用以下常用指令：\n\n### 传送指令\n- \`/spawn\`：返回主城。\n- \`/tpa [玩家名]\`：申请传送到某位玩家身边。\n- \`/tpahere [玩家名]\`：申请某位玩家传送到你身边。\n- \`/back\`：返回上一次死亡点或传送点。\n\n### 家与领地\n- \`/sethome [名字]\`：设置一个家。\n- \`/home [名字]\`：回到设置好的家。\n- \`/res ...\`：领地插件相关指令，详见领地系统页面。`,
  },
  {
    id: "residence",
    slug: "residence",
    title: "领地系统",
    category: "游戏机制",
    lastUpdated: "2025-12-02",
    content: `# 领地系统 (Residence)\n\n为了保护你的建筑不被破坏，请务必圈定领地。\n\n### 圈地步骤\n1. 使用 **木斧** 左键点击第一个点，右键点击第二个点。\n2. 输入 \`/res select vert\` 来扩展高度至天空与基岩。\n3. 输入 \`/res create [领地名]\` 完成创建。\n\n### 权限管理\n- \`/res pset [领地名] [玩家名] [权限] t/f\`：设置单个玩家权限。\n- 常用权限：\`use\`, \`build\`, \`container\`。`,
  },
  {
    id: "economy",
    slug: "economy",
    title: "经济与贸易",
    category: "游戏机制",
    lastUpdated: "2025-11-28",
    content: `# 经济与贸易\n\n服务器拥有一套完整的货币体系，用于玩家间的交易和主城商店购买。\n\n### 货币查看\n- \`/money\`：查看个人当前余额。\n- \`/pay [玩家名] [金额]\`：转账给其他玩家。\n\n### 玩家商店\n你可以通过创建箱子商店来出售你的物资，具体教程请在主城商业区查看演示。`,
  },
  {
    id: "redstone",
    slug: "redstone",
    title: "红石限制说明",
    category: "进阶指南",
    lastUpdated: "2025-12-08",
    content: `# 红石与生电限制\n\n作为生电友好服，我们尽量减少限制，但为了服务器整体流畅度，请遵守以下守则：\n\n1. **高频时钟**：禁止使用不带开关的高频活塞或红石粉环。\n2. **大规模机器**：单块领地内禁止堆叠超过一定密度的漏斗或实体。\n3. **挂机机制**：挂机池必须配合低频检测，禁止恶意卡服。\n4. **自动收割**：建议使用侦测器触发，而非始终处于激活状态。`,
  },
  {
    id: "customization",
    slug: "customization",
    title: "皮肤与披风",
    category: "进阶指南",
    lastUpdated: "2025-11-30",
    content: `# 皮肤与个性化设置\n\n我们支持非正版皮肤显示，方便玩家展示个性。\n\n### 设置皮肤\n- 我们接入了外置皮肤站服务，请在官网注册后关联你的角色名。\n- 如果你是正版玩家，服务器会自动同步你的正版皮肤。\n\n### 披风获取\n部分披风可通过参与社区活动或对服务器进行贡献获得。`,
  },
  {
    id: "faq",
    slug: "faq",
    title: "常见问题 FAQ",
    category: "进阶指南",
    lastUpdated: "2025-12-10",
    content: `# 常见问题解答 (FAQ)\n\n### Q: 为什么连接提示 "Outdated Server"?\nA: 请确保你的客户端版本与服务器支持的版本（1.20.x/1.21.x）一致。\n\n### Q: 进服没有白名单怎么办？\nA: 请前往官网 [star-web.top](https://star-web.top) 提交白名单申请或联系管理员。\n\n### Q: 游戏内卡顿如何反馈？\nA: 请使用 \`/lag\` 查看当前服务器状态，并联系在线管理人员提交报错。`,
  }
];
