const API_BASE = '/api/v1';

const getAuthHeaders = (extraHeaders = {}) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('phonoworld_token') : null;
    return {
      ...extraHeaders,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  } catch {
    return extraHeaders;
  }
};

export const api = {
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    const res = await fetch(`${API_BASE}/products?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductBySlug(slug) {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch product: ${slug}`);
    return res.json();
  },

  async getBrands() {
    const res = await fetch(`${API_BASE}/brands`);
    if (!res.ok) throw new Error('Failed to fetch brands');
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getComparison(slugs = []) {
    if (!slugs.length) return { data: [], count: 0 };
    const res = await fetch(`${API_BASE}/compare?slugs=${slugs.join(',')}`);
    if (!res.ok) throw new Error('Failed to fetch comparison');
    return res.json();
  },

  async search(query = '') {
    if (!query) return { data: [], count: 0 };
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search');
    return res.json();
  },

  async getRecommendations(criteria = {}) {
    const res = await fetch(`${API_BASE}/recommendations/wizard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria)
    });
    if (!res.ok) throw new Error('Failed to generate recommendations');
    return res.json();
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to fetch admin stats');
    }
    return res.json();
  },

  async previewNormalization(payload) {
    const res = await fetch(`${API_BASE}/admin/preview`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to generate normalization preview');
    }
    return res.json();
  },

  async createProduct(payload) {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create product');
    return json;
  },

  async updateProduct(id, payload) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update product');
    return json;
  },

  async overrideFestivePrice(payload) {
    const res = await fetch(`${API_BASE}/admin/override-price`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to apply price override');
    return json;
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to delete product');
    return json;
  },

  async getSyncStatus() {
    const res = await fetch(`${API_BASE}/admin/sync/status`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to fetch sync status');
    }
    return res.json();
  },

  async triggerPriceSync() {
    const res = await fetch(`${API_BASE}/admin/sync/trigger`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to trigger price sync');
    return json;
  },

  async resetSyncPrices() {
    const res = await fetch(`${API_BASE}/admin/sync/reset`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to reset canonical prices');
    return json;
  },

  async getSyncLogs() {
    const res = await fetch(`${API_BASE}/admin/sync/logs`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to fetch sync logs');
    }
    return res.json();
  },

  async testPaapi(asin) {
    const res = await fetch(`${API_BASE}/admin/sync/test-paapi`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ asin })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to test Amazon PA-API');
    return json;
  },

  async testScraper(url, retailer) {
    const res = await fetch(`${API_BASE}/admin/sync/test-scraper`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ url, retailer })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to test scraper');
    return json;
  },

  async getCacheStats() {
    const res = await fetch(`${API_BASE}/admin/cache/stats`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to fetch cache stats');
    }
    return res.json();
  },

  async clearCache() {
    const res = await fetch(`${API_BASE}/admin/cache/clear`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to clear cache');
    return json;
  }
};

