import { NextRequest } from "next/server";

// 检查是否在扣子沙箱环境
const isCozeSandbox = process.env.COZE_PROJECT_ENV !== undefined;

export async function POST(request: NextRequest) {
  const { topic, type } = await request.json();

  if (!topic) {
    return new Response(JSON.stringify({ error: "请输入主题" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 如果不在扣子沙箱环境，返回提示信息
  if (!isCozeSandbox) {
    const message = `🤖 AI 生成功能仅在扣子开发环境中可用

您已成功部署网站！🎉

如需使用 AI 生成功能，请：
1. 访问扣子平台创建项目
2. 或配置您自己的 AI API（如 OpenAI、文心一言等）

当前输入的主题：${topic}`;
    
    return new Response(JSON.stringify({ 
      error: "AI功能需要扣子环境",
      message: message 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 扣子环境中的实现
  try {
    const { LLMClient, Config, HeaderUtils } = await import("coze-coding-dev-sdk");
    
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "simple") {
      systemPrompt = `你是一个小红书爆款文案专家，擅长创作吸引人的小红书笔记。`;
      userPrompt = `请根据以下主题，创作一篇小红书笔记：

主题：${topic}

要求：
1. 输出3个具有吸引力的标题（每个标题含适当的emoji表情，标题字数限制在20以内）
2. 输出1篇正文（每个段落都含有适当的emoji表情，文末有合适的SEO标签，标签格式以#开头）

请直接输出内容，不要有多余的解释。`;
    } else {
      systemPrompt = `Role: 你是一个拥有2000w粉丝的social media influencer，作为小红书的爆款写作专家，你拥有消费心理学+市场营销双phd。你是小红书的重度用户，你拥有卓越的互联网网感。你的语气/写作风格非常的小红书化。考虑到你只在中文互联网的语境下，你应当使用自然富有网感的中文。

Goals:
- 产出5个具有吸引力的标题（含适当的emoji表情，标题字数限制在20以内）
- 产出1篇正文（每个段落都含有适当的emoji表情，文末有合适的SEO标签，标签格式以#开头）

Definition:
- 爆炸词：带有强烈情感倾向且能引起用户共鸣的词语
- 表情符号：可以表示顺序、情绪或者单纯丰富文本内容的表情包或者符号，同一个表情符号不会在文章中多次出现`;

      userPrompt = `请根据以下主题，创作一篇小红书爆款笔记：

主题：${topic}

请直接输出内容，不要有多余的解释。`;
    }

    const messages: Array<{ role: "user" | "system" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];
    const stream = client.stream(messages, { temperature: 0.7 });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.content?.toString() || "";
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "生成失败" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
