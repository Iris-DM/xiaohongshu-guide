"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Terminal,
  Copy,
  Check,
  ImagePlus,
  Plus,
  MapPin,
  User,
  Palette,
  Sun,
  Mountain,
  Sparkles,
  Lightbulb,
  Star,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const tags = [
  { id: "all", label: "全部" },
  { id: "text", label: "文案生成" },
  { id: "image", label: "图片生成" },
  { id: "prompt", label: "指令模板" },
];

const dimensions = [
  { icon: MapPin, label: "场景", desc: "室内/户外/特定环境", color: "primary" },
  { icon: User, label: "主体/人物", desc: "人物特征/产品/物品", color: "success" },
  { icon: Palette, label: "风格", desc: "简约/复古/时尚等", color: "warning" },
  { icon: Sun, label: "光线", desc: "自然光/暖光/冷光", color: "destructive" },
  { icon: Mountain, label: "背景", desc: "纯色/渐变/实景", color: "primary" },
  { icon: Sparkles, label: "细节补充", desc: "质感/氛围/视角/文字", color: "success" },
];

const cases = [
  {
    title: "美妆护肤笔记",
    category: "美妆",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    description: "场景：梳妆台前 | 主体：护肤产品 | 风格：清新自然",
  },
  {
    title: "美食探店笔记",
    category: "美食",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    description: "场景：餐厅内 | 主体：美食特写 | 风格：温馨诱人",
  },
  {
    title: "穿搭分享笔记",
    category: "时尚",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
    description: "场景：街拍场景 | 主体：整套穿搭 | 风格：潮流时尚",
  },
];

