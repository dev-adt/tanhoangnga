import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, note, actorName } = body;

    const updated = repo.updateLeadStatus(id, status, note, actorName || 'Admin User');
    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
