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

当前输入的主题：${topic}
选择的类型：${type === "image" ? "图片指令" : "视频指令"}`;
    
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

    let userPrompt = "";

    if (type === "image") {
      userPrompt = `请根据以下主题，生成一个完整的AI图片生成指令。

主题：${topic}

请按照以下格式生成指令：
【场景】 + 【主体/人物】 + 【风格】 + 【光线】 + 【背景】 + 【细节补充（质感/氛围/视角/文字）】

要求：
1. 每个维度都要详细描述
2. 符合小红书视觉风格
3. 指令要完整，可以直接使用

请直接输出指令内容。`;
    } else {
      userPrompt = `请根据以下主题，生成一个完整的AI视频生成指令。

主题：${topic}

请按照以下格式生成指令：
【场景】 + 【主体/人物】 + 【动作/运动】 + 【风格】 + 【光线】 + 【背景】 + 【细节补充（质感/氛围/视角/镜头运动）】

要求：
1. 每个维度都要详细描述
2. 符合小红书视频风格
3. 包含动态元素和镜头描述
4. 指令要完整，可以直接使用

请直接输出指令内容。`;
    }

    const messages = [{ role: "user", content: userPrompt }];
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
