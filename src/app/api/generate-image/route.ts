import { NextRequest, NextResponse } from 'next/server';
import { ImageGenerationClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = '2K' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: '请输入图片描述' }, { status: 400 });
    }

    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const config = new Config();
    const client = new ImageGenerationClient(config, customHeaders);

    const response = await client.generate({
      prompt,
      size,
      watermark: false,
    });

    const helper = client.getResponseHelper(response);

    if (helper.success) {
      return NextResponse.json({
        success: true,
        imageUrls: helper.imageUrls,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: helper.errorMessages.join('; '),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('图片生成错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '图片生成失败',
      },
      { status: 500 }
    );
  }
}
