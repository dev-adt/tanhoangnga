import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET() {
  const settings = repo.getSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = repo.updateSettings(body, 'Admin User');
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
