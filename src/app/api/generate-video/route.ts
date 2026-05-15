import { NextRequest } from "next/server";

// 检查是否在扣子沙箱环境
const isCozeSandbox = process.env.COZE_PROJECT_ENV !== undefined;

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "请输入视频描述" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 如果不在扣子沙箱环境，返回提示信息
  if (!isCozeSandbox) {
    return new Response(JSON.stringify({ 
      error: "AI功能需要扣子环境",
      message: "🤖 AI 视频生成功能仅在扣子开发环境中可用。\n\n您已成功部署网站！🎉\n\n如需使用 AI 生成功能，请访问扣子平台创建项目。"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 扣子环境中的实现
  try {
    const { VideoGenerationClient, Config, HeaderUtils } = await import("coze-coding-dev-sdk");
    
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new VideoGenerationClient(config, customHeaders);

    const result = await client.generate({
      model: "doubao-seedance-1-0-t2v-250514",
      prompt: prompt,
      audio: {
        enableAudioGeneration: true,
        enableBackgroundMusic: true,
        enableSoundEffects: true,
      },
      aspectRatio: "9:16",
      resolution: "720p",
    });

    return new Response(JSON.stringify({ 
      success: true, 
      video: result.video 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "视频生成失败" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