export default function ImageGuidePage() {
  const [activeTag, setActiveTag] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // 在线生成文案状态
  const [textTopic, setTextTopic] = useState("");
  const [textType, setTextType] = useState<"simple" | "advanced">("simple");
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  // 在线生成图片状态
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 生成文案函数
  const handleGenerateText = async () => {
    if (!textTopic.trim()) return;

    setIsGeneratingText(true);
    setGeneratedText("");

    try {
      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: textTopic, type: textType }),
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error("无法读取响应流");

      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                result += parsed.content;
                setGeneratedText(result);
              }
              if (parsed.error) {
                console.error("Error:", parsed.error);
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGeneratingText(false);
    }
  };

  // 生成图片函数
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    setIsGeneratingImage(true);
    setGeneratedImages([]);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      const data = await response.json();

      if (data.success && data.imageUrls) {
        setGeneratedImages(data.imageUrls);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const textPrompt = `提炼每期BF需求总结核心要点，梳理内容框架，延展笔记内容，分三段输出正文：

1️⃣ 【噱头/思考点】 - 开篇吸引眼球，抛出问题或观点
2️⃣ 【核心价值】 - 干货内容，提供实用价值或解决方案
3️⃣ 【互动】 - 引导评论互动，增加笔记活跃度

贴合小红书平台算法与热门流量逻辑，埋下SEO标签`;

  const advancedTextPrompt = `Role:
- 你是一个拥有2000w粉丝的social media influencer，作为小红书的爆款写作专家，你拥有消费心理学+市场营销双phd。
- 你是小红书的重度用户，你拥有卓越的互联网网感。你的语气/写作风格非常的小红书化
- 考虑到你只在中文互联网的语境下，你应当使用自然富有网感的中文。你的目标是为用户，遵循以下步骤进行创作小红书笔记。

Background:
- 我希望能够在小红书上发布一些文章，能够吸引大家的关注，拥有更多流量。但是我自己并不擅长小红书内容创作，你需要根据我给定的主题和我的需求，设计出爆款文案。

Goals:
- 产出5个具有吸引力的标题（含适当的emoji表情，标题字数限制在20以内）
- 产出1篇正文（每个段落都含有适当的emoji表情，文末有合适的SEO标签，标签格式以#开头）

Definition:
- 爆炸词：带有强烈情感倾向且能引起用户共鸣的词语。
- 表情符号：可以表示顺序、情绪或者单纯丰富文本内容的表情包或者符号，同一个表情符号不会在文章中多次出现。

背景示例：
集团美术馆项目计划于27年底落地，在美术馆落成之前会策划一系列活动为美术馆造势。本次活动用线上+线下的方式，以"纸箱"为载体，吸引创作者参与到艺术创作中。线上分为京东侧（AI影视圈）+小红书两个部分，双方共同发起线上话题"赛博纸箱"，吸引更多创意投稿。以纸箱为灵感元素，用AI视频的形式呈现多种想象；创作者可以用AI呈现创作思路或成品的制作过程，可以用AI生成纸箱潜艇、小镇、迷宫、戏台、艺术品，也可以用AI生成不同视觉差下的纸箱形态。`;

  const imagePromptFormula = "【场景】 + 【主体/人物】 + 【风格】 + 【光线】 + 【背景】 + 【细节补充】";

  const imagePromptExample = "场景：午后阳光明媚的咖啡馆窗边\n主体：一位年轻女性，气质优雅，穿着简约米色毛衣\n风格：韩系清新，自然柔美\n光线：侧光照射，面部轮廓柔和\n背景：窗外绿植若隐若现，虚化处理\n细节补充：手持咖啡杯，氛围温暖治愈，45度仰拍视角";

  return (
    <div className="min-h-screen">
      {/* 页面标题 */}
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">图文创作指南</h1>
          <p className="text-sm text-muted-foreground mt-1">
            掌握 AI 辅助创作技巧，高效产出优质图文内容
          </p>
        </div>

        {/* 快捷标签 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTag === tag.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground bg-muted hover:bg-muted/80"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* 在线生成文案 */}
      <section className="mb-12">
        <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">在线生成文案</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  输入主题，AI自动生成小红书爆款文案
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {/* 输入区域 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  输入主题
                </label>
                <textarea
                  value={textTopic}
                  onChange={(e) => setTextTopic(e.target.value)}
                  placeholder="例如：咖啡厅探店、护肤心得、穿搭分享..."
                  className="w-full px-4 py-3 bg-muted border-none rounded-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  rows={3}
                />
              </div>

              {/* 模式选择 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">生成模式：</span>
                <button
                  onClick={() => setTextType("simple")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    textType === "simple"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  通用指令
                </button>
                <button
                  onClick={() => setTextType("advanced")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    textType === "advanced"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  进阶指令
                </button>
              </div>

              {/* 生成按钮 */}
              <button
                onClick={handleGenerateText}
                disabled={isGeneratingText || !textTopic.trim()}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingText ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    开始生成
                  </>
                )}
              </button>

              {/* 生成结果 */}
              {generatedText && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-foreground">生成结果</h3>
                    <button
                      onClick={() => handleCopy(generatedText, "generated-text")}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                    >
                      {copiedId === "generated-text" ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>已复制</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>复制</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-muted rounded-lg p-4 whitespace-pre-wrap text-sm text-foreground">
                    {generatedText}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 在线生成图片 */}
      <section className="mb-12">
        <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="bg-gradient-to-r from-success/10 to-success/5 px-6 py-5 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <ImagePlus className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">在线生成图片</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  输入描述，AI自动生成高质量图片
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {/* 输入区域 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  图片描述
                </label>
                <textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="例如：温馨的咖啡厅场景，木质桌椅，暖黄色灯光，窗外阳光透入..."
                  className="w-full px-4 py-3 bg-muted border-none rounded-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-success/30 transition-all resize-none"
                  rows={4}
                />
              </div>

              {/* 生成按钮 */}
              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage || !imagePrompt.trim()}
                className="w-full px-6 py-3 bg-success text-white rounded-lg font-medium hover:bg-success/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGeneratingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    生成中...（约需10-30秒）
                  </>
                ) : (
                  <>
                    <ImagePlus className="w-4 h-4" />
                    开始生成图片
                  </>
                )}
              </button>

              {/* 生成结果 */}
              {generatedImages.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-foreground mb-3">生成结果</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedImages.map((url, index) => (
                      <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={url}
                          alt={`生成的图片 ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-2 right-2 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg text-xs text-foreground hover:bg-card transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          查看大图
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 模块一：文心一言/deepseek 辅助生成文案 */}
      <section id="section-text" className="mb-12">
        <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* 模块头部 */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  用文心一言 / DeepSeek 辅助生成文案和标题
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  智能生成贴合小红书平台的高质量文案
                </p>
              </div>
            </div>
          </div>

          {/* 工具跳转链接 */}
          <div className="px-6 py-4 bg-muted/30 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">快速访问：</span>
              <a
                href="https://yiyan.baidu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                文心一言
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.deepseek.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                DeepSeek
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 示意图区域 */}
          <div className="p-6 border-b border-border/20">
            <div className="flex items-center gap-2 mb-4">
              <ImagePlus className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">操作示意图</span>
            </div>
            <div className="bg-muted rounded-lg p-4 overflow-hidden max-w-[50%] mx-auto">
              <Image
                src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514121804767.png&nonce=90abf9e2-df56-4a0d-b368-0207679e7565&project_id=7639575009161199679&sign=627cd044c529257e93a2bbf07c41533c23ed2d6aa91bb1ef4a6e33b74be0d48f"
                alt="AI文案生成界面示意图，展示输入需求和生成文案的过程"
                width={800}
                height={400}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              在文心一言或 DeepSeek 中输入指令，AI 会自动生成符合小红书风格的文案
            </p>
          </div>

          {/* 通用指令内容 */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">通用指令模板</span>
              <span className="px-2 py-0.5 text-xs font-medium text-success bg-success/15 rounded-sm">
                推荐
              </span>
            </div>

            {/* 指令代码块 */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border/20">
                <span className="text-xs font-medium text-muted-foreground">Prompt 指令</span>
                <button
                  onClick={() => handleCopy(textPrompt, "text-prompt")}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  {copiedId === "text-prompt" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {textPrompt}
              </div>
            </div>

            {/* 指令要点说明 */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  num: "1",
                  title: "提炼核心要点",
                  desc: "从 BF 需求中提取关键信息，明确内容主题和目标受众",
                },
                {
                  num: "2",
                  title: "三段式输出",
                  desc: "噱头吸引 + 核心价值 + 互动引导，结构清晰",
                },
                {
                  num: "3",
                  title: "SEO优化",
                  desc: "贴合平台算法，埋入热门关键词和流量标签",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-card rounded-lg p-4 border border-border/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{item.num}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 第二个 Prompt 指令模板 */}
          <div className="p-6 border-t border-border/20">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">进阶指令模板</span>
              <span className="px-2 py-0.5 text-xs font-medium text-warning bg-warning/15 rounded-sm">
                专业版
              </span>
            </div>

            {/* 指令代码块 */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border/20">
                <span className="text-xs font-medium text-muted-foreground">Prompt 指令</span>
                <button
                  onClick={() => handleCopy(advancedTextPrompt, "advanced-text-prompt")}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  {copiedId === "advanced-text-prompt" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                {advancedTextPrompt}
              </div>
            </div>

            {/* 使用说明 */}
            <div className="mt-5 bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">使用说明：</p>
                  <ul className="space-y-1">
                    <li>• 将上述指令完整复制到文心一言或 DeepSeek</li>
                    <li>• 根据实际项目需求修改 Background 部分的背景信息</li>
                    <li>• AI 会生成 5 个爆款标题 + 1 篇完整正文</li>
                    <li>• 可多次生成，选择最满意的结果使用</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 模块二：豆包AI生成图片 */}
      <section id="section-image" className="mb-12">
        <div className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* 模块头部 */}
          <div className="bg-gradient-to-r from-success/10 to-success/5 px-6 py-5 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <ImagePlus className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">用豆包 AI 生成图片</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  两步生成高质量配图，提升笔记视觉吸引力
                </p>
              </div>
            </div>
          </div>

          {/* 工具跳转链接 */}
          <div className="px-6 py-4 bg-muted/30 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">快速访问：</span>
              <a
                href="https://www.doubao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-success bg-success/10 rounded-lg hover:bg-success/20 transition-colors"
              >
                豆包
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 第一步 */}
          <div className="p-6 border-b border-border/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                <span className="text-sm font-bold text-warning">1</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">构建完整指令</h3>
                <p className="text-xs text-muted-foreground">融合多个维度形成高质量生成指令</p>
              </div>
            </div>

            {/* 示意图 */}
            <div className="bg-muted rounded-lg p-4 mb-5 overflow-hidden max-w-[50%] mx-auto">
              <Image
                src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514121935560.png&nonce=f0003578-7cb0-43a3-acc1-5155e41dfcac&project_id=7639575009161199679&sign=403e9d59bd00730e567cfec22006569119844feb3082bbe372b0a9013bb297c6"
                alt="AI图片生成指令构建示意图，展示各维度参数组合"
                width={800}
                height={400}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {/* 指令公式 */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border/20">
                <span className="text-xs font-medium text-muted-foreground">指令公式</span>
                <button
                  onClick={() => handleCopy(imagePromptFormula, "formula")}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  {copiedId === "formula" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {["场景", "主体/人物", "风格", "光线", "背景", "细节补充"].map((item, idx) => (
                    <span key={idx}>
                      <span
                        className={`px-3 py-1.5 rounded-lg font-medium ${
                          idx % 3 === 0
                            ? "bg-primary/15 text-primary"
                            : idx % 3 === 1
                              ? "bg-success/15 text-success"
                              : "bg-warning/15 text-warning"
                        }`}
                      >
                        {item}
                      </span>
                      {idx < 5 && <Plus className="inline w-4 h-4 text-muted-foreground mx-1" />}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  细节补充包括：质感 / 氛围 / 视角 / 文字等
                </p>
              </div>
            </div>

            {/* 各维度说明 */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
              {dimensions.map((dim) => {
                const Icon = dim.icon;
                const colorClass =
                  dim.color === "primary"
                    ? "text-primary"
                    : dim.color === "success"
                      ? "text-success"
                      : dim.color === "warning"
                        ? "text-warning"
                        : "text-destructive";
                return (
                  <div key={dim.label} className="bg-card rounded-lg p-3 border border-border/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${colorClass}`} />
                      <span className="text-xs font-medium text-foreground">{dim.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{dim.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 第二步 */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                <span className="text-sm font-bold text-success">2</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">使用完整指令生成图片</h3>
                <p className="text-xs text-muted-foreground">在豆包 AI 中输入指令，一键生成配图</p>
              </div>
            </div>

            {/* 完整指令示例 */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border/20">
                <span className="text-xs font-medium text-muted-foreground">完整指令示例</span>
                <button
                  onClick={() => handleCopy(imagePromptExample, "example")}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                >
                  {copiedId === "example" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {imagePromptExample}
              </div>
            </div>

            {/* 提示信息 */}
            <div className="mt-4 flex items-start gap-2 bg-primary/5 rounded-lg p-3">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                提示：可根据实际需求调整各维度描述，多尝试不同组合获得最佳效果
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 实战案例参考 */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">实战案例参考</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <article
              key={caseItem.title}
              className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded">
                    {caseItem.category}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{caseItem.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{caseItem.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
