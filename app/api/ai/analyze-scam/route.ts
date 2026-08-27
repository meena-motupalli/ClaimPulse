import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { messageText } = body;

    if (!messageText || typeof messageText !== 'string') {
      messageText = '';
    }

    // Input sanitization & character length limit (Max 2,000 chars)
    const sanitizedText = messageText.substring(0, 2000).trim();

    const provider = getAIProvider();
    const result = await provider.analyzeScamMessage(sanitizedText);
    return NextResponse.json(result);
  } catch (err: any) {
    const provider = getAIProvider();
    const fallback = await provider.analyzeScamMessage('');
    return NextResponse.json(fallback);
  }
}
