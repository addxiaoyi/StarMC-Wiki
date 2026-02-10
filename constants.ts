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
      { title: "服务器矩阵", path: "/wiki/server-matrix" },
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
  },
  {
    title: "保姆级教程",
    items: [
      { title: "安装与配置", path: "/wiki/guide-install" },
      { title: "启动器指南", path: "/wiki/guide-launcher" },
      { title: "特色玩法探索", path: "/wiki/guide-features" },
      { title: "生存手册", path: "/wiki/guide-survival" },
      { title: "无脑教程文档", path: "/wiki/guide-no-brain" },
    ]
  },
  {
    title: "开发者与贡献者",
    items: [
      { title: "贡献指南", path: "/wiki/contributing" },
    ]
  }
];

export const MOCK_PAGES: WikiPage[] = [
  {
    id: "contributing",
    slug: "contributing",
    title: "贡献指南与 MD 规范",
    category: "开发者与贡献者",
    lastUpdated: "2026-02-10",
    content: "",
    icon: "📝"
  },
  {
    id: "template",
    slug: "template",
    title: "Wiki 页面基础模板",
    category: "开发者与贡献者",
    lastUpdated: "2026-02-10",
    content: "",
    icon: "📄"
  },
  {
    id: "announcement",
    slug: "announcement",
    title: "公告与服务器指南",
    category: "新手入门",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "server-matrix",
    slug: "server-matrix",
    title: "服务器矩阵",
    category: "新手入门",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "intro",
    slug: "intro",
    title: "服务器简介",
    category: "新手入门",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "join",
    slug: "join",
    title: "加入教程",
    category: "新手入门",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "rules",
    slug: "rules",
    title: "服务器规范",
    category: "新手入门",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "commands",
    slug: "commands",
    title: "基础指令",
    category: "游戏机制",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "residence",
    slug: "residence",
    title: "领地系统",
    category: "游戏机制",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "economy",
    slug: "economy",
    title: "经济与贸易",
    category: "游戏机制",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "redstone",
    slug: "redstone",
    title: "红石限制说明",
    category: "进阶指南",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "customization",
    slug: "customization",
    title: "皮肤与披风",
    category: "进阶指南",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "faq",
    slug: "faq",
    title: "常见问题 FAQ",
    category: "进阶指南",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "guide-install",
    slug: "guide-install",
    title: "安装与配置",
    category: "保姆级教程",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "guide-launcher",
    slug: "guide-launcher",
    title: "启动器指南",
    category: "保姆级教程",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "guide-features",
    slug: "guide-features",
    title: "特色玩法探索",
    category: "保姆级教程",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "guide-survival",
    slug: "guide-survival",
    title: "生存手册",
    category: "保姆级教程",
    lastUpdated: "2026-02-10",
    content: "",
  },
  {
    id: "guide-no-brain",
    slug: "guide-no-brain",
    title: "无脑教程文档",
    category: "保姆级教程",
    lastUpdated: "2026-02-10",
    content: "",
  }
];
