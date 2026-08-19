const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

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

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
}

export async function getProducts(filters = {}) {
  try {
    const params = new URLSearchParams();

    if (filters.category_slug) {
      params.append("category_slug", filters.category_slug);
    }

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.min_price) {
      params.append("min_price", filters.min_price);
    }

    if (filters.max_price) {
      params.append("max_price", filters.max_price);
    }

    if (filters.sort_by) {
      params.append("sort_by", filters.sort_by);
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";

    const res = await fetch(`${API_BASE_URL}/products/${queryString}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();

    return data.map(formatProduct);
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }

      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const data = await res.json();

    return formatProduct(data);
  } catch (error) {
    console.error("getProductBySlug error:", error);
    return null;
  }
}

export async function sendContactInquiry(formData) {
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
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to submit contact inquiry");
  }

  return await res.json();
}

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
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Invalid email or password");
  }

  const data = await res.json();

  if (data.access_token) {
    localStorage.setItem("admin_token", data.access_token);
  }

  return data;
}

export async function fetchProducts() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/products/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
}

export async function updateProduct(productId, productData) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to update product");
  }

  return await res.json();
}

export async function fetchAdminCategories() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/categories/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to fetch categories");
  }

  return await res.json();
}

export async function createProduct(productData) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to create product");
  }

  return await res.json();
}

export async function deleteProduct(productId) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to delete product");
  }

  return true;
}

export async function fetchDashboardStats() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to fetch dashboard statistics");
  }

  return await res.json();
}

export async function fetchOrders() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/orders/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to fetch orders");
  }

  return await res.json();
}

export async function updateOrderStatus(orderId, status) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to update order status");
  }

  return await res.json();
}

export async function updatePaymentStatus(orderId, payment_status) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/orders/${orderId}/payment-status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ payment_status }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to update payment status");
  }

  return await res.json();
}

export async function fetchUsers() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to fetch users");
  }

  return await res.json();
}

export async function updateUserStatus(userId, is_active) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_active }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to update user status");
  }

  return await res.json();
}

export async function fetchContactInquiries() {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${API_BASE_URL}/contact-inquiries/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to fetch contact messages");
  }

  return await res.json();
}

export async function updateContactInquiryStatus(inquiryId, status) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(
    `${API_BASE_URL}/contact-inquiries/${inquiryId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to update message status");
  }

  return await res.json();
}

export async function createOrder(orderData) {
  const res = await fetch(`${API_BASE_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(errorData.detail || "Failed to place your order");
  }

  return await res.json();
}

export async function trackOrder(orderData) {
  const res = await fetch(`${API_BASE_URL}/orders/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Order not found");
  }

  return await res.json();
}
