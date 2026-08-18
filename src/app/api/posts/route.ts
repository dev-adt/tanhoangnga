import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as any;
  const categorySlug = searchParams.get('categorySlug') || undefined;
  const tagSlug = searchParams.get('tagSlug') || undefined;
  const search = searchParams.get('search') || undefined;

  const posts = repo.getPosts({ status, categorySlug, tagSlug, search });
  return NextResponse.json({ success: true, posts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ success: false, error: 'Tiêu đề và slug là bắt buộc' }, { status: 400 });
    }

    const newPost = repo.createPost(body, 'Admin User');
    return NextResponse.json({ success: true, post: newPost });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
