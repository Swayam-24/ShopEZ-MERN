import React, { useState, useEffect } from 'react';
import './Addresses.css';

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        addressLine: '',
        city: '',
        state: '',
        landmark: '',
        altPhone: '',
        addressType: 'Home'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/addresses/${userId}`);
            const data = await response.json();
            if (data.success) {
                setAddresses(data.addresses);
            }
        } catch (err) {
            console.error("Error fetching addresses:", err);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        
        // 10-digit mobile validation
        if (!formData.mobile) {
            tempErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            tempErrors.mobile = "Enter a valid 10-digit mobile number";
        }

        if (!formData.pincode) {
            tempErrors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            tempErrors.pincode = "Enter a valid 6-digit pincode";
        }

        if (!formData.locality) tempErrors.locality = "Locality is required";
        if (!formData.addressLine) tempErrors.addressLine = "Address is required";
        if (!formData.city) tempErrors.city = "City is required";
        if (!formData.state) tempErrors.state = "State is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user type
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            console.warn("User ID is missing. Please log in.");
            return;
        }

        const payload = { ...formData, userId };

        try {
            const isEditing = !!editingId;
            const url = isEditing 
                ? `${import.meta.env.VITE_API_URL_MAIN}/api/addresses/${editingId}` 
                : `${import.meta.env.VITE_API_URL_MAIN}/api/addresses`;

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.success) {
                fetchAddresses();
                handleCancel();
            } else {
                alert(`Error: ${data.message || "Could not save address"}`);
            }
        } catch (err) {
            console.error("Error saving address:", err);
            alert("Failed to connect to the server. Please check if the backend is running.");
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            name: '', mobile: '', pincode: '', locality: '', addressLine: '',
            city: '', state: '', landmark: '', altPhone: '', addressType: 'Home'
        });
        setErrors({});
    };

    const handleEdit = (addr) => {
        setFormData(addr);
        setEditingId(addr._id);
        setShowForm(true);
        setActiveMenuId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this address?")) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/addresses/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setAddresses(prev => prev.filter(a => a._id !== id));
            }
        } catch (err) {
            console.error("Error deleting address:", err);
        }
        setActiveMenuId(null);
    };

    const handleLocationClick = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    city: data.city || data.principalSubdivision || '',
                    state: data.principalSubdivision || ''
                }));
            } catch (err) {
                console.error("Error fetching location data:", err);
            }
        }, (err) => {
            console.error("Geolocation error:", err);
            alert("Unable to fetch your location. Please enter it manually.");
        });
    };

    // Click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenuId && !event.target.closest('.more-btn') && !event.target.closest('.more-menu')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
        "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
        "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];

    if (loading) return <div className="loader-container"><div className="shopez-loader"></div></div>;

    return (
        <div className="addresses-page-container">
            <h1 className="addresses-header">Manage Addresses</h1>

            {!showForm ? (
                <div className="add-address-trigger" onClick={() => setShowForm(true)}>
                    <span className="add-icon">+</span>
                    <span>ADD A NEW ADDRESS</span>
                </div>
            ) : (
                <div className="address-form-container">
                    <h2 className="form-title">{editingId ? 'EDIT ADDRESS' : 'ADD A NEW ADDRESS'}</h2>
                    <button className="location-btn" onClick={handleLocationClick}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Use my current location
                    </button>

                    <form className="address-form" onSubmit={handleSave}>
                        <div className="address-form-grid">
                            <div className="form-group">
                                <span className="floating-label">Name</span>
                                <input 
                                    type="text" name="name" 
                                    placeholder="Name"
                                    className={`form-control ${errors.name ? 'error' : ''}`}
                                    value={formData.name} onChange={handleInputChange} 
                                />
                                {errors.name && <div className="error-msg">{errors.name}</div>}
                            </div>
                            <div className="form-group">
                                <span className="floating-label">10-digit mobile number</span>
                                <input 
                                    type="text" name="mobile" 
                                    placeholder="10-digit mobile number"
                                    className={`form-control ${errors.mobile ? 'error' : ''}`}
                                    value={formData.mobile} onChange={handleInputChange} 
                                />
                                {errors.mobile && <div className="error-msg">{errors.mobile}</div>}
                            </div>
                            <div className="form-group">
                                <span className="floating-label">Pincode</span>
                                <input 
                                    type="text" name="pincode" 
                                    placeholder="Pincode"
                                    className={`form-control ${errors.pincode ? 'error' : ''}`}
                                    value={formData.pincode} onChange={handleInputChange} 
                                />
                                {errors.pincode && <div className="error-msg">{errors.pincode}</div>}
                            </div>
                            <div className="form-group">
                                <span className="floating-label">Locality</span>
                                <input 
                                    type="text" name="locality" 
                                    placeholder="Locality"
                                    className={`form-control ${errors.locality ? 'error' : ''}`}
                                    value={formData.locality} onChange={handleInputChange} 
                                />
                                {errors.locality && <div className="error-msg">{errors.locality}</div>}
                            </div>
                            <div className="form-group-full">
                                <span className="floating-label" style={{ top: '10px' }}>Address (Area and Street)</span>
                                <textarea 
                                    name="addressLine" 
                                    placeholder="Address (Area and Street)"
                                    className={`form-control ${errors.addressLine ? 'error' : ''}`}
                                    rows="4" value={formData.addressLine} onChange={handleInputChange}
                                ></textarea>
                                {errors.addressLine && <div className="error-msg">{errors.addressLine}</div>}
                            </div>
                            <div className="form-group">
                                <span className="floating-label">City/District/Town</span>
                                <input 
                                    type="text" name="city" 
                                    placeholder="City/District/Town"
                                    className={`form-control ${errors.city ? 'error' : ''}`}
                                    value={formData.city} onChange={handleInputChange} 
                                />
                                {errors.city && <div className="error-msg">{errors.city}</div>}
                            </div>
                            <div className="form-group">
                                <span className="floating-label">State</span>
                                <select 
                                    name="state" 
                                    className={`form-control ${errors.state ? 'error' : ''}`}
                                    value={formData.state} onChange={handleInputChange}
                                >
                                    <option value="" disabled>--Select State--</option>
                                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {errors.state && <div className="error-msg">{errors.state}</div>}
                            </div>
                            <div className="form-group">
                                <span className="floating-label">Landmark (Optional)</span>
                                <input 
                                    type="text" name="landmark" 
                                    placeholder="Landmark (Optional)"
                                    className="form-control"
                                    value={formData.landmark} onChange={handleInputChange} 
                                />
                            </div>
                            <div className="form-group">
                                <span className="floating-label">Alternate Phone (Optional)</span>
                                <input 
                                    type="text" name="altPhone" 
                                    placeholder="Alternate Phone (Optional)"
                                    className="form-control"
                                    value={formData.altPhone} onChange={handleInputChange} 
                                />
                            </div>
                        </div>

                        <div className="address-type-section">
                            <span className="type-label">Address Type</span>
                            <div className="radio-group">
                                <label className="radio-item">
                                    <input 
                                        type="radio" name="addressType" value="Home" 
                                        checked={formData.addressType === 'Home'} 
                                        onChange={handleInputChange} 
                                    />
                                    Home
                                </label>
                                <label className="radio-item">
                                    <input 
                                        type="radio" name="addressType" value="Work" 
                                        checked={formData.addressType === 'Work'} 
                                        onChange={handleInputChange} 
                                    />
                                    Work
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-btn">SAVE</button>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>CANCEL</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="address-list">
                {addresses.map((addr) => (
                    <div key={addr._id} className="address-card">
                        <div className="card-header">
                            <div>
                                <span className="type-tag">{addr.addressType}</span>
                                <div className="card-top-info">
                                    <span className="user-name">{addr.name}</span>
                                    <span className="user-mobile">{addr.mobile}</span>
                                </div>
                                <div className="address-details">
                                    {addr.addressLine}, {addr.locality}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <button className="more-btn" onClick={() => setActiveMenuId(activeMenuId === addr._id ? null : addr._id)}>
                                    ⋮
                                </button>
                                {activeMenuId === addr._id && (
                                    <div className="more-menu">
                                        <div className="menu-item" onClick={() => handleEdit(addr)}>Edit</div>
                                        <div className="menu-item" onClick={() => handleDelete(addr._id)}>Delete</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {addresses.length === 0 && !showForm && (
                    <div className="empty-addresses" style={{ textAlign: 'center', padding: '40px', color: '#878787' }}>
                        No saved addresses found. Click below to add one.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Addresses;
