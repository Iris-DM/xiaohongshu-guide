import { NextRequest } from "next/server";

// 检查是否在扣子沙箱环境
const isCozeSandbox = process.env.COZE_PROJECT_ENV !== undefined;

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "请输入图片描述" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 如果不在扣子沙箱环境，返回提示信息
  if (!isCozeSandbox) {
    return new Response(JSON.stringify({ 
      error: "AI功能需要扣子环境",
      message: "🤖 AI 图片生成功能仅在扣子开发环境中可用。\n\n您已成功部署网站！🎉\n\n如需使用 AI 生成功能，请访问扣子平台创建项目。"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 扣子环境中的实现
  try {
    const { ImageGenerationClient, Config, HeaderUtils } = await import("coze-coding-dev-sdk");
    
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new ImageGenerationClient(config, customHeaders);

    const response = await client.generate({
      model: "doubao-seedream-3-0-t2i-250415",
      prompt: prompt,
      size: "1024x1024",
    });

    const helper = client.getResponseHelper(response);

    if (helper.success) {
      return new Response(JSON.stringify({ 
        success: true, 
        images: helper.imageUrls 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "图片生成失败", details: helper.errorMessages }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: "图片生成失败" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
