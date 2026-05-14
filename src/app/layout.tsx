import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: {
    default: '小红书创作指南 | AI 辅助创作学习平台',
    template: '%s | 小红书创作指南',
  },
  description:
    '从零开始学习小红书内容创作，掌握图文、视频创作技巧，融合AI工具提升创作效率，成为优质创作者',
  keywords: [
    '小红书创作',
    '小红书运营',
    'AI创作',
    '图文笔记',
    '视频创作',
    '内容创作',
    '创作者指南',
    '豆包AI',
    '文心一言',
    'DeepSeek',
  ],
  authors: [{ name: '小红书创作指南' }],
  generator: 'Coze Code',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className="antialiased bg-background text-foreground">
        {isDev && <Inspector />}
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
