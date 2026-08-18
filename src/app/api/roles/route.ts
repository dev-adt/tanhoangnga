import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET() {
  const roles = repo.getRoles();
  const permissions = repo.getPermissions();
  return NextResponse.json({ success: true, roles, permissions });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { roleId, permissions } = body;
    if (!roleId || !permissions) {
      return NextResponse.json({ success: false, error: 'Thiếu roleId hoặc permissions' }, { status: 400 });
    }

    const updatedRole = repo.updateRolePermissions(roleId, permissions, 'Super Admin');
    return NextResponse.json({ success: true, role: updatedRole });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
