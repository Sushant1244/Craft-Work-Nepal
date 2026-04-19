import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Package, ShoppingCart, Boxes, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <div className="logo">🎨 CraftWork</div>
      <nav>
        <ul>
          <li className="nav-item" onClick={() => navigate("/dashboard")}>
            <Layout size={20} />
            <span>Dashboard</span>
          </li>

          <li className="nav-item" onClick={() => navigate("/product")}>
            <Package size={20} />
            <span>Products</span>
          </li>
          <li className="nav-item" onClick={() => navigate("/Orders")}>
            <ShoppingCart size={20} />
            <span>Orders</span>
          </li>
          <li className="nav-item" onClick={() => navigate("/inventory")}>
            <Boxes size={20} />
            <span>Inventory</span>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
