import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { rejectionText } = body;

    if (!rejectionText || typeof rejectionText !== 'string') {
      rejectionText = '';
    }

    const sanitizedText = rejectionText.substring(0, 1000).trim();

    const provider = getAIProvider();
    const result = await provider.explainRejection(sanitizedText);
    return NextResponse.json(result);
  } catch (err: any) {
    const provider = getAIProvider();
    const fallback = await provider.explainRejection('');
    return NextResponse.json(fallback);
  }
}
