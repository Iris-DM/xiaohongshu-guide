import { NextRequest } from "next/server";
import { LLMClient, Config, HeaderUtils } from "coze-coding-dev-sdk";

export async function POST(request: NextRequest) {
  const { topic, type } = await request.json();

  if (!topic) {
    return new Response(JSON.stringify({ error: "请输入主题" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

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

正文结构：
- 【噱头/思考点】开篇吸引眼球，抛出问题或观点
- 【核心价值】干货内容，提供实用价值或解决方案
- 【互动】引导评论互动，增加笔记活跃度

贴合小红书平台算法与热门流量逻辑。`;
  } else {
    systemPrompt = `你是一个拥有2000w粉丝的social media influencer，作为小红书的爆款写作专家，你拥有消费心理学+市场营销双phd。
你是小红书的重度用户，你拥有卓越的互联网网感。你的语气/写作风格非常的小红书化。
考虑到你只在中文互联网的语境下，你应当使用自然富有网感的中文。`;

    userPrompt = `我希望能够在小红书上发布一些文章，能够吸引大家的关注，拥有更多流量。请根据以下主题设计出爆款文案。

主题：${topic}

要求：
- 产出5个具有吸引力的标题（含适当的emoji表情，标题字数限制在20以内）
- 产出1篇正文（每个段落都含有适当的emoji表情，文末有合适的SEO标签，标签格式以#开头）

定义：
- 爆炸词：带有强烈情感倾向且能引起用户共鸣的词语。
- 表情符号：可以表示顺序、情绪或者单纯丰富文本内容的表情包或者符号，同一个表情符号不会在文章中多次出现。`;
  }

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userPrompt },
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const llmStream = client.stream(messages, {
          model: "doubao-seed-1-8-251228",
          temperature: 0.8,
        });

        for await (const chunk of llmStream) {
          if (chunk.content) {
            const text = chunk.content.toString();
            const data = `data: ${JSON.stringify({ content: text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        const errorMessage = error instanceof Error ? error.message : "生成失败";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
