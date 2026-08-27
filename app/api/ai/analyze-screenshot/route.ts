import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { base64Image } = body;

    if (!base64Image || typeof base64Image !== 'string') {
      return NextResponse.json({
        claimType: 'Form 19',
        status: 'Claim Submitted',
        submissionDate: '2026-08-12',
        explanation: 'Invalid image request payload provided.',
        confidence: 'Low',
      });
    }

    // Security Check: Size Limit (Max 5MB in base64 string ~ 7MB string length)
    if (base64Image.length > 7 * 1024 * 1024) {
      return NextResponse.json({
        claimType: 'Form 19',
        status: 'Claim Submitted',
        submissionDate: '2026-08-12',
        explanation: 'File size exceeds maximum 5MB security limit.',
        confidence: 'Low',
      });
    }

    // Security Check: MIME Type validation (Allow PNG, JPEG, WEBP only; reject SVG, HTML, JS, EXE, ZIP)
    const lowerHeader = base64Image.substring(0, 100).toLowerCase();
    const isAllowedImage =
      lowerHeader.includes('data:image/png') ||
      lowerHeader.includes('data:image/jpeg') ||
      lowerHeader.includes('data:image/jpg') ||
      lowerHeader.includes('data:image/webp') ||
      lowerHeader.startsWith('iVBORw0KGgo') || // PNG Magic Header
      lowerHeader.startsWith('/9j/'); // JPEG Magic Header

    if (!isAllowedImage) {
      return NextResponse.json({
        claimType: 'Form 19',
        status: 'Claim Submitted',
        submissionDate: '2026-08-12',
        explanation: 'Unsupported file type. Only PNG, JPEG, and WebP images are permitted.',
        confidence: 'Low',
      });
    }

    const provider = getAIProvider();
    const result = await provider.extractClaimScreenshot(base64Image);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({
      claimType: 'Form 19',
      status: 'Claim Submitted',
      submissionDate: '2026-08-12',
      explanation: 'AI assistance is temporarily unavailable. ClaimPulse\'s basic rule-based diagnosis is still active.',
      confidence: 'Low',
    });
  }
}
