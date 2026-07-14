import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ShoppingCart, ShoppingBag, Eye, Heart, Check, Plus, Minus, Download } from 'lucide-react';

interface StoreModuleProps {
  onBack: () => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  description: string;
  image: string;
}

export const StoreModule: React.FC<StoreModuleProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'shop' | 'history'>('shop');
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  
  const [orders, setOrders] = useState([
    { id: 'ORD-8931', date: '04 Jul 2026', total: '₹2,800', items: 'Uniform — Winter Set x1', status: 'Delivered' },
    { id: 'ORD-8812', date: '15 Jun 2026', total: '₹620', items: 'Geometry Set x1, Science Notebook x2', status: 'Delivered' }
  ]);

  const products: Product[] = [
    { id: 1, name: 'Premium School Blazer', category: 'Uniform', price: 1800, stock: 15, rating: 4.8, description: 'Wool-blend navy school blazer with official emblem patch.', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=200' },
    { id: 2, name: 'Summer Cotton Shirt (White)', category: 'Uniform', price: 450, stock: 40, rating: 4.5, description: 'Breathable 100% cotton half-sleeve shirt for daily wear.', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200' },
    { id: 3, name: 'Science Laboratory Notebook', category: 'Books', price: 120, stock: 85, rating: 4.2, description: 'Rule-lined journal with metric graph grids for science labs.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=200' },
    { id: 4, name: 'Leather School Shoes (Black)', category: 'Shoes', price: 950, stock: 8, rating: 4.6, description: 'Genuine leather school shoes with slip-resistant rubber soles.', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200' },
    { id: 5, name: 'Official School Backpack', category: 'Bags', price: 850, stock: 20, rating: 4.7, description: 'Water-resistant multi-compartment school bag with padded shoulders.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200' },
    { id: 6, name: 'Leather Basketball (Size 7)', category: 'Sports', price: 750, stock: 6, rating: 4.9, description: 'High-grip composite leather basketball for indoor/outdoor courts.', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200' }
  ];

  const categories = ['All', 'Uniform', 'Books', 'Shoes', 'Bags', 'Sports'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
    alert(`Added "${product.name}" to cart!`);
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    }).filter(Boolean) as any);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
      const totalStr = `₹${getCartTotal().toLocaleString()}`;
      const itemsStr = cart.map(i => `${i.product.name} x${i.qty}`).join(', ');
      
      setOrders(prev => [
        { id: orderId, date: 'Today', total: totalStr, items: itemsStr, status: 'Processing' },
        ...prev
      ]);
      setCart([]);
      setCheckoutComplete(false);
      setShowCartOverlay(false);
      alert('Order successfully placed! You can track shipping logs in the Order History tab.');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header system */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button 
            onClick={onBack} 
            style={{ 
              background: 'none', border: 'none', color: '#10B981', fontWeight: 600, 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginBottom: '8px'
            }}
          >
            ← Back to Services
          </button>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Co-operative School Store
          </h2>
        </div>

        {/* Tab triggers */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
            <button 
              onClick={() => setActiveTab('shop')}
              style={{
                padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
                background: activeTab === 'shop' ? 'var(--surface-color)' : 'transparent',
                color: activeTab === 'shop' ? 'var(--text-main)' : 'var(--text-light)',
                cursor: 'pointer'
              }}
            >
              Shop Catalog
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              style={{
                padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
                background: activeTab === 'history' ? 'var(--surface-color)' : 'transparent',
                color: activeTab === 'history' ? 'var(--text-main)' : 'var(--text-light)',
                cursor: 'pointer'
              }}
            >
              Order History
            </button>
          </div>

          {/* Cart Icon trigger */}
          <button 
            onClick={() => setShowCartOverlay(true)}
            style={{
              background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px',
              padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)'
            }}
          >
            <ShoppingCart size={16} color="var(--primary-color)" /> Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
          </button>
        </div>
      </div>

      {activeTab === 'shop' ? (
        /* Catalog View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Category Scroller */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600,
                  border: '1px solid var(--border-color)', cursor: 'pointer',
                  background: activeCategory === cat ? 'var(--primary-color)' : 'var(--surface-color)',
                  color: activeCategory === cat ? 'white' : 'var(--text-muted)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {filteredProducts.map(prod => (
              <Card key={prod.id} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--surface-color)' }}>
                {/* Image block */}
                <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                  <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px', fontSize: '0.68rem', fontWeight: 700,
                    background: prod.stock > 10 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: prod.stock > 10 ? '#10B981' : '#EF4444', padding: '2px 8px', borderRadius: '4px'
                  }}>
                    {prod.stock > 10 ? 'In Stock' : `Low Stock: ${prod.stock}`}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>{prod.category}</span>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{prod.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)', lineHeight: 1.4 }}>{prod.description}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>₹{prod.price}</strong>
                  <button 
                    onClick={() => addToCart(prod)}
                    style={{
                      background: '#10B981', color: 'white', border: 'none', borderRadius: '8px',
                      padding: '6px 14px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}
                  >
                    <ShoppingBag size={12} /> Buy Now
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Order History View */
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Store Orders & Shipments</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Purchased Items</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Total Price</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Tracking Status</th>
                <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 8px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-main)' }}>{order.id}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-light)' }}>{order.date}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-muted)' }}>{order.items}</td>
                  <td style={{ padding: '14px 8px', fontWeight: 700 }}>{order.total}</td>
                  <td style={{ padding: '14px 8px' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                      background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      color: order.status === 'Delivered' ? '#10B981' : '#D97706'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                    <button 
                      onClick={() => alert(`Downloading Invoice for ${order.id}`)}
                      style={{ background: 'none', border: 'none', color: '#10B981', cursor: 'pointer', padding: '4px' }}
                      title="Download Store Invoice"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Cart Dialog Overlay */}
      {showCartOverlay && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
        }}>
          <Card style={{ width: '400px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingCart size={18} color="var(--primary-color)" /> Shopping Cart
              </h3>
              <button onClick={() => setShowCartOverlay(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>

            {checkoutComplete ? (
              <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.08)',
                  color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Check size={32} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700 }}>Order Placed</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Simulating secure transaction processing...</span>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                Your shopping cart is currently empty.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.product.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <img src={item.product.image} alt={item.product.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>₹{item.product.price}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button onClick={() => updateCartQty(item.product.id, -1)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer' }}><Minus size={10} /></button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => updateCartQty(item.product.id, 1)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer' }}><Plus size={10} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '0.9rem', fontWeight: 700 }}>
                  <span>Total Amount:</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  style={{
                    background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                    padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
                  }}
                >
                  Confirm Order & Checkout
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
