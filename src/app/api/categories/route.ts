import { NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHidden = searchParams.get('includeHidden') === 'true';
    const categories = repo.getCategories(includeHidden);
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, actorName } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, error: 'Tên và Slug chuyên mục là bắt buộc' }, { status: 400 });
    }

    const cat = repo.createCategory({ name, slug, description: description || '' }, actorName || 'Super Admin');
    return NextResponse.json({ success: true, data: cat }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
