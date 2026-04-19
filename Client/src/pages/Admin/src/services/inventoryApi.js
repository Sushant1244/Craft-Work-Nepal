import apiClient from "./apiClient";

export const inventoryAPI = {
  // Get all inventory
  getAllInventory: async () => {
    try {
      const response = await apiClient.get("/inventory");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get inventory by product ID
  getInventoryByProduct: async (productId) => {
    try {
      const response = await apiClient.get(`/inventory/product/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update inventory/stock
  updateStock: async (productId, quantity) => {
    try {
      const response = await apiClient.put(`/inventory/${productId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get low stock items
  getLowStockItems: async (threshold = 10) => {
    try {
      const response = await apiClient.get(`/inventory/low-stock/${threshold}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get inventory statistics
  getInventoryStats: async () => {
    try {
      const response = await apiClient.get("/inventory/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default inventoryAPI;
