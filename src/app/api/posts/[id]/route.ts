import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = repo.getPostById(id);
  if (!post) {
    return NextResponse.json({ success: false, error: 'Không tìm thấy bài viết' }, { status: 404 });
  }
  return NextResponse.json({ success: true, post });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = repo.updatePost(id, body, 'Admin User');
    return NextResponse.json({ success: true, post: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = repo.deletePost(id, 'Admin User');
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
