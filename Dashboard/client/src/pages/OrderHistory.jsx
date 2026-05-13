import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const getDeliveryDate = (dateString) => {
        const orderDate = new Date(dateString);
        orderDate.setDate(orderDate.getDate() + 3);
        const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const datePart = orderDate.toLocaleDateString('en-GB', dateOptions);
        return `${datePart} 11:00 PM`; // Adding a specific time as requested
    };

    const handleCancelClick = (orderId) => {
        setSelectedOrderId(orderId);
        setShowModal(true);
    };

    const confirmCancel = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/orders/cancel/${selectedOrderId}`, {
                method: 'PUT'
            });
            const data = await response.json();
            if (data.success) {
                // Update local state instead of reloading
                setOrders(prev => prev.map(o => o._id === selectedOrderId ? { ...o, status: 'Cancelled' } : o));
            }
        } catch (err) {
            console.error('Failed to cancel order:', err);
        } finally {
            setShowModal(false);
            setSelectedOrderId(null);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrderId(null);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL_MAIN}/api/orders/user/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (err) {
                console.error('Failed to fetch orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return (
            <div className="orders-loading">
                <div className="spinner"></div>
                <p>Fetching your orders...</p>
            </div>
        );
    }

    return (
        <div className="order-history-wrapper">
            <div className="oh-header">
                <h1>My Orders</h1>
            </div>

            <div className="order-history-container">
                {orders.length === 0 ? (
                    <div className="no-orders-view">
                        <div className="empty-orders-illustration">📦</div>
                        <h2>You haven't placed any orders yet.</h2>
                        <p>When you buy items, they will appear here.</p>
                        <button className="shop-now-link" onClick={() => navigate('/')}>Start Shopping</button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-group">
                            {order.items.map((item, idx) => (
                                <div 
                                    key={`${order._id}-${idx}`} 
                                    className="order-card-refined"
                                    onClick={() => navigate(`/product/${item.productId}`, { state: { from: '/orders' } })}
                                >
                                    <div className="order-img-section">
                                        <img 
                                            src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL_MAIN}${item.image}`} 
                                            alt={item.title} 
                                        />
                                    </div>
                                    <div className="order-details-section">
                                        <h3>{item.title}</h3>
                                        <p className="order-brand">Qty: {item.quantity}</p>
                                        <p className="order-price">₹{item.price}</p>
                                        
                                        {/* Delivery Info */}
                                        {order.status !== 'Cancelled' && (
                                            <div className="delivery-info">
                                                <p className="delivery-estimate">Expected delivery by {getDeliveryDate(order.createdAt)}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="order-status-section">
                                        <div className="status-indicator">
                                            <div className="dot" style={{ backgroundColor: order.status === 'Cancelled' ? '#ff4d4d' : '#26a541' }}></div>
                                            <span className="status-text">{order.status}</span>
                                        </div>
                                        <p className="ordered-date-label">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        
                                        {/* Cancel Button */}
                                        {order.status !== 'Cancelled' && (
                                            <button 
                                                className="cancel-btn-refined" 
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents navigating to product detail
                                                    handleCancelClick(order._id);
                                                }}
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>

            {/* Cancellation Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-cross" onClick={closeModal}>&times;</button>
                        <h2>Would you like to Cancel Your Order?</h2>
                        <div className="modal-actions">
                            <button className="modal-btn yes" onClick={confirmCancel}>Yes</button>
                            <button className="modal-btn no" onClick={closeModal}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
