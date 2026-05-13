import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('Home');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    image: '',
    img1: '',
    img2: '',
    img3: '',
    category: 'Mobiles',
    gender: 'Unisex'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        images: [formData.img1, formData.img2, formData.img3].filter(url => url)
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (data.success) {
        alert('Product added successfully!');
        setFormData({
          title: '', description: '', price: '', brand: '',
          image: '', img1: '', img2: '', img3: '',
          category: 'Mobiles', gender: 'Unisex'
        });
        fetchStats();
        fetchProducts();
      } else {
        alert(data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBanner();
    fetchOrders();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentView === 'Users') {
      fetchUsers();
    }
  }, [currentView]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_AUTH}/auth/admin/users`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/products`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/orders`);
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const userRes = await fetch(`${import.meta.env.VITE_API_URL_AUTH}/auth/admin/stats`);
      const userData = await userRes.json();
      const mainRes = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/stats`);
      const mainData = await mainRes.json();
      
      setStats({
        users: userData.count || 0,
        products: mainData.stats?.totalProducts || 0,
        orders: mainData.stats?.totalOrders || 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanner = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/banner`);
      const data = await res.json();
      if (data.success) setBannerUrl(data.url);
    } catch (err) {
      console.error('Error fetching banner:', err);
    }
  };

  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/banner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: bannerUrl })
      });
      const data = await res.json();
      if (data.success) alert('Banner updated successfully!');
      else alert('Failed to update banner');
    } catch (err) {
      console.error('Error updating banner:', err);
      alert('Something went wrong');
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert('Order status updated!');
        fetchOrders();
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        alert('Product deleted successfully');
        fetchProducts();
        fetchStats();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const renderHome = () => (
    <>
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total users</h3>
          <span className="stats-count">{stats.users}</span>
          <button className="admin-btn" onClick={() => setCurrentView('Users')}>View all</button>
        </div>
        <div className="stats-card">
          <h3>All Products</h3>
          <span className="stats-count">{stats.products}</span>
          <button className="admin-btn" onClick={() => setCurrentView('Products')}>View all</button>
        </div>
        <div className="stats-card">
          <h3>All Orders</h3>
          <span className="stats-count">{stats.orders}</span>
          <button className="admin-btn" onClick={() => setCurrentView('Orders')}>View all</button>
        </div>
        <div className="stats-card">
          <h3>Add Product</h3>
          <span className="stats-count">(new)</span>
          <button className="admin-btn" onClick={() => setCurrentView('New Product')}>Add now</button>
        </div>
      </div>

      <section className="banner-section">
        <h3>Update banner</h3>
        <form className="banner-form" onSubmit={handleUpdateBanner}>
          <input 
            type="text" 
            className="banner-input" 
            placeholder="Banner url" 
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
          />
          <button type="submit" className="admin-btn">Update</button>
        </form>
      </section>
    </>
  );

  const renderOrders = () => (
    <div className="orders-container">
      <h2 style={{ color: '#a0a0a0', fontWeight: '400', marginBottom: '30px' }}>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <img 
              src={order.items[0]?.image?.startsWith('http') ? order.items[0]?.image : `${import.meta.env.VITE_API_URL_MAIN}${order.items[0]?.image || ''}`} 
              alt={order.items[0]?.title} 
              className="order-product-image"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; e.target.onerror = null; }}
            />
            <div className="order-details">
              <h3 className="order-title">{order.items[0]?.title}</h3>
              <p className="order-desc">Professional and high quality item for your daily needs.</p>
              
              <div className="order-info-grid">
                <div className="info-item">Size: <span>M</span></div>
                <div className="info-item">Quantity: <span>{order.items[0]?.quantity}</span></div>
                <div className="info-item">Price: <span>₹ {order.items[0]?.price}</span></div>
                <div className="info-item">Payment method: <span>{order.paymentMethod}</span></div>
              </div>

              <div className="order-info-grid" style={{ marginTop: '15px' }}>
                <div className="info-item">UserId: <span style={{ fontSize: '0.8rem' }}>{order.userId}</span></div>
                <div className="info-item">Name: <span>{order.address?.name}</span></div>
                <div className="info-item">Email: <span>{order.address?.name?.toLowerCase().replace(' ', '') || 'user'}@gmail.com</span></div>
                <div className="info-item">Mobile: <span>{order.address?.mobile}</span></div>
              </div>

              <div className="order-info-grid" style={{ marginTop: '15px' }}>
                <div className="info-item">Ordered on: <span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                <div className="info-item">Address: <span>{order.address?.city}</span></div>
                <div className="info-item">Pincode: <span>{order.address?.pincode}</span></div>
              </div>

              <div className="status-row">
                <div className="status-text">Order status: <span style={{ color: order.status === 'Cancelled' ? '#f44336' : (order.status === 'Delivered' ? '#4caf50' : '#ff9800') }}>{order.status}</span></div>
                <select 
                  className="status-select" 
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Update order status</option>
                  <option value="In-transit">In-transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Shipped">Shipped</option>
                </select>
                <div className="order-actions">
                  <button className="admin-btn cancel-btn" onClick={() => handleUpdateStatus(order._id, 'Cancelled')}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="users-container">
      <h2 style={{ color: '#a0a0a0', fontWeight: '400', marginBottom: '30px' }}>All Registered Users</h2>
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Joined Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className={`badge ${user.userType}`}>{user.userType}</span></td>
                <td>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
                <td><span className="status-dot"></span> Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products-view-layout">
      <aside className="filter-sidebar">
        <h3>Filters</h3>
        <div className="filter-group">
          <h4>Sort By</h4>
          <label className="filter-option"><input type="radio" name="sort" defaultChecked /> Popularity</label>
          <label className="filter-option"><input type="radio" name="sort" /> Price (low to high)</label>
          <label className="filter-option"><input type="radio" name="sort" /> Price (high to low)</label>
          <label className="filter-option"><input type="radio" name="sort" /> Discount</label>
        </div>
        <div className="filter-group">
          <h4>Categories</h4>
          <label className="filter-option"><input type="checkbox" /> Mobiles</label>
          <label className="filter-option"><input type="checkbox" /> Electronics</label>
          <label className="filter-option"><input type="checkbox" /> Sports-Equipment</label>
          <label className="filter-option"><input type="checkbox" /> Fashion</label>
          <label className="filter-option"><input type="checkbox" /> Groceries</label>
        </div>
        <div className="filter-group">
          <h4>Gender</h4>
          <label className="filter-option"><input type="checkbox" /> Men</label>
          <label className="filter-option"><input type="checkbox" /> Women</label>
          <label className="filter-option"><input type="checkbox" /> Unisex</label>
        </div>
      </aside>

      <section className="products-grid-container">
        <h2 style={{ color: '#a0a0a0', fontWeight: '400', marginBottom: '30px' }}>All Products</h2>
        <div className="admin-products-grid">
          {products.map((product) => (
            <div key={product._id} className="admin-product-card">
               <div className="product-img-wrap">
                <img 
                  src={product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL_MAIN}${product.image || ''}`} 
                  alt={product.title} 
                />
              </div>
              <div className="product-info">
                <h4>{product.title}</h4>
                <p className="product-subtitle">{product.description?.substring(0, 50)}...</p>
                <div className="product-price-row">
                  <span className="new-price">₹ {product.price}</span>
                  <span className="old-price">₹ {product.originalPrice || product.price * 1.5}</span>
                  <span className="discount-tag">35% off</span>
                </div>
                <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="admin-btn" style={{ flex: 1, borderColor: '#ff9800' }}>Update</button>
                  <button 
                    className="admin-btn cancel-btn" 
                    style={{ flex: 1 }}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderNewProduct = () => (
    <div className="new-product-container">
      <div className="new-product-card">
        <h2>New Product</h2>
        <form onSubmit={handleProductSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <input 
                type="text" name="title" className="form-input" placeholder="Product name" 
                value={formData.title} onChange={handleInputChange} required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" name="description" className="form-input" placeholder="Product Description" 
                value={formData.description} onChange={handleInputChange} 
              />
            </div>
            <div className="form-group full-width">
              <input 
                type="text" name="image" className="form-input" placeholder="Thumbnail Img url" 
                value={formData.image} onChange={handleInputChange} required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" name="img1" className="form-input" placeholder="Add on img1 url" 
                value={formData.img1} onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" name="img2" className="form-input" placeholder="Add on img2 url" 
                value={formData.img2} onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" name="img3" className="form-input" placeholder="Add on img3 url" 
                value={formData.img3} onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <input 
                type="number" name="price" className="form-input" placeholder="Price (₹)" 
                value={formData.price} onChange={handleInputChange} required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" name="brand" className="form-input" placeholder="Brand Name" 
                value={formData.brand} onChange={handleInputChange} required 
              />
            </div>
          </div>

          <div className="options-section">
            <h4>Category</h4>
            <select 
              name="category" 
              className="form-input" 
              value={formData.category} 
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', background: '#2d2d2d', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
            >
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Sports-Equipment">Sports-Equipment</option>
              <option value="Fashion">Fashion</option>
              <option value="Groceries">Groceries</option>
            </select>
          </div>

          <div className="options-section">
            <h4>Gender</h4>
            <div className="checkbox-group">
              {['Men', 'Women', 'Unisex'].map(g => (
                <label key={g} className="checkbox-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    value={g} 
                    checked={formData.gender === g}
                    onChange={handleInputChange}
                  /> {g}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="add-product-btn">Add product</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-logo">ShopEZ (admin)</div>
        <nav className="admin-nav">
          <a href="#" className={currentView === 'Home' ? 'active' : ''} onClick={() => {setCurrentView('Home'); fetchStats();}}>Home</a>
          <a href="#" className={currentView === 'Users' ? 'active' : ''} onClick={() => setCurrentView('Users')}>Users</a>
          <a href="#" className={currentView === 'Orders' ? 'active' : ''} onClick={() => setCurrentView('Orders')}>Orders</a>
          <a href="#" className={currentView === 'Products' ? 'active' : ''} onClick={() => setCurrentView('Products')}>Products</a>
          <a href="#" className={currentView === 'New Product' ? 'active' : ''} onClick={() => setCurrentView('New Product')}>New Product</a>
          <a href="#" onClick={() => window.location.href = '/'}>Logout</a>
        </nav>
      </header>

      <main className="dashboard-content" style={{ maxWidth: currentView === 'Products' ? '1400px' : '1200px' }}>
        {currentView === 'Home' && renderHome()}
        {currentView === 'Users' && renderUsers()}
        {currentView === 'Orders' && renderOrders()}
        {currentView === 'Products' && renderProducts()}
        {currentView === 'New Product' && renderNewProduct()}
        {(currentView !== 'Home' && currentView !== 'Users' && currentView !== 'Orders' && currentView !== 'Products' && currentView !== 'New Product') && (
          <div style={{ textAlign: 'center', padding: '100px', color: '#666' }}>
            <h2>{currentView} View</h2>
            <p>Coming Soon...</p>
            <button className="admin-btn" onClick={() => setCurrentView('Home')}>Back to Home</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
