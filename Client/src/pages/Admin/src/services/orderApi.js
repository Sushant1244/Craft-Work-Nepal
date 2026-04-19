import apiClient from "./apiClient";

export const orderAPI = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await apiClient.get("/orders");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get orders by status
  getOrdersByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/orders/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      const response = await apiClient.put(`/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get order statistics
  getOrderStats: async () => {
    try {
      const response = await apiClient.get("/orders/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default orderAPI;
