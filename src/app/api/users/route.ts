import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET() {
  const users = repo.getUsers();
  return NextResponse.json({ success: true, users });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = repo.createUser(body, 'Super Admin');
    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const updated = repo.updateUser(id, data, 'Super Admin');
    return NextResponse.json({ success: true, user: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
