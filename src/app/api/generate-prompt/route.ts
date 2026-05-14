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

  let userPrompt = "";

  if (type === "image") {
    userPrompt = `请根据以下主题，生成一个完整的AI图片生成指令。

主题：${topic}

请按照以下格式生成指令：
【场景】 + 【主体/人物】 + 【风格】 + 【光线】 + 【背景】 + 【细节补充（质感/氛围/视角/文字）】

要求：
1. 每个维度都要详细描述
2. 符合小红书视觉风格
3. 突出主题特色
4. 适合AI图片生成

请直接输出指令内容，不需要额外解释。`;
  } else {
    userPrompt = `请根据以下主题，生成一个完整的AI视频生成指令。

主题：${topic}

请按照以下格式生成指令：
- 图文指令：【场景】 + 【主体/人物】 + 【风格】 + 【光线】 + 【背景】 + 【细节补充】
- 视频指令：基于图片添加【人物动作】+【环境变化】+【镜头运动】

要求：
1. 图文指令用于生成静态图片
2. 视频指令在图片基础上添加动态元素
3. 符合小红书视频风格
4. 突出主题特色

请分别输出：
1. 图文指令：
2. 视频指令：`;
  }

  const messages = [
    {
      role: "system" as const,
      content: "你是一个AI创作指令专家，擅长根据主题生成精准的AI图片和视频生成指令。",
    },
    { role: "user" as const, content: userPrompt },
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const llmStream = client.stream(messages, {
          model: "doubao-seed-1-8-251228",
          temperature: 0.7,
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
