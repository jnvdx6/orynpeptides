'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { adminGet, adminPost, adminPut, adminDelete } from '@/lib/admin-fetch';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CategoryId = 'peptide-pen' | 'medit-pen' | 'novadose';
type Status = 'draft' | 'published' | 'archived';

interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  categoryLabel: string;
  dosage: string;
  volume: string;
  price: number;
  description: string;
  benefits: string[];
  specs: Record<string, string>;
  badge?: string;
  image: string;
  status: Status;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductForm {
  name: string;
  subtitle: string;
  category: CategoryId;
  categoryLabel: string;
  dosage: string;
  volume: string;
  price: string;
  description: string;
  status: Status;
  stock: string;
  sku: string;
  badge: string;
  image: string;
  benefits: string[];
  specs: Record<string, string>;
}

const EMPTY_FORM: ProductForm = {
  name: '',
  subtitle: '',
  category: 'peptide-pen',
  categoryLabel: 'Peptide Pen',
  dosage: '',
  volume: '',
  price: '',
  description: '',
  status: 'draft',
  stock: '0',
  sku: '',
  badge: '',
  image: '/images/products/peptide-pen-hero.png',
  benefits: [''],
  specs: {},
};

const CATEGORY_META: Record<CategoryId, { label: string; description: string; defaultImage: string }> = {
  'peptide-pen': { label: 'Peptide Pens', description: 'Injectable peptide pens', defaultImage: '/images/products/pen-bpc157.png' },
  'medit-pen': { label: 'MediT Pens', description: 'Prefilled injection pens', defaultImage: '/images/products/pen-medit.png' },
  novadose: { label: 'NovaDose', description: 'Precision dosing products', defaultImage: '/images/products/pen-novadose.png' },
};

const BADGE_OPTIONS = ['', 'Best Seller', 'Popular', 'New', 'Premium', 'Innovation', 'Sale'];

const IMAGE_OPTIONS = [
  { label: 'BPC-157', value: '/images/products/pen-bpc157.png' },
  { label: 'TB-500', value: '/images/products/pen-tb500.png' },
  { label: 'CJC-1295', value: '/images/products/pen-cjc1295.png' },
  { label: 'Ipamorelin', value: '/images/products/pen-ipamorelin.png' },
  { label: 'Tirzepatide', value: '/images/products/pen-tirzepatide.png' },
  { label: 'GHK-CU', value: '/images/products/pen-ghkcu.png' },
  { label: 'Glutathione', value: '/images/products/pen-glutathione.png' },
  { label: 'NAD+', value: '/images/products/pen-nad.png' },
  { label: 'MediT Pen', value: '/images/products/pen-medit.png' },
  { label: 'NovaDose', value: '/images/products/pen-novadose.png' },
  { label: 'Pen (Reference)', value: '/images/products/peptide-pen-single.png' },
  { label: 'All Pens', value: '/images/products/peptide-pens-all.png' },
  { label: 'MediT Box', value: '/images/products/medit-pen-box.png' },
  { label: 'NovaDose System', value: '/images/products/novadose-system.png' },
];

