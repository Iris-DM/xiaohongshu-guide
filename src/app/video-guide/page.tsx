"use client";

import Image from "next/image";
import {
  Video,
  Lightbulb,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  User,
  Activity,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ImageItem {
  src: string | null;
  alt: string;
  caption: string;
  showButton?: boolean;
  showClickIcon?: boolean;
}

const steps: Array<{
  num: number;
  title: string;
  subtitle?: string;
  description: string;
  formula?: string;
  example?: string;
  tips?: string | string[];
  content?: string;
  warning?: string;
  subSteps?: string[];
  checklist?: string[];
  elements?: Array<{ icon: typeof User; label: string; desc: string }>;
  images: ImageItem[];
  problem?: { title: string; content: string };
  solution?: { title: string; content: string; steps: string[] };
  note?: string;
}> = [
  {
    num: 1,
    title: "构建图文指令",
    description: "融合多个维度形成高质量生成指令",
    formula: "【场景】 + 【主体/人物】 + 【风格】 + 【光线】 + 【背景】 + 【细节补充】",
    example:
      "室内咖啡厅场景，一位穿着米色针织衫的年轻女性坐在窗边，日系清新风格，柔和自然光从窗户洒入，背景是模糊的绿植和木质装饰，细腻的肤质，温暖舒适的氛围，45度侧面视角",
    tips: "融合项目背景形成图文指令和视频指令，突出主题",
    images: [
      {
        src: "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514161039214.png&nonce=db505456-2c21-4899-9682-6ae63a0c9975&project_id=7639575009161199679&sign=d5ae1e1f466583d812e6092333a6aab2726aa9d286a9d819415de974bd67c9cb",
        alt: "构建图文指令示例",
        caption: "构建图文指令示例",
      },
    ],
  },
  {
    num: 2,
    title: "使用新的图文指令生成图片",
    description: "将构建好的图文指令输入AI生成图片",
    content:
      "将第1步构建好的完整图文指令复制到豆包AI的图片生成功能中再融合更详细的背景，图片等等，等待AI生成更符合要求的图片。",
    checklist: [
      "确保指令完整包含所有要素",
      "等待图片生成完成后查看效果",
      "如不满意可调整指令重新生成",
    ],
    images: [
      {
        src: "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514162038297.png&nonce=52aa704f-2204-49d8-a408-3717088e3f5d&project_id=7639575009161199679&sign=9958c9a9ebe7c78786b4f4689b54fa12c3ef0c3b2aa8a254b4fe59350c974954",
        alt: "步骤示意图举例：143期纸箱创作大赛",
        caption: "步骤示意图举例：143期纸箱创作大赛",
      },
    ],
  },
  {
    num: 3,
    title: "预览图片并找到生成视频入口",
    description: "点开图片预览，找到生成视频按钮",
    content: "将生成后的图片点开预览，在左上角找到「生成视频」按钮。",
    warning: "注意：必须先点开图片预览，才能在左上角看到「生成视频」选项",
    subSteps: [
      "点击生成的图片进入预览模式",
      "在左上角找到「生成视频」按钮",
      "点击进入视频生成界面",
    ],
    images: [
      {
        src: null,
        alt: "左上角「生成视频」按钮位置",
        caption: "左上角「生成视频」按钮位置",
        showButton: true,
      },
      {
        src: "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage_20260514124131128.png&nonce=84e0c742-dea6-42b6-a231-c5240edc346d&project_id=7639575009161199679&sign=0f9dbce471cc81a0145db6187bf61deb3f60f68845f5723468f41920051d106d",
        alt: "图片预览界面",
        caption: "图片预览模式",
      },
      {
        src: null,
        alt: "点击进入视频生成",
        caption: "点击进入视频生成",
        showClickIcon: true,
      },
    ],
  },
  {
    num: 4,
    title: "去版权相关限制",
    subtitle: "可选步骤",
    description: "遇到版权限制时的解决方案",
    problem: {
      title: "问题描述",
      content:
        "在输入视频指令后，如果出现以下提示：\n\"抱歉，由于版权相关限制，暂时无法创作对应的内容，换其他主题试试吧。\"",
    },
    solution: {
      title: "解决方法",
      content:
        "让AI去掉敏感内容，重新生成新的指令。可以提示AI：\n\"请去掉指令中可能涉及版权或敏感的内容，重新生成一个安全的视频生成指令。\"",
      steps: [
        "复制原有的视频指令",
        "要求AI去除敏感元素（如特定品牌、人物、场景等）",
        "让AI重新生成新的指令",
        "用新指令重新生成视频",
      ],
    },
    note: "如果没有遇到版权限制问题，可直接跳过此步骤，正常生成视频。",
    images: [],
  },
  {
    num: 5,
    title: "输入视频指令",
    description: "根据人物、动作、环境构建视频指令",
    formula: "【人物】 + 【动作】 + 【环境】",
    example:
      "年轻女性轻轻端起咖啡杯，眼神温柔地看向窗外，手指在杯沿轻轻划过，身后的绿植在微风中轻轻摇曳，阳光在桌面上缓缓移动",
    elements: [
      { icon: User, label: "人物", desc: "主体角色描述" },
      { icon: Activity, label: "动作", desc: "行为与动态" },
      { icon: MapPin, label: "环境", desc: "场景与氛围" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&h=300&fit=crop",
        alt: "视频指令输入示意",
        caption: "在视频生成界面输入指令",
      },
    ],
  },
];

export default function VideoGuidePage() {
  return (
    <div className="min-h-screen">
      {/* 页面标题区 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Video className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">视频创作指南</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          用豆包AI生成视频的可跑指令，按以下步骤操作即可快速生成高质量视频内容
        </p>
      </div>

      {/* 步骤列表 */}
      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-card rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            <div className="flex items-start gap-6 p-6">
              {/* 步骤编号 */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                  <span className="text-2xl font-bold text-primary-foreground">{step.num}</span>
                </div>
              </div>

              {/* 步骤内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
                  {step.subtitle && (
                    <span className="text-xs px-2 py-0.5 bg-warning/20 text-warning rounded-full">
                      {step.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                {/* 公式 */}
                {step.formula && (
                  <div className="bg-muted rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      {step.num === 1 ? "指令公式：" : "视频指令要素："}
                    </p>
                    <div className="bg-card rounded-lg p-4 border border-border/20">
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {step.formula.split(" + ").map((part, idx, arr) => (
                          <span key={idx}>
                            <span className="text-primary">{part}</span>
                            {idx < arr.length - 1 && " + "}
                          </span>
                        ))}
                      </p>
                    </div>
                    {step.tips && (
                      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        {step.tips}
                      </p>
                    )}
                  </div>
                )}

                {/* 内容描述 */}
                {step.content && (
                  <div className="bg-muted rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.content}</p>
                  </div>
                )}

                {/* 示例指令 */}
                {step.example && (
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 mb-4">
                    <p className="text-xs font-medium text-primary mb-2">📝 示例指令</p>
                    <p className="text-sm text-foreground leading-relaxed">{step.example}</p>
                  </div>
                )}

                {/* 检查列表 */}
                {step.checklist && (
                  <div className="flex items-start gap-3 bg-success/10 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">操作要点</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {step.checklist.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 警告提示 */}
                {step.warning && (
                  <div className="bg-warning/10 rounded-lg p-3 flex items-start gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{step.warning}</p>
                  </div>
                )}

                {/* 子步骤 */}
                {step.subSteps && (
                  <div className="space-y-2">
                    {step.subSteps.map((subStep, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-muted rounded-lg p-3"
                      >
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-foreground">{subStep}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 要素说明 */}
                {step.elements && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {step.elements.map((elem) => {
                      const Icon = elem.icon;
                      return (
                        <div key={elem.label} className="bg-muted rounded-lg p-3 text-center">
                          <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                          <p className="text-xs font-medium text-foreground">{elem.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{elem.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 提示列表 */}
                {step.tips && Array.isArray(step.tips) && (
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium text-foreground">优化建议</p>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      {step.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 问题描述 */}
                {step.problem && (
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <p className="text-sm font-medium text-foreground">{step.problem.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                      {step.problem.content}
                    </p>
                  </div>
                )}

                {/* 解决方法 */}
                {step.solution && (
                  <div className="space-y-3 mb-4">
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <p className="text-sm font-medium text-foreground">{step.solution.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed mb-3">
                        {step.solution.content}
                      </p>
                      <div className="space-y-2">
                        {step.solution.steps.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-primary font-medium">{idx + 1}</span>
                            </div>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 注意提示 */}
                {step.note && (
                  <div className="bg-primary/10 rounded-lg p-3 flex items-start gap-2 border border-primary/20">
                    <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">{step.note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 示意图区域 */}
            {step.images && step.images.length > 0 && (
              <div className="border-t border-border/20 bg-muted/30 p-6">
                <p className="text-xs font-medium text-muted-foreground mb-4 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  步骤示意图举例：143期纸箱创作大赛
                </p>
                <div
                  className={`grid gap-4 ${step.images.length === 1 ? "grid-cols-1 max-w-md" : step.images.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}
                >
                  {step.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="bg-card rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                    >
                      {img.showButton ? (
                        <div className="h-32 bg-muted flex items-center justify-center relative">
                          <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            生成视频
                          </div>
                        </div>
                      ) : img.showClickIcon ? (
                        <div className="h-32 bg-muted flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[8px] border-l-muted-foreground/40 border-y-[5px] border-y-transparent ml-1" />
                          </div>
                        </div>
                      ) : img.src ? (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={600}
                          height={400}
                          className="w-full h-auto object-contain"
                        />
                      ) : null}
                      <div className="p-3">
                        <p className="text-xs text-muted-foreground">{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部小贴士 */}
      <div className="mt-12 bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">小贴士</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 视频生成需要一定时间，请耐心等待</li>
              <li>• 如视频效果不理想，可以调整指令重新生成</li>
              <li>• 建议先用图文指令生成满意的图片，再转为视频</li>
              <li>• 视频指令要简洁明了，突出关键动作</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
