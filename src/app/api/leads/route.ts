import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as any;
  const search = searchParams.get('search') || undefined;

  const leads = repo.getLeads({ status, search });
  return NextResponse.json({ success: true, leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.fullName || !body.phone || !body.organization) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const newLead = repo.createLead(body);
    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
