'use client';

import React, { useState, useEffect } from 'react';
import { MediaAsset } from '@/types';
import { formatDateVi } from '@/lib/utils';
import { Image as ImageIcon, Plus, Copy, CheckCircle2, ExternalLink, Trash2 } from 'lucide-react';

export default function DashboardMediaPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const fetchMedia = () => {
    // In-memory media list
    const initialList: MediaAsset[] = [
      {
        id: 'media-1',
        name: 'govina-hero-banner.jpg',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
        mimeType: 'image/jpeg',
        sizeBytes: 345000,
        alt: 'Govina AI Trợ lý chính quyền cơ sở',
        uploaderName: 'Bùi Thái Hoàng',
        createdAt: '2026-08-12T08:00:00Z'
      },
      {
        id: 'media-2',
        name: 'orion-os-architecture.jpg',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        mimeType: 'image/jpeg',
        sizeBytes: 412000,
        alt: 'Orion AI Multi Model Architecture',
        uploaderName: 'Bùi Thái Hoàng',
        createdAt: '2026-08-14T09:00:00Z'
      },
      {
        id: 'media-3',
        name: 'coffee-farm-origin.jpg',
        url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop',
        mimeType: 'image/jpeg',
        sizeBytes: 520000,
        alt: 'Vùng trồng cà phê CoffeeVN',
        uploaderName: 'Ban Biên Tập',
        createdAt: '2026-08-15T09:30:00Z'
      },
      {
        id: 'media-4',
        name: 'dienbien-nature-landscape.jpg',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        mimeType: 'image/jpeg',
        sizeBytes: 490000,
        alt: 'Cảnh sắc Điện Biên',
        uploaderName: 'Ban Biên Tập',
        createdAt: '2026-08-16T10:00:00Z'
      }
    ];
    setMediaList(initialList);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    const newAsset: MediaAsset = {
      id: `media-${Date.now()}`,
      name: newName || 'uploaded-image.jpg',
      url: newUrl,
      mimeType: 'image/jpeg',
      sizeBytes: 350000,
      alt: newAlt || newName,
      uploaderName: 'Bùi Thái Hoàng',
      createdAt: new Date().toISOString()
    };
    setMediaList([newAsset, ...mediaList]);
    setIsUploadModalOpen(false);
    setNewUrl('');
    setNewName('');
    setNewAlt('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-text tracking-tight">
            Thư Viện Media & Tài Nguyên Số
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý hình ảnh, sơ đồ kiến trúc và tệp đa phương tiện phục vụ bài viết và các trang giải pháp.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm hình ảnh / URL</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((asset) => (
          <div key={asset.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={asset.url}
                  alt={asset.alt || asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-bold text-navy-text text-xs truncate" title={asset.name}>
                  {asset.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {formatDateVi(asset.createdAt)} • {Math.round(asset.sizeBytes / 1024)} KB
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleCopyUrl(asset.url, asset.id)}
                className="px-3 py-1 rounded-lg text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 flex items-center gap-1.5 transition-colors"
              >
                {copiedId === asset.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã chép URL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <a
                href={asset.url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-700"
                title="Xem ảnh gốc"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-text">Thêm Tệp Media Mới</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-xs text-slate-400 hover:text-slate-600">Đóng</button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">URL Hình ảnh <span className="text-rose-500">*</span></label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Tên file</label>
                <input
                  type="text"
                  placeholder="VD: govina-ward-demo.jpg"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Alt Text (Mô tả SEO)</label>
                <input
                  type="text"
                  placeholder="Mô tả nội dung hình ảnh..."
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700"
                >
                  Thêm vào thư viện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