const STATUS_STYLES: Record<Status, string> = {
  draft: 'bg-gray-100 text-gray-700',
  published: 'bg-emerald-50 text-emerald-700',
  archived: 'bg-amber-50 text-amber-700',
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AdminProductsPage() {
  /* ---- state ---- */
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<'' | CategoryId>('');
  const [filterStatus, setFilterStatus] = useState<'' | Status>('');

  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editPriceValue, setEditPriceValue] = useState('');

  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editStockValue, setEditStockValue] = useState('');

  // Create/Edit modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'details' | 'specs' | 'images'>('general');

  // Specs editor state
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const [savingField, setSavingField] = useState<string | null>(null);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- fetch ---- */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filterCategory) params.set('category', filterCategory);
      if (filterStatus) params.set('status', filterStatus);
      if (search.trim()) params.set('search', search.trim());
      const qs = params.toString();
      const data = await adminGet<{ products: AdminProduct[] }>(
        `/api/admin/products${qs ? `?${qs}` : ''}`
      );
      setProducts(data.products);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterStatus, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ---- debounced search ---- */
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      /* fetchProducts will fire via useEffect dependency */
    }, 300);
  };

  /* ---- inline update helpers ---- */
  const patchProduct = async (productId: string, updates: Record<string, unknown>) => {
    setSavingField(productId);
    try {
      await adminPut('/api/admin/products', { productId, ...updates });
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, ...updates, updatedAt: new Date().toISOString() } as AdminProduct : p))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSavingField(null);
    }
  };

  /* price */
  const startEditPrice = (id: string, currentPrice: number) => {
    setEditPriceValue(currentPrice.toString());
    setEditingPriceId(id);
  };
  const savePrice = async (id: string) => {
    const newPrice = parseFloat(editPriceValue);
    if (!isNaN(newPrice) && newPrice > 0) {
      await patchProduct(id, { price: newPrice });
    }
    setEditingPriceId(null);
  };

  /* stock */
  const startEditStock = (id: string, currentStock: number) => {
    setEditStockValue(currentStock.toString());
    setEditingStockId(id);
  };
  const saveStock = async (id: string) => {
    const newStock = parseInt(editStockValue, 10);
    if (!isNaN(newStock) && newStock >= 0) {
      await patchProduct(id, { stock: newStock });
    }
    setEditingStockId(null);
  };

  /* status */
  const changeStatus = async (id: string, status: Status) => {
    await patchProduct(id, { status });
  };

  /* badge */
  const changeBadge = async (id: string, badge: string) => {
    await patchProduct(id, { badge: badge || undefined });
  };

  /* ---- open edit modal ---- */
  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      subtitle: product.subtitle,
      category: product.category,
      categoryLabel: product.categoryLabel,
      dosage: product.dosage,
      volume: product.volume,
      price: product.price.toString(),
      description: product.description,
      status: product.status,
      stock: product.stock.toString(),
      sku: product.sku,
      badge: product.badge || '',
      image: product.image,
      benefits: product.benefits.length > 0 ? [...product.benefits] : [''],
      specs: { ...product.specs },
    });
    setActiveTab('general');
    setShowProductModal(true);
  };

  /* ---- open create modal ---- */
  const openCreateModal = () => {
    setEditingProduct(null);
    setProductForm(EMPTY_FORM);
    setActiveTab('general');
    setShowProductModal(true);
  };

  /* ---- save product (create or update) ---- */
  const handleSaveProduct = async () => {
    if (!productForm.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name: productForm.name.trim(),
        subtitle: productForm.subtitle.trim(),
        category: productForm.category,
        categoryLabel: productForm.categoryLabel || CATEGORY_META[productForm.category].label,
        dosage: productForm.dosage.trim(),
        volume: productForm.volume.trim(),
        price: parseFloat(productForm.price) || 0,
        description: productForm.description.trim(),
        status: productForm.status,
        stock: parseInt(productForm.stock, 10) || 0,
        sku: productForm.sku.trim(),
        badge: productForm.badge || undefined,
        image: productForm.image || CATEGORY_META[productForm.category].defaultImage,
        benefits: productForm.benefits.filter((b) => b.trim()),
        specs: productForm.specs,
      };

      if (editingProduct) {
        // Update
        await adminPut('/api/admin/products', { productId: editingProduct.id, ...payload });
      } else {
        // Create
        if (!productForm.sku.trim()) {
          alert('SKU is required');
          setSaving(false);
          return;
        }
        await adminPost('/api/admin/products', payload);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      await fetchProducts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  /* ---- delete ---- */
  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await adminDelete(`/api/admin/products?id=${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  /* ---- form helpers ---- */
  const updateForm = (updates: Partial<ProductForm>) => {
    setProductForm((f) => ({ ...f, ...updates }));
  };

  const addBenefit = () => {
    setProductForm((f) => ({ ...f, benefits: [...f.benefits, ''] }));
  };

  const updateBenefit = (index: number, value: string) => {
    setProductForm((f) => ({
      ...f,
      benefits: f.benefits.map((b, i) => (i === index ? value : b)),
    }));
  };

  const removeBenefit = (index: number) => {
    setProductForm((f) => ({
      ...f,
      benefits: f.benefits.filter((_, i) => i !== index),
    }));
  };

  const addSpec = () => {
    if (!newSpecKey.trim()) return;
    setProductForm((f) => ({
      ...f,
      specs: { ...f.specs, [newSpecKey.trim()]: newSpecValue.trim() },
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const removeSpec = (key: string) => {
    setProductForm((f) => {
      const { [key]: _, ...rest } = f.specs;
      return { ...f, specs: rest };
    });
  };

  const updateSpecValue = (key: string, value: string) => {
    setProductForm((f) => ({
      ...f,
      specs: { ...f.specs, [key]: value },
    }));
  };

  /* ---- computed ---- */
  const categorySummary = (Object.keys(CATEGORY_META) as CategoryId[]).map((catId) => {
    const inCat = products.filter((p) => p.category === catId);
    return {
      id: catId,
      ...CATEGORY_META[catId],
      total: inCat.length,
      published: inCat.filter((p) => p.status === 'published').length,
      draft: inCat.filter((p) => p.status === 'draft').length,
      archived: inCat.filter((p) => p.status === 'archived').length,
    };
  });

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="space-y-6">
      {/* ---------- Category summary cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categorySummary.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
                <img src={cat.defaultImage} alt="" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{cat.label}</p>
                <p className="text-xs text-gray-500">{cat.description}</p>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xl font-semibold text-gray-900">{cat.total}</span>
              <span className="text-xs text-emerald-600">{cat.published} published</span>
              <span className="text-xs text-gray-400">{cat.draft} draft</span>
              <span className="text-xs text-amber-500">{cat.archived} archived</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Filter bar ---------- */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
            />
          </div>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as '' | CategoryId)}
            className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
          >
            <option value="">All categories</option>
            <option value="peptide-pen">Peptide Pens</option>
            <option value="medit-pen">MediT Pens</option>
            <option value="novadose">NovaDose</option>
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as '' | Status)}
            className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              title="List view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
          </div>

          {/* Create button */}
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* ---------- Loading / Error / Empty ---------- */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="inline-block w-6 h-6 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="mt-3 text-sm text-gray-500">Loading products...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <svg className="mx-auto w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="mt-3 text-sm text-gray-500">No products found</p>
          <button
            onClick={openCreateModal}
            className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Create your first product
          </button>
        </div>
      )}

      {/* ---------- LIST VIEW ---------- */}
      {!loading && !error && products.length > 0 && viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Badge</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`border-t border-gray-100 hover:bg-gray-50/60 transition-colors ${
                      savingField === product.id ? 'opacity-60 pointer-events-none' : ''
                    }`}
                  >
                    {/* Product name - clickable to edit */}
                    <td className="px-5 py-4">
                      <button onClick={() => openEditModal(product)} className="flex items-center gap-3 text-left group/name">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                          ) : (
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover/name:text-orange-500 transition-colors">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate">{product.subtitle}</p>
                        </div>
                        <svg className="w-3 h-3 text-gray-300 group-hover/name:text-orange-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="bg-gray-100 text-gray-600 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                        {product.categoryLabel}
                      </span>
                    </td>

                    {/* SKU */}
                    <td className="px-5 py-4 text-xs text-gray-500 font-mono">{product.sku}</td>

                    {/* Dosage */}
                    <td className="px-5 py-4 text-xs text-gray-500 font-mono">{product.dosage}</td>

                    {/* Price (inline edit) */}
                    <td className="px-5 py-4">
                      {editingPriceId === product.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-400">EUR</span>
                          <input
                            type="number"
                            step="0.01"
                            value={editPriceValue}
                            onChange={(e) => setEditPriceValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') savePrice(product.id);
                              if (e.key === 'Escape') setEditingPriceId(null);
                            }}
                            autoFocus
                            className="w-20 px-2 py-1 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                          />
                          <button
                            onClick={() => savePrice(product.id)}
                            className="text-gray-900 hover:text-orange-500 text-xs font-medium px-1.5 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditPrice(product.id, product.price)}
                          className="font-mono text-sm text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
                          title="Click to edit price"
                        >
                          EUR {product.price.toFixed(2)}
                        </button>
                      )}
                    </td>

                    {/* Stock (inline edit) */}
                    <td className="px-5 py-4">
                      {editingStockId === product.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={editStockValue}
                            onChange={(e) => setEditStockValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveStock(product.id);
                              if (e.key === 'Escape') setEditingStockId(null);
                            }}
                            autoFocus
                            className="w-16 px-2 py-1 border border-gray-200 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                          />
                          <button
                            onClick={() => saveStock(product.id)}
                            className="text-gray-900 hover:text-orange-500 text-xs font-medium px-1.5 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditStock(product.id, product.stock)}
                          className={`font-mono text-sm transition-colors cursor-pointer ${
                            product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-amber-600' : 'text-gray-900'
                          } hover:text-orange-500`}
                          title="Click to edit stock"
                        >
                          {product.stock}
                        </button>
                      )}
                    </td>

                    {/* Badge */}
                    <td className="px-5 py-4">
                      <select
                        value={product.badge || ''}
                        onChange={(e) => changeBadge(product.id, e.target.value)}
                        className="border border-gray-200 rounded-md text-xs bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      >
                        {BADGE_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b || 'No badge'}</option>
                        ))}
                      </select>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <select
                        value={product.status}
                        onChange={(e) => changeStatus(product.id, e.target.value as Status)}
                        className={`rounded-full text-xs font-medium px-3 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${STATUS_STYLES[product.status]}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : '-'}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-gray-400 hover:text-orange-500 transition-colors"
                          title="Edit product"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete product"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- GRID VIEW ---------- */}
      {!loading && !error && products.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col ${
                savingField === product.id ? 'opacity-60 pointer-events-none' : ''
              }`}
            >
              {/* Product image */}
              <button onClick={() => openEditModal(product)} className="relative aspect-[16/10] bg-gray-50 overflow-hidden group/img">
                <img
                  src={product.image || CATEGORY_META[product.category]?.defaultImage || '/images/products/peptide-pen-hero.png'}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover/img:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm">
                    Edit Product
                  </span>
                </div>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                )}
              </button>

              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate">{product.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setDeleteConfirmId(product.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Tags row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-gray-100 text-gray-600 rounded-md px-2 py-0.5 text-xs font-medium">
                    {product.categoryLabel}
                  </span>
                  <span className={`rounded-full text-xs font-medium px-2.5 py-0.5 ${STATUS_STYLES[product.status]}`}>
                    {product.status}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">SKU</span>
                    <p className="font-mono text-gray-700">{product.sku}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Dosage</span>
                    <p className="font-mono text-gray-700">{product.dosage}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Price</span>
                    <p className="font-mono text-gray-900 font-medium">EUR {product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Stock</span>
                    <p className={`font-mono font-medium ${
                      product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-amber-600' : 'text-gray-900'
                    }`}>
                      {product.stock}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
                  <select
                    value={product.status}
                    onChange={(e) => changeStatus(product.id, e.target.value as Status)}
                    className={`rounded-full text-xs font-medium px-2.5 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${STATUS_STYLES[product.status]}`}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    onClick={() => openEditModal(product)}
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- DELETE CONFIRMATION MODAL ---------- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="relative bg-white rounded-xl border border-gray-200 shadow-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-gray-900">Delete Product</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{' '}
              <span className="font-medium text-gray-700">
                {products.find((p) => p.id === deleteConfirmId)?.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- PRODUCT EDIT/CREATE MODAL ---------- */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowProductModal(false)} />
          <div className="relative bg-white rounded-xl border border-gray-200 shadow-xl max-w-3xl w-full max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {editingProduct?.image && (
                  <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={editingProduct.image} alt="" className="w-10 h-10 object-contain" />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {editingProduct ? `Edit: ${editingProduct.name}` : 'Create Product'}
                  </h3>
                  {editingProduct && (
                    <p className="text-xs text-gray-400 font-mono">{editingProduct.sku}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-100 px-6 bg-gray-50/50">
              <div className="flex gap-0">
                {[
                  { id: 'general' as const, label: 'General', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { id: 'details' as const, label: 'Details', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
                  { id: 'specs' as const, label: 'Specs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                  { id: 'images' as const, label: 'Images', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                    </svg>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* ---- GENERAL TAB ---- */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        placeholder="Product name"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={productForm.subtitle}
                        onChange={(e) => updateForm({ subtitle: e.target.value })}
                        placeholder="Short description"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => {
                          const cat = e.target.value as CategoryId;
                          updateForm({
                            category: cat,
                            categoryLabel: CATEGORY_META[cat].label,
                            image: CATEGORY_META[cat].defaultImage,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      >
                        <option value="peptide-pen">Peptide Pens</option>
                        <option value="medit-pen">MediT Pens</option>
                        <option value="novadose">NovaDose</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Category Label</label>
                      <input
                        type="text"
                        value={productForm.categoryLabel}
                        onChange={(e) => updateForm({ categoryLabel: e.target.value })}
                        placeholder="Display label"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={productForm.status}
                        onChange={(e) => updateForm({ status: e.target.value as Status })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Badge</label>
                      <select
                        value={productForm.badge}
                        onChange={(e) => updateForm({ badge: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      >
                        {BADGE_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b || 'No badge'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Price (EUR) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => updateForm({ price: e.target.value })}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.stock}
                        onChange={(e) => updateForm({ stock: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Dosage</label>
                      <input
                        type="text"
                        value={productForm.dosage}
                        onChange={(e) => updateForm({ dosage: e.target.value })}
                        placeholder="e.g. 10 mg"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Volume</label>
                      <input
                        type="text"
                        value={productForm.volume}
                        onChange={(e) => updateForm({ volume: e.target.value })}
                        placeholder="e.g. 3 mL"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">SKU {!editingProduct && '*'}</label>
                    <input
                      type="text"
                      value={productForm.sku}
                      onChange={(e) => updateForm({ sku: e.target.value })}
                      placeholder="e.g. ORYN-BPC-157-001"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                    />
                  </div>
                </div>
              )}

              {/* ---- DETAILS TAB ---- */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => updateForm({ description: e.target.value })}
                      rows={4}
                      placeholder="Full product description..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">{productForm.description.length} characters</p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-gray-700">Benefits</label>
                      <button
                        onClick={addBenefit}
                        className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add benefit
                      </button>
                    </div>
                    <div className="space-y-2">
                      {productForm.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-gray-300 w-5 text-center shrink-0">{i + 1}</span>
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => updateBenefit(i, e.target.value)}
                            placeholder="Enter a benefit..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                          />
                          {productForm.benefits.length > 1 && (
                            <button
                              onClick={() => removeBenefit(i)}
                              className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- SPECS TAB ---- */}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-500">Manage the technical specifications shown on the product page.</p>

                  {/* Existing specs */}
                  {Object.entries(productForm.specs).length > 0 ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
                      {Object.entries(productForm.specs).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-gray-50/50">
                          <span className="text-xs font-medium text-gray-500 w-32 shrink-0 truncate" title={key}>{key}</span>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateSpecValue(key, e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                          />
                          <button
                            onClick={() => removeSpec(key)}
                            className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                            title="Remove spec"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-400">No specifications yet</p>
                    </div>
                  )}

                  {/* Add new spec */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-700 mb-3">Add Specification</p>
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Key</label>
                        <input
                          type="text"
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          placeholder="e.g. Purity"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 bg-white"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Value</label>
                        <input
                          type="text"
                          value={newSpecValue}
                          onChange={(e) => setNewSpecValue(e.target.value)}
                          placeholder="e.g. >99%"
                          onKeyDown={(e) => { if (e.key === 'Enter') addSpec(); }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 bg-white"
                        />
                      </div>
                      <button
                        onClick={addSpec}
                        disabled={!newSpecKey.trim()}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Quick-add common specs */}
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Quick add common specs:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Purity', 'Fill Volume', 'Dosage', 'Formulation', 'Dosing Period', 'Sterilization', 'Storage', 'Shelf Life', 'Frequency', 'Mechanism', 'Bioavailability'].map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            if (!productForm.specs[key]) {
                              setNewSpecKey(key);
                            }
                          }}
                          disabled={!!productForm.specs[key]}
                          className="px-2 py-1 text-[10px] font-medium bg-white border border-gray-200 rounded text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- IMAGES TAB ---- */}
              {activeTab === 'images' && (
                <div className="space-y-5">
                  {/* Current image preview */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Current Product Image</label>
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 flex items-center justify-center">
                      {productForm.image ? (
                        <img
                          src={productForm.image}
                          alt="Product preview"
                          className="max-h-48 object-contain"
                        />
                      ) : (
                        <div className="text-center py-8">
                          <svg className="mx-auto w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-gray-400 mt-2">No image selected</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image Path</label>
                    <input
                      type="text"
                      value={productForm.image}
                      onChange={(e) => updateForm({ image: e.target.value })}
                      placeholder="/images/products/..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                    />
                  </div>

                  {/* Image gallery picker */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Choose from library</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {IMAGE_OPTIONS.map((img) => (
                        <button
                          key={img.value}
                          onClick={() => updateForm({ image: img.value })}
                          className={`relative bg-gray-50 rounded-lg border-2 p-3 aspect-square flex items-center justify-center transition-all hover:border-orange-300 ${
                            productForm.image === img.value
                              ? 'border-orange-500 ring-2 ring-orange-200'
                              : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={img.value}
                            alt={img.label}
                            className="max-h-full max-w-full object-contain"
                          />
                          {productForm.image === img.value && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                          <span className="absolute bottom-1 left-1 right-1 text-[8px] text-gray-400 text-center truncate bg-white/80 rounded px-1">
                            {img.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-xl flex items-center justify-between">
              <div className="text-xs text-gray-400">
                {editingProduct && (
                  <span>Last updated: {new Date(editingProduct.updatedAt).toLocaleString()}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowProductModal(false)}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  disabled={saving || !productForm.name.trim()}
                  className="px-5 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
