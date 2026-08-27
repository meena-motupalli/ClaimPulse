import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messageText } = body;
    const provider = getAIProvider();
    const result = await provider.analyzeScamMessage(messageText || '');
    return NextResponse.json(result);
  } catch (err: any) {
    const provider = getAIProvider();
    const fallback = await provider.analyzeScamMessage('');
    return NextResponse.json(fallback);
  }
}
