import { NextRequest, NextResponse } from 'next/server';
import { VideoGenerationClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      duration = 5,
      ratio = '9:16',
      resolution = '720p',
    } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: '请输入视频描述' }, { status: 400 });
    }

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new VideoGenerationClient(config, customHeaders);

    const content = [{ type: 'text' as const, text: prompt }];

    const response = await client.videoGeneration(content, {
      model: 'doubao-seedance-1-5-pro-251215',
      duration,
      ratio,
      resolution,
      watermark: false,
      generateAudio: true,
    });

    if (response.videoUrl) {
      return NextResponse.json({
        success: true,
        videoUrl: response.videoUrl,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.response.error_message || '视频生成失败',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('视频生成错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '视频生成失败',
      },
      { status: 500 }
    );
  }
}
