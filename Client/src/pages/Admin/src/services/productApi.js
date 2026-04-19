import apiClient from "./apiClient";

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await apiClient.get("/product");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryName) => {
    try {
      const response = await apiClient.get(`/product/categories/${categoryName}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add new product (upload with image)
  uploadProduct: async (formData) => {
    try {
      const response = await apiClient.post("/product/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add product without image
  addProduct: async (productData) => {
    try {
      const response = await apiClient.post("/product", productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await apiClient.put(`/product/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/product/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await apiClient.get("/product/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Keep old function names for backward compatibility
export const uploadProduct = productAPI.uploadProduct;
export const getAllProducts = productAPI.getAllProducts;
export const deleteProduct = productAPI.deleteProduct;

export default productAPI;
