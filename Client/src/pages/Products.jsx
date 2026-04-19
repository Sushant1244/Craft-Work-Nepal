import { useState, useEffect } from "react";
import { ShoppingCart, Search, Loader } from "lucide-react";
import axios from "axios";
import "../styles/products.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:4000";

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { name: "all", label: "All Products" },
    { name: "wooden", label: "Wooden Crafts" },
    { name: "handmade", label: "Handmade" },
    { name: "traditional", label: "Traditional" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/product`);
      const rawProducts = Array.isArray(response.data) ? response.data : [];
      const normalized = rawProducts.map((p) => ({
        ...p,
        product_name: p.product_name || p.name || "Unnamed Product",
        category:
          typeof p.category === "string"
            ? p.category.toLowerCase()
            : p.category_name || "",
        imageUrl: p.imageUrl
          ? p.imageUrl.startsWith("http")
            ? p.imageUrl
            : `${BACKEND_ORIGIN}${p.imageUrl}`
          : null,
      }));

      setProducts(normalized);
      setFilteredProducts(normalized);
      setError(null);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === selectedCategory,
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    // Show a brief feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Added! ✓";
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  };

  return (
    <div className="products-page">
      <section className="products-header">
        <h1>Our Products</h1>
        <p>Discover our collection of authentic handmade crafts from Nepal</p>
      </section>

      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <div className="search-input-wrapper">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className={`filter-btn ${selectedCategory === cat.name ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.name)}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-info">
            <p>
              Products found: <strong>{filteredProducts.length}</strong>
            </p>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          {loading ? (
            <div className="loading-state">
              <Loader size={48} className="spinner" />
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchProducts} className="retry-btn">
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products found</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="reset-btn">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.product_name}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">No Image</div>
                    )}
                    <span className="category-badge">{product.category}</span>
                  </div>

                  <div className="product-info">
                    <h3>{product.product_name}</h3>
                    <p className="description">
                      {product.description || "No description available"}
                    </p>

                    <div className="product-footer">
                      <div className="price-section">
                        <span className="price">
                          NPR {product.price || "0"}
                        </span>
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}>
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
