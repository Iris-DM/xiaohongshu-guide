"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lightbulb, ChevronRight, Image as ImageIcon, Video, Wrench } from "lucide-react";

const modules = [
  {
    title: "图文创作",
    description: "学习如何制作吸睛的小红书图文笔记，包括标题撰写、封面设计、正文排版等核心技巧",
    href: "/image-guide",
    icon: ImageIcon,
    image: "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage.png&nonce=1b85851d-7bcf-4f56-8113-e5feaff546eb&project_id=7639575009161199679&sign=2b5bb197b95d30c97c9b4b76ffc4a73508a799d4a25cbdce90749ecbc2404f90",
    imageAlt: "图文创作示意图，展示手机屏幕上的精美图文笔记",
  },
  {
    title: "视频创作",
    description: "掌握小红书视频内容创作全流程，从拍摄技巧到剪辑后期，打造高质量视频笔记",
    href: "/video-guide",
    icon: Video,
    image: "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage.png&nonce=1b85851d-7bcf-4f56-8113-e5feaff546eb&project_id=7639575009161199679&sign=2b5bb197b95d30c97c9b4b76ffc4a73508a799d4a25cbdce90749ecbc2404f90",
    imageAlt: "视频创作示意图，展示视频剪辑界面和拍摄设备",
  },
  {
    title: "创作工具",
    description: "精选小红书创作者必备工具，包括修图、剪辑、排版等实用工具推荐和使用教程",
    href: "/tools",
    icon: Wrench,
    image: "https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage.png&nonce=1b85851d-7bcf-4f56-8113-e5feaff546eb&project_id=7639575009161199679&sign=2b5bb197b95d30c97c9b4b76ffc4a73508a799d4a25cbdce90749ecbc2404f90",
    imageAlt: "创作工具示意图，展示各种创作工具和软件界面",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">小红书创作指南</h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          从零开始学习小红书内容创作，掌握图文、视频创作技巧，成为优质创作者
        </p>
      </section>

      {/* 功能模块卡片 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">核心功能模块</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.href}
                className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-shadow group"
              >
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <Image
                    src={module.image}
                    alt={module.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {module.description}
                  </p>
                  <Link
                    href={module.href}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    <span>立即学习</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 快速入门指引 */}
      <section className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-2">新手入门指引</h3>
            <p className="text-sm text-muted-foreground mb-4">
              如果你是小红书创作新手，建议按以下顺序学习，快速掌握核心技能
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                  1
                </span>
                <span>图文基础</span>
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                  2
                </span>
                <span>视频入门</span>
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                  3
                </span>
                <span>工具进阶</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
