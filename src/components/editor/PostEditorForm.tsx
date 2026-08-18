'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, Category } from '@/types';
import { slugify, calculateReadingTime, formatDateVi } from '@/lib/utils';
import { 
  Save, ArrowLeft, Globe, Search, Sparkles, Pin, 
  HelpCircle, FileText, Image as ImageIcon, AlertTriangle, 
  CheckCircle2, Plus, Trash2, ExternalLink, Bold, Italic, 
  Underline as UnderlineIcon, Heading2, Heading3, AlignLeft, 
  AlignCenter, AlignRight, AlignJustify, Link as LinkIcon, 
  Upload, Eye, Palette, Type, Sliders, X, Check
} from 'lucide-react';

interface PostEditorFormProps {
  initialPost?: Partial<Post>;
  categories: Category[];
  isEditing?: boolean;
}

export function PostEditorForm({ initialPost, categories, isEditing = false }: PostEditorFormProps) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  // Tabs & Modes
  const [activeLang, setActiveLang] = useState<'vi' | 'en'>('vi');
  const [editorMode, setEditorMode] = useState<'markdown' | 'html' | 'plain'>('markdown');
  const [previewLang, setPreviewLang] = useState<'vi' | 'en'>('vi');

  // Dirty tracking for automatic SEO syncing
  const [isSeoTitleDirty, setIsSeoTitleDirty] = useState(Boolean(initialPost?.seoTitle));
  const [isMetaDescDirty, setIsMetaDescDirty] = useState(Boolean(initialPost?.metaDescription));

  // Form State
  const [formData, setFormData] = useState({
    title: initialPost?.title || '',
    titleEn: '',
    slug: initialPost?.slug || '',
    excerpt: initialPost?.excerpt || '',
    excerptEn: '',
    content: initialPost?.content || '',
    contentEn: '',
    coverImage: initialPost?.coverImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    coverAlt: initialPost?.coverAlt || '',
    authorName: initialPost?.authorName || 'Ban Tổ Chức',
    sourceUrl: '',
    sourceName: '',
    categorySlug: initialPost?.categorySlug || categories[0]?.slug || 'chinh-quyen-so',
    tags: initialPost?.tags ? initialPost.tags.join(', ') : 'chuyen-doi-so, adt-govina-ai',
    status: initialPost?.status || 'PUBLISHED',
    isPinned: initialPost?.isPinned || false,
    pinOrder: initialPost?.pinOrder || 1,
    seoTitle: initialPost?.seoTitle || (initialPost?.title ? `${initialPost.title} | Tân Hoàng Nga` : ''),
    metaDescription: initialPost?.metaDescription || initialPost?.excerpt || '',
    focusKeyword: initialPost?.focusKeyword || '',
    faqData: initialPost?.faqData || [],
    citations: initialPost?.citations || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalSlug] = useState(initialPost?.slug || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Image resize modal state
  const [selectedImageWidth, setSelectedImageWidth] = useState<'100%' | '75%' | '50%' | '35%'>('100%');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#0047FF');

  // Handle Title Change + Auto SEO Sync
  const handleTitleChange = (val: string) => {
    setFormData(prev => {
      const newSlug = !isEditing || prev.slug === slugify(prev.title) ? slugify(val) : prev.slug;
      const newSeoTitle = !isSeoTitleDirty ? (val ? `${val} | Tân Hoàng Nga` : '') : prev.seoTitle;
      return {
        ...prev,
        title: val,
        slug: newSlug,
        seoTitle: newSeoTitle
      };
    });
  };

  // Handle Excerpt Change + Auto Meta Description Sync
  const handleExcerptChange = (val: string) => {
    setFormData(prev => {
      const newMetaDesc = !isMetaDescDirty ? val : prev.metaDescription;
      return {
        ...prev,
        excerpt: val,
        metaDescription: newMetaDesc
      };
    });
  };

  // Helper to insert text at cursor in textarea
  const insertTextAtCursor = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = activeLang === 'vi' ? formData.content : formData.contentEn;
    const selectedText = currentContent.substring(start, end) || defaultText;

    const newContent = 
      currentContent.substring(0, start) + 
      before + selectedText + after + 
      currentContent.substring(end);

    if (activeLang === 'vi') {
      setFormData(prev => ({ ...prev, content: newContent }));
    } else {
      setFormData(prev => ({ ...prev, contentEn: newContent }));
    }

    setTimeout(() => {
      textarea.focus();
      const cursorPosition = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }, 10);
  };

  // Upload Cover Image handler (File to DataURL / URL)
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData(prev => ({ ...prev, coverImage: result }));
      setToastMessage('Đã tải ảnh bìa thành công!');
      setTimeout(() => setToastMessage(null), 2500);
    };
    reader.readAsDataURL(file);
  };

  // Upload Content Image handler
  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      insertImageWithStyle(result, file.name);
      setToastMessage('Đã chèn ảnh vào nội dung!');
      setTimeout(() => setToastMessage(null), 2500);
    };
    reader.readAsDataURL(file);
  };

  // Copy-Paste Image Handler on Editor Textarea (Ctrl+V Image Support)
  const handleEditorPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (!file) continue;

        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          insertImageWithStyle(result, 'Ảnh chụp dán');
          setToastMessage('Đã dán ảnh thành công từ bộ nhớ tạm (Clipboard)!');
          setTimeout(() => setToastMessage(null), 2500);
        };
        reader.readAsDataURL(file);
        return;
      }
    }
  };

  // Insert Image with selected width styling
  const insertImageWithStyle = (src: string, alt: string = 'Hình ảnh') => {
    let imgSnippet = '';
    if (editorMode === 'markdown') {
      if (selectedImageWidth === '100%') {
        imgSnippet = `\n\n![${alt}](${src})\n\n`;
      } else {
        imgSnippet = `\n\n<p align="center"><img src="${src}" alt="${alt}" style="width: ${selectedImageWidth}; border-radius: 12px; margin: 16px auto;" /></p>\n\n`;
      }
    } else if (editorMode === 'html') {
      imgSnippet = `<figure style="text-align: center; margin: 20px 0;"><img src="${src}" alt="${alt}" style="width: ${selectedImageWidth}; max-width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /><figcaption style="font-size: 12px; color: #64748b; margin-top: 6px;">${alt}</figcaption></figure>`;
    } else {
      imgSnippet = `\n[HÌNH ẢNH: ${alt} - ${src}]\n`;
    }
    insertTextAtCursor(imgSnippet);
  };

  // FAQ handlers
  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqData: [...prev.faqData, { question: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqData: prev.faqData.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    const updated = [...formData.faqData];
    updated[index][field] = val;
    setFormData(prev => ({ ...prev, faqData: updated }));
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('Vui lòng nhập tiêu đề và đường dẫn slug bài viết.');
      return;
    }

    setIsSubmitting(true);

    const categoryObj = categories.find(c => c.slug === formData.categorySlug);
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    const readingTime = calculateReadingTime(formData.content);

    const payload = {
      ...formData,
      tags: tagsArray,
      categoryName: categoryObj?.name || 'Tin tức',
      readingTimeMinutes: readingTime,
      publishedAt: formData.status === 'PUBLISHED' ? (initialPost?.publishedAt || new Date().toISOString()) : null
    };

    try {
      const url = isEditing ? `/api/posts/${initialPost?.id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setToastMessage(isEditing ? 'Đã lưu thay đổi bài viết thành công!' : 'Đã tạo bài viết mới thành công!');
        setTimeout(() => {
          router.push('/dashboard/posts');
        }, 1000);
      } else {
        alert(data.error || 'Có lỗi xảy ra khi lưu bài viết.');
      }
    } catch (err: any) {
      alert(err.message || 'Lỗi kết nối khi lưu bài viết.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSlugChanged = isEditing && originalSlug && formData.slug !== originalSlug;

  // Simple Markdown live renderer for the preview box
  const renderPreviewContent = (rawText: string) => {
    if (!rawText) return '<p class="text-slate-400 italic">Nhập nội dung vào ô soạn thảo bên trái để hiển thị xem trước tại đây...</p>';

    if (editorMode === 'html') {
      return rawText;
    }

    if (editorMode === 'plain') {
      return `<p class="whitespace-pre-wrap text-slate-700 leading-relaxed">${rawText}</p>`;
    }

    // Markdown Parser
    let parsed = rawText
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-navy-text mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-black text-navy-text mt-5 mb-2.5 pb-1 border-b border-slate-100">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-navy-text mt-6 mb-3">$1</h1>')
      // Bold, Italic, Underline
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline underline-offset-2">$1</u>')
      // Images: ![alt](src)
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<figure class="my-4 text-center"><img src="$2" alt="$1" class="max-w-full h-auto rounded-xl mx-auto shadow-sm border border-slate-200" /><figcaption class="text-xs text-slate-400 mt-1.5">$1</figcaption></figure>')
      // Links: [text](url)
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-600 hover:underline font-semibold" target="_blank">$1</a>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-brand-500 pl-4 py-1.5 my-3 bg-brand-50/50 rounded-r-xl text-slate-700 italic">$1</blockquote>')
      // Unordered List items
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="my-2.5 text-slate-700 leading-relaxed">')
      .replace(/\n/g, '<br />');

    return `<p class="my-2 text-slate-700 leading-relaxed">${parsed}</p>`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-20 pt-2">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-mint-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Inputs for Local Image Uploads */}
      <input
        type="file"
        ref={coverFileInputRef}
        onChange={handleCoverFileUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={contentImageInputRef}
        onChange={handleContentImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Page Header (No sticky clip, ample breathing room) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-navy-text tracking-tight flex items-center gap-2">
            <span>{isEditing ? 'Chỉnh Sửa Bài Viết Tin Tức' : 'Viết bài tin tức mới'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Soạn thảo bài viết, đính kèm banner hình ảnh và ghim nổi bật.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/posts"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách</span>
          </Link>
        </div>
      </div>

      {/* Language Switcher Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveLang('vi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
            activeLang === 'vi'
              ? 'bg-rose-700 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono font-bold">VN</span>
          <span>Nội dung Tiếng Việt (Mặc định)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveLang('en')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
            activeLang === 'en'
              ? 'bg-brand-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">EN</span>
          <span>Nội dung Tiếng Anh (English Content)</span>
        </button>
      </div>

      {/* 301 Redirect Alert if slug changed */}
      {isSlugChanged && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Quy tắc SEO:</strong>
            <span>
              Đổi slug từ <code>/{originalSlug}</code> sang <code>/{formData.slug}</code>. Hệ thống sẽ tự động tạo bản ghi <strong>Redirect 301</strong> tránh gãy liên kết.
            </span>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN SPLIT: Editor Form (Left 7 cols) & Live Preview (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Toolbar (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 1. Title & Excerpt Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tiêu đề bài viết ({activeLang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={activeLang === 'vi' ? 'Ví dụ: ADT Govina AI — Bước đột phá trợ lý tri thức số cho cấp phường, xã...' : 'Example: ADT Govina AI - Breakthrough AI Assistant...'}
                value={activeLang === 'vi' ? formData.title : formData.titleEn}
                onChange={(e) => {
                  if (activeLang === 'vi') {
                    handleTitleChange(e.target.value);
                  } else {
                    setFormData({ ...formData, titleEn: e.target.value });
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm sm:text-base font-bold text-navy-text focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all placeholder-slate-400"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tóm tắt bài viết ({activeLang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'})
              </label>
              <textarea
                rows={2}
                placeholder={activeLang === 'vi' ? 'Tóm tắt ngắn gọn nội dung bài viết hiển thị ở danh sách tin...' : 'Short summary of the article content...'}
                value={activeLang === 'vi' ? formData.excerpt : formData.excerptEn}
                onChange={(e) => {
                  if (activeLang === 'vi') {
                    handleExcerptChange(e.target.value);
                  } else {
                    setFormData({ ...formData, excerptEn: e.target.value });
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:border-brand-500 outline-none resize-none placeholder-slate-400"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Đường dẫn tĩnh (Slug) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="adt-govina-ai-tro-ly-tri-thuc-so"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700 focus:bg-white focus:border-brand-500 outline-none"
              />
            </div>

            {/* 3-Column Metadata: Cover Image, Author, Source */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              
              {/* Cover Image Input + Upload Button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">
                    Link ảnh bìa (URL)
                  </label>
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    className="text-[10px] text-brand-600 hover:text-brand-700 font-bold flex items-center gap-0.5 hover:underline"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Tải lên</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="https://images.unsplash..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 font-mono outline-none focus:border-brand-500"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Tác giả người viết
                </label>
                <input
                  type="text"
                  placeholder="Ban Tổ Chức"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 outline-none focus:border-brand-500"
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Nguồn tin bài (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Báo Nhân Dân, VOV..."
                  value={formData.sourceName}
                  onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 outline-none focus:border-brand-500"
                />
              </div>

            </div>

            {/* Options Bar: Mode, Pinning, Status Switch */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
              
              {/* Editor Mode Selector: HTML, Markdown (Default), Plain */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600">Chế độ viết bài:</span>
                <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditorMode('html')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      editorMode === 'html'
                        ? 'bg-white text-navy-text shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    HTML (Soạn trực quan)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('markdown')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      editorMode === 'markdown'
                        ? 'bg-slate-900 text-white shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('plain')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      editorMode === 'plain'
                        ? 'bg-white text-navy-text shadow-sm font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Văn bản thường
                  </button>
                </div>
              </div>

              {/* Pinning & Status Switches */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-400"
                  />
                  <span className="font-bold text-slate-700">Ghim nổi bật</span>
                </label>

                {/* Status Switch (Lưu nháp vs Đăng bài) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-medium">Trạng thái:</span>
                  <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'DRAFT' })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        formData.status === 'DRAFT'
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Lưu nháp
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: 'PUBLISHED' })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        formData.status === 'PUBLISHED'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Đăng bài
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 2. Rich Content Editor with Full Toolbar */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nội dung bài viết ({activeLang === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}) <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <span>Ctrl+V: Dán ảnh trực tiếp</span>
                <span>•</span>
                <span>~{calculateReadingTime(activeLang === 'vi' ? formData.content : formData.contentEn)} phút đọc</span>
              </div>
            </div>

            {/* Rich Editor Toolbar */}
            <div className="p-2 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-1.5">
              
              {/* Bold, Italic, Underline */}
              <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('**', '**', 'văn bản đậm')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="In đậm (Bold)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('*', '*', 'văn bản nghiêng')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="In nghiêng (Italic)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('<u>', '</u>', 'văn bản gạch dưới')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="Gạch chân (Underline)"
                >
                  <UnderlineIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Headings: H2, H3 */}
              <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('\n## ', '\n', 'Tiêu đề đề mục (H2)')}
                  className="px-2 py-1 rounded-lg hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  title="Tiêu đề H2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('\n### ', '\n', 'Tiêu đề nhỏ (H3)')}
                  className="px-2 py-1 rounded-lg hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  title="Tiêu đề H3"
                >
                  H3
                </button>
              </div>

              {/* Alignment */}
              <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('<p align="left">', '</p>')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="Căn trái"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('<p align="center">', '</p>')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="Căn giữa"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('<p align="right">', '</p>')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="Căn phải"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('<p align="justify">', '</p>')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="Căn đều hai bên"
                >
                  <AlignJustify className="w-4 h-4" />
                </button>
              </div>

              {/* Links & Image Uploads */}
              <div className="flex items-center gap-1 border-r border-slate-200 pr-1.5">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('[', '](https://...)', 'Tên liên kết')}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700"
                  title="Chèn liên kết (Link)"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                
                {/* Image Size Selector Button */}
                <select
                  value={selectedImageWidth}
                  onChange={(e) => setSelectedImageWidth(e.target.value as any)}
                  className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none"
                  title="Chọn độ rộng ảnh khi chèn"
                >
                  <option value="100%">Ảnh 100%</option>
                  <option value="75%">Ảnh 75%</option>
                  <option value="50%">Ảnh 50%</option>
                  <option value="35%">Ảnh 35%</option>
                </select>

                <button
                  type="button"
                  onClick={() => contentImageInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold flex items-center gap-1 border border-brand-200"
                  title="Tải ảnh từ máy tính chèn vào nội dung"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tải lên ảnh</span>
                </button>
              </div>

              {/* Text Color Picker Presets */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 px-1">
                  {['#0047FF', '#00A896', '#E63946', '#D97706', '#1E293B'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => insertTextAtCursor(`<span style="color: ${color};">`, '</span>', 'chữ màu')}
                      className="w-4 h-4 rounded-full border border-slate-300 transition-transform hover:scale-125"
                      style={{ backgroundColor: color }}
                      title={`Màu chữ ${color}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Textarea with Paste Listener */}
            <textarea
              ref={textareaRef}
              rows={16}
              required
              onPaste={handleEditorPaste}
              placeholder={
                editorMode === 'markdown'
                  ? 'Nhập nội dung bài viết bằng Markdown (Dán ảnh Ctrl+V trực tiếp, ## Tiêu đề, **in đậm**, - danh sách)...'
                  : editorMode === 'html'
                  ? 'Nhập nội dung mã nguồn HTML chuẩn (<h2>...</h2>, <p>...</p>, <img src="..." />)...'
                  : 'Nhập nội dung văn bản thuần túy...'
              }
              value={activeLang === 'vi' ? formData.content : formData.contentEn}
              onChange={(e) => {
                if (activeLang === 'vi') {
                  setFormData({ ...formData, content: e.target.value });
                } else {
                  setFormData({ ...formData, contentEn: e.target.value });
                }
              }}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 leading-relaxed focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
            />
          </div>

          {/* 3. Citations & FAQ Accordion Builders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category & Tags */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Phân Loại & Chuyên Mục
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Chuyên mục chính
                </label>
                <select
                  value={formData.categorySlug}
                  onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-800 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Từ khóa / Tags (cách nhau bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="chuyen-doi-so, adt-govina-ai"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
                />
              </div>
            </div>

            {/* FAQ Builder Mini */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hỏi Đáp FAQ ({formData.faqData.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-100"
                >
                  <Plus className="w-3 h-3" />
                  <span>Thêm FAQ</span>
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {formData.faqData.map((faq, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-700">FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Câu hỏi..."
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                      className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold outline-none"
                    />
                    <textarea
                      rows={1}
                      placeholder="Câu trả lời..."
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                      className="w-full px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs outline-none resize-none"
                    />
                  </div>
                ))}
                {formData.faqData.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic">Chưa có câu hỏi FAQ nào.</p>
                )}
              </div>
            </div>

          </div>

          {/* 4. SEO & GEO Panel with Live Sync */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-brand-600" />
                <span>Bảng Điều Khiển SEO & AI GEO</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Tự động đồng bộ từ Tiêu đề & Tóm tắt
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-600">
                  SEO Title ({formData.seoTitle.length}/60)
                </label>
                {isSeoTitleDirty && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSeoTitleDirty(false);
                      setFormData(prev => ({ ...prev, seoTitle: prev.title ? `${prev.title} | Tân Hoàng Nga` : '' }));
                    }}
                    className="text-[10px] text-brand-600 hover:underline"
                  >
                    Khôi phục tự động
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Tiêu đề hiển thị Google SERP..."
                value={formData.seoTitle}
                onChange={(e) => {
                  setIsSeoTitleDirty(true);
                  setFormData({ ...formData, seoTitle: e.target.value });
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-600">
                  Meta Description ({formData.metaDescription.length}/160)
                </label>
                {isMetaDescDirty && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMetaDescDirty(false);
                      setFormData(prev => ({ ...prev, metaDescription: prev.excerpt }));
                    }}
                    className="text-[10px] text-brand-600 hover:underline"
                  >
                    Khôi phục tự động
                  </button>
                )}
              </div>
              <textarea
                rows={2}
                placeholder="Mô tả trích xuất cho Search Engine & AI Crawler..."
                value={formData.metaDescription}
                onChange={(e) => {
                  setIsMetaDescDirty(true);
                  setFormData({ ...formData, metaDescription: e.target.value });
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-brand-500 resize-none"
              />
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 font-mono">https://tanhoangnga.vn/bai-viet/{formData.slug || 'slug'}</span>
              <div className="text-sm font-bold text-blue-700 hover:underline cursor-pointer line-clamp-1">
                {formData.seoTitle || formData.title || 'Tiêu đề bài viết'}
              </div>
              <p className="text-slate-600 text-[11px] line-clamp-2">
                {formData.metaDescription || formData.excerpt || 'Mô tả tóm tắt nội dung bài viết sẽ hiển thị tại đây khi người dùng tìm kiếm trên Google.'}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: LIVE PREVIEW PANEL (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-navy-text uppercase tracking-wider">
              <Eye className="w-4 h-4 text-brand-600" />
              <span>Xem Trước (Live Preview)</span>
            </div>
            
            <div className="inline-flex rounded-lg bg-slate-200 p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setPreviewLang('vi')}
                className={`px-2 py-0.5 rounded ${previewLang === 'vi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                vn VI
              </button>
              <button
                type="button"
                onClick={() => setPreviewLang('en')}
                className={`px-2 py-0.5 rounded ${previewLang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                en EN
              </button>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
            
            {/* Cover Image Preview */}
            <div className="aspect-[16/9] w-full bg-slate-100 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt={formData.title || 'Cover'}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              ) : (
                <div className="text-slate-400 text-xs flex flex-col items-center gap-1.5 font-medium">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span>Chưa có ảnh bìa</span>
                </div>
              )}

              {formData.isPinned && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Pin className="w-3 h-3 rotate-45" />
                  <span>Ghim nổi bật #{formData.pinOrder}</span>
                </span>
              )}
            </div>

            {/* Article Content Preview */}
            <div className="p-6 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
              
              {/* Category & Status */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                  {categories.find(c => c.slug === formData.categorySlug)?.name || 'Chuyên mục'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-mono text-slate-600 font-bold">
                  {formData.status}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-navy-text leading-snug">
                {previewLang === 'vi' ? (formData.title || 'Tiêu đề bài viết...') : (formData.titleEn || 'Article Title...')}
              </h2>

              {/* Author & Date */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-bold text-slate-700">{formData.authorName || 'Tân Hoàng Nga'}</span>
                <span>•</span>
                <span>{formatDateVi(new Date().toISOString())}</span>
                {formData.sourceName && (
                  <>
                    <span>•</span>
                    <span className="italic text-slate-500">Nguồn: {formData.sourceName}</span>
                  </>
                )}
              </div>

              {/* Excerpt */}
              {(formData.excerpt || formData.excerptEn) && (
                <div className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-brand-500 text-xs font-medium text-slate-700 leading-relaxed italic">
                  {previewLang === 'vi' ? formData.excerpt : formData.excerptEn}
                </div>
              )}

              {/* Body Content Rendered */}
              <div 
                className="prose prose-sm max-w-none text-xs text-slate-700 pt-2 border-t border-slate-100 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: renderPreviewContent(previewLang === 'vi' ? formData.content : formData.contentEn)
                }}
              />

              {/* FAQ Preview */}
              {formData.faqData.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-navy-text uppercase tracking-wider flex items-center gap-1 text-emerald-700">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Hỏi & Đáp Thường Gặp</span>
                  </h4>
                  {formData.faqData.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-0.5">
                      <div className="font-bold text-navy-text">Q: {f.question || '...'}</div>
                      <div className="text-slate-600 text-[11px]">A: {f.answer || '...'}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Action Footer Bar */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => router.push('/dashboard/posts')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 transition-colors"
        >
          Hủy bỏ
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:shadow-glow text-white text-xs font-black transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? 'Đang lưu...' : 'LƯU BÀI VIẾT'}</span>
        </button>
      </div>

    </form>
  );
}
