import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/dashboard.css";
import Sidebar from "../../components/Sidebar";
import productAPI from "../../services/productApi";
import orderAPI from "../../services/orderApi";
import authAPI from "../../services/authApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    if (!authAPI.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const currentUser = authAPI.getCurrentUser();
    setAdmin(currentUser);

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsData = await productAPI.getAllProducts();
        setProducts(productsData || []);

        let ordersData = [];

        // Fetch orders (if backend has this endpoint)
        try {
          ordersData = await orderAPI.getAllOrders();
          setOrders(ordersData || []);
        } catch (e) {
          // If orders endpoint doesn't exist, use empty array
          console.log("Orders endpoint not available yet");
          setOrders([]);
        }

        // Calculate statistics
        const totalProducts = (productsData || []).length;
        const totalRevenue = (productsData || []).reduce(
          (sum, p) => sum + (p.product_price * p.product_stock || p.price * p.stock || 0),
          0
        );

        setStats({
          totalRevenue: totalRevenue.toFixed(2),
          totalOrders: (ordersData || []).length || 0,
          totalProducts,
          totalCustomers: 0, // Would need separate API call
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    authAPI.logout();
    navigate("/login");
  };

  if (!admin) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <header className="dashboard-header">
          <input type="text" placeholder="Search anything..." />
          <div
            className="profile-info"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e5e7eb",
              }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
              </svg>
            </span>
            <span>{admin?.name || "Admin"}</span>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: 8,
                background: "#f3f4f6",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                color: "#ef4444",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#fee2e2")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="overview">
          <div className="card green">
            <p>Total Revenue</p>
            <h3>${stats.totalRevenue}</h3>
            <span>+12.5%</span>
          </div>
          <div className="card blue">
            <p>Orders</p>
            <h3>{stats.totalOrders}</h3>
            <span>+8.2%</span>
          </div>
          <div className="card purple">
            <p>Products</p>
            <h3>{stats.totalProducts}</h3>
            <span>+1.1%</span>
          </div>
          <div className="card orange">
            <p>Customers</p>
            <h3>{stats.totalCustomers}</h3>
            <span>-1.0%</span>
          </div>
        </section>

        <section className="details">
          <div className="orders">
            <h4>Recent Orders</h4>
            <ul>
              {orders.length === 0 ? (
                <li>No orders yet</li>
              ) : (
                orders.slice(0, 4).map((order, idx) => (
                  <li key={idx}>
                    #{order.id || `ORD-${idx + 1}`} - {order.customer_name || "Customer"} - ${order.total || "0"} -{" "}
                    <span className="status pending">{order.status || "Pending"}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="products">
            <h4>Top Products</h4>
            <ul>
              {products.length === 0 ? (
                <li>No products added yet</li>
              ) : (
                products.slice(0, 3).map((product, idx) => (
                  <li key={idx}>
                    {product.product_name || product.name} - $
                    {(product.product_price * product.product_stock || product.price * product.stock || 0).toFixed(2)}{" "}
                    ({product.product_stock || product.stock || 0} in stock)
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
