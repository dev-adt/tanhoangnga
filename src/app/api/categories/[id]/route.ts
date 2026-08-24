import { NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, actorName, ...data } = body;

    if (action === 'toggle-hidden') {
      const updated = repo.toggleCategoryHidden(id, actorName || 'Super Admin');
      return NextResponse.json({ success: true, data: updated });
    }

    const updated = repo.updateCategory(id, data, actorName || 'Super Admin');
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const actorName = searchParams.get('actorName') || 'Super Admin';

    const result = repo.deleteCategory(id, actorName);
    return NextResponse.json({ 
      success: true, 
      message: `Đã xóa chuyên mục "${result.deletedCategory.name}" và ${result.deletedPostCount} bài viết liên quan.`,
      data: result 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
