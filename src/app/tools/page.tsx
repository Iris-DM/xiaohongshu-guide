"use client";

import { useState } from "react";
import {
  Search,
  ShieldAlert,
  Palette,
  Image as ImageIcon,
  Video,
  LayoutTemplate,
  ExternalLink,
  SearchX,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "全部" },
  { id: "content", label: "内容创作" },
  { id: "design", label: "设计工具" },
  { id: "video", label: "视频工具" },
];

const tools = [
  {
    id: "xhs-sensitive",
    name: "小红书违禁词查询",
    category: "content",
    description: "检测笔记内容中的违禁词、敏感词，避免笔记被限流或违规下架",
    icon: ShieldAlert,
    iconColor: "destructive",
    tip: "推荐工具：句易、零克查词、词爪",
    suitable: "所有小红书创作者",
  },
  {
    id: "canva",
    name: "Canva可画",
    category: "design",
    description: "在线设计平台，海量模板一键套用，轻松制作精美封面、配图",
    icon: Palette,
    iconColor: "primary",
    tip: "适合人群：设计新手、追求效率的创作者",
    suitable: "设计新手",
  },
  {
    id: "xingtu",
    name: "醒图",
    category: "design",
    description: "全能修图APP，智能美颜、滤镜调色、海报制作一站式搞定",
    icon: ImageIcon,
    iconColor: "warning",
    tip: "适合人群：自拍爱好者、人像修图需求者",
    suitable: "自拍爱好者",
  },
  {
    id: "image-search",
    name: "图片搜索推荐",
    category: "design",
    description: "堆糖、花瓣网精选高质量图片素材，灵感采集必备",
    icon: Search,
    iconColor: "success",
    tip: "推荐平台：堆糖、花瓣网、Pinterest",
    suitable: "所有创作者",
  },
  {
    id: "jianying",
    name: "剪映",
    category: "video",
    description: "抖音官方剪辑工具，模板丰富、特效炫酷、一键成片",
    icon: Video,
    iconColor: "primary",
    tip: "适合人群：短视频创作者、Vlog博主",
    suitable: "短视频创作者",
  },
  {
    id: "gaoding",
    name: "稿定设计",
    category: "design",
    description: "多场景在线设计工具，小红书封面模板丰富，一键套用",
    icon: LayoutTemplate,
    iconColor: "destructive",
    tip: "特点：小红书模板多、尺寸适配完美",
    suitable: "小红书创作者",
  },
];

export default function ToolsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      searchValue === "" ||
      tool.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "success":
        return "bg-success/10 text-success";
      case "warning":
        return "bg-warning/10 text-warning";
      case "destructive":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">创作工具大全</h1>
        <p className="text-sm text-muted-foreground mt-2">精选实用工具，助力高效创作</p>
      </div>

      {/* 搜索框 */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索工具..."
            className="w-full bg-muted border-none rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
          />
        </div>
      </div>

      {/* 工具分类标签 */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
              activeCategory === category.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* 工具卡片列表 */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <article
                key={tool.id}
                className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      getIconColorClass(tool.iconColor)
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/20">
                  <p className="text-xs text-muted-foreground mb-3">{tool.tip}</p>
                  <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5" />
                    查看指南
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <SearchX className="w-16 h-16 text-muted-foreground/30 mx-auto" />
          <p className="text-sm text-muted-foreground mt-4">未找到匹配的工具</p>
        </div>
      )}
    </div>
  );
}
