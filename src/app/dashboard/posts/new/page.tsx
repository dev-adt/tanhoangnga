import React from 'react';
import { repo } from '@/lib/store/repository';
import { PostEditorForm } from '@/components/editor/PostEditorForm';

export const metadata = {
  title: 'Tạo Bài Viết Mới — Dashboard Tân Hoàng Nga',
};

export default function NewPostPage() {
  const categories = repo.getCategories();

  return (
    <div>
      <PostEditorForm categories={categories} />
    </div>
  );
}
