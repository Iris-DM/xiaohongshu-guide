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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "全部" },
  { id: "content", label: "内容创作" },
  { id: "design", label: "设计工具" },
  { id: "video", label: "视频工具" },
];

const sensitiveWordTools = [
  {
    name: "句易网",
    url: "https://www.ju1.cn/",
    description: "专业违禁词查询平台",
  },
  {
    name: "零克查词",
    url: "http://www.lingkechaci.com/",
    description: "敏感词检测工具",
  },
  {
    name: "词爪",
    url: "https://www.cizhua.com/",
    description: "违禁词查询工具",
  },
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
    id: "image-search",
    name: "图片搜索推荐",
    category: "design",
    description: "堆糖、花瓣网精选高质量图片素材，灵感采集必备",
    icon: Search,
    iconColor: "success",
    tip: "推荐平台：堆糖、花瓣网",
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
    id: "canva",
    name: "Canva可画",
    category: "design",
    description: "在线设计平台，海量模板一键套用，轻松制作精美封面、配图",
    icon: Palette,
    iconColor: "primary",
    tip: "适合人群：设计新手、追求效率的创作者",
    suitable: "设计新手",
    url: "https://www.canva.cn/",
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [showSensitiveModal, setShowSensitiveModal] = useState(false);
  const [showXingtuModal, setShowXingtuModal] = useState(false);
  const [showImageSearchModal, setShowImageSearchModal] = useState(false);
  const [showGaodingModal, setShowGaodingModal] = useState(false);
  const [showCanvaModal, setShowCanvaModal] = useState(false);

  // 图片搜索工具数据
  const imageSearchTools = [
    {
      name: "堆糖",
      description: "发现、收集、分享美好图片的社区，海量优质图片素材",
      url: "https://www.duitang.com/",
    },
    {
      name: "花瓣网",
      description: "设计师寻找灵感的图片素材库，高质量设计作品采集",
      url: "https://huaban.com/",
    },
  ];

  const filteredTools = tools.filter((tool) => {
    return activeCategory === "all" || tool.category === activeCategory;
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

  const handleGuideClick = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    
    if (toolId === "xhs-sensitive") {
      setShowSensitiveModal(true);
    } else if (toolId === "xingtu") {
      setShowXingtuModal(true);
    } else if (toolId === "image-search") {
      setShowImageSearchModal(true);
    } else if (toolId === "gaoding") {
      setShowGaodingModal(true);
    } else if (toolId === "canva") {
      setShowCanvaModal(true);
    } else if (tool?.url) {
      window.open(tool.url, "_blank");
    }
  };

  return (
    <div className="min-h-screen">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">创作工具大全</h1>
        <p className="text-sm text-muted-foreground mt-2">精选实用工具，助力高效创作</p>
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
        <div className="space-y-8">
          {/* 其他工具 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.filter(tool => !["canva", "xingtu", "gaoding"].includes(tool.id)).map((tool) => {
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
                    <button
                      onClick={() => handleGuideClick(tool.id)}
                      className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      查看指南
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* 设计工具板块 */}
          {filteredTools.some(tool => ["canva", "xingtu", "gaoding"].includes(tool.id)) && (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-foreground mb-1">设计工具推荐</h2>
                <p className="text-sm text-muted-foreground">在线设计、修图工具，轻松制作精美内容</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.filter(tool => ["canva", "xingtu", "gaoding"].includes(tool.id)).map((tool) => {
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
                        <button
                          onClick={() => handleGuideClick(tool.id)}
                          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          查看指南
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">该分类暂无工具</p>
        </div>
      )}

      {/* 违禁词查询工具网址弹窗 */}
      {showSensitiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowSensitiveModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">小红书违禁词查询工具</h2>
              <p className="text-sm text-muted-foreground mt-1">选择合适的工具进行违禁词检测</p>
            </div>

            <div className="space-y-3">
              {sensitiveWordTools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors group"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{tool.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/20">
              <p className="text-xs text-muted-foreground text-center">
                建议使用多个工具交叉检测，确保内容安全
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 醒图使用指南弹窗 */}
      {showXingtuModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowXingtuModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">醒图使用指南</h2>
              <p className="text-sm text-muted-foreground mt-1">专业的手机修图工具</p>
            </div>

            <div className="mb-6">
              <img
                src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514170209344.png&nonce=50989ab6-bf0c-4d1a-8148-7310b3e20368&project_id=7639575009161199679&sign=c4fcb32d54996186e135a5279881a5f09a20abf3200f36e4620f53b3f4cf974e"
                alt="醒图使用界面"
                className="w-full h-auto rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">主要功能</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>丰富的滤镜和特效：提供多种风格的滤镜，轻松打造不同氛围</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>智能美颜：自动识别人脸，提供自然的美颜效果</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>拼图功能：支持多种拼图模板，适合制作小红书封面</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>文字贴纸：丰富的文字样式和贴纸素材</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">使用技巧</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>先调整整体色调，再处理细节效果更好</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>使用局部调整功能，可以精准优化特定区域</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>保存常用的调色参数，提高修图效率</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 图片搜索工具模态框 */}
      {showImageSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowImageSearchModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">图片搜索推荐</h2>
              <p className="text-sm text-muted-foreground mt-1">优质图片素材搜索平台</p>
            </div>

            <div className="space-y-4">
              {imageSearchTools.map((tool, index) => (
                <div
                  key={index}
                  className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{tool.name}</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    访问网站
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                💡 建议多个平台配合使用，找到更多优质素材
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 稿定设计使用指南模态框 */}
      {showGaodingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGaodingModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">稿定设计使用指南</h2>
              <p className="text-sm text-muted-foreground mt-1">多场景在线设计工具，小红书模板丰富</p>
            </div>

            <div className="mb-6">
              <img
                src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514172417921.png&nonce=0a926c6a-c205-449c-b948-14178eea649b&project_id=7639575009161199679&sign=fa39a05f6b52303616201eb691b6973c245e9d85d236ac76b3585810dcdcfab9"
                alt="稿定设计界面"
                className="w-full h-auto rounded-xl border border-border object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">主要功能</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>小红书封面模板：海量小红书专属模板，尺寸完美适配</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>一键套用：选择模板后可快速替换图片、文字，提高制作效率</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>多场景设计：支持海报、小红书封面、朋友圈配图等多种尺寸</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>团队协作：支持多人协作编辑，适合团队运营使用</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">使用技巧</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>搜索"小红书封面"可快速找到合适模板</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>保存常用模板，下次可快速复用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>配合品牌色库，保持笔记视觉统一</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <a
                href="https://www.gaoding.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                访问稿定设计官网
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Canva使用指南模态框 */}
      {showCanvaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCanvaModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">Canva可画使用指南</h2>
              <p className="text-sm text-muted-foreground mt-1">在线设计平台，海量模板一键套用</p>
            </div>

            <div className="mb-6">
              <img
                src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514173158354.png&nonce=d9c5d6c1-e104-47ec-8ce2-48311b1c1e69&project_id=7639575009161199679&sign=88d8686ed4019833ffe7c3c4e7da850107717b41ba932af2b34fcc2d0cbc6394"
                alt="Canva界面"
                className="w-full h-auto rounded-xl border border-border object-contain"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">主要功能</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>海量设计模板：涵盖社交媒体、海报、名片等多种场景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>拖拽式编辑：无需设计基础，轻松上手</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>素材丰富：提供图片、图标、字体等多种设计元素</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>团队协作：支持多人在线协作编辑</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">使用技巧</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>搜索"小红书封面"快速找到适配模板</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>使用品牌工具包保持设计风格统一</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>保存常用模板，提高创作效率</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <a
                href="https://www.canva.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                访问Canva官网
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
