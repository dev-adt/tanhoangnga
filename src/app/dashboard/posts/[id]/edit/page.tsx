import React from 'react';
import { notFound } from 'next/navigation';
import { repo } from '@/lib/store/repository';
import { PostEditorForm } from '@/components/editor/PostEditorForm';

export const metadata = {
  title: 'Chỉnh Sửa Bài Viết — Dashboard Tân Hoàng Nga',
};

export default async function EditPostPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = repo.getPostById(id);
  const categories = repo.getCategories();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PostEditorForm initialPost={post} categories={categories} isEditing={true} />
    </div>
  );
}
