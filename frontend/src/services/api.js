const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

/**
 * Backend Product object ko Frontend format ke mutabiq adapt / format karta hai.
 */
export function formatProduct(item) {
  if (!item) return null;

  const imagesList =
    item.images && item.images.length > 0
      ? item.images.map((img) => img.image_url)
      : [item.primary_image_url];

  return {
    id: item.slug || String(item.id),
    numericId: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category ? item.category.name : "Furniture",
    categorySlug: item.category ? item.category.slug : "",
    href: `/products/${item.slug}`,
    image: item.primary_image_url,
    images: imagesList,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : null,
    rating: Number(item.rating) || 0,
    reviews: item.review_count || 0,
    description: item.description,
  };
}

/**
 * 1. Categories Fetch Karna (GET /api/v1/categories/)
 */
export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`);
    if (!res.ok)
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
}

/**
 * 2. Products List Fetch Karna with Filters (GET /api/v1/products/)
 */
export async function getProducts(filters = {}) {
  try {
    const params = new URLSearchParams();

    if (filters.category_slug)
      params.append("category_slug", filters.category_slug);
    if (filters.search) params.append("search", filters.search);
    if (filters.min_price) params.append("min_price", filters.min_price);
    if (filters.max_price) params.append("max_price", filters.max_price);
    if (filters.sort_by) params.append("sort_by", filters.sort_by);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${API_BASE_URL}/products/${queryString}`);

    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
    const data = await res.json();
    return data.map(formatProduct);
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

/**
 * 3. Single Product Fetch Karna by Slug (GET /api/v1/products/slug/{slug})
 */
export async function getProductBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }
    const data = await res.json();
    return formatProduct(data);
  } catch (error) {
    console.error("getProductBySlug error:", error);
    return null;
  }
}

/**
 * 4. Contact Message Submit Karna (POST /api/v1/contact-inquiries/)
 */
export async function sendContactInquiry(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact-inquiries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Failed to submit contact inquiry");
    }

    return await res.json();
  } catch (error) {
    console.error("sendContactInquiry error:", error);
    throw error;
  }
}

/**
 * 5. Admin Login (POST /api/v1/auth/login)
 */
export async function adminLogin(email, password) {
  const formData = new URLSearchParams();
  formData.append("username", email.trim().toLowerCase());
  formData.append("password", password);

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Invalid email or password");
  }

  const data = await res.json();
  if (data.access_token) {
    localStorage.setItem("admin_token", data.access_token);
  }
  return data;
}
