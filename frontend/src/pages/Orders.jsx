import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/api/orders/${user.id}`);
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Could not retrieve orders. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
      <p className="text-slate-400 font-black tracking-widest text-xs">Syncing Order History...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">My Orders</h1>
        <p className="text-slate-500 font-medium">Track and manage your medicine and pharmacy orders.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-slate-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="font-bold text-slate-900 text-sm md:text-base">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="font-bold text-slate-900 text-sm md:text-base">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grand Total</p>
                      <p className="font-black text-primary-600 text-base md:text-lg">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center md:justify-end">
                      <span className={`text-[10px] font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-600 border border-green-100' :
                        order.status === 'In Transit' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-yellow-50 text-yellow-600 border border-yellow-100'
                      }`}>
                        {order.status === 'Delivered' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : order.status === 'In Transit' ? (
                          <Truck className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                        )}
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Items Ordered</p>
                  <div className="flex flex-wrap gap-2.5">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-700 text-xs font-black px-4 py-2.5 rounded-2xl border border-slate-100 flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary-500" /> 
                        {item.name} 
                        <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg ml-1">
                          x{item.quantity}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {orders.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/10">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Package className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No pharmacy orders yet</h3>
            <p className="text-slate-400 font-medium mb-6">Your pharmaceutical shopping bag history is empty.</p>
            <a href="/medicines" className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 btn-shine">
              Go to Pharmacy
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
