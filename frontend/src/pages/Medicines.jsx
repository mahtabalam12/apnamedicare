import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Filter, Tag, Loader2, Plus, Minus, Trash, CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/common/BackButton';
import { API_URL } from '../config';

const categories = ['All', 'Vitamins', 'Pain Relief', 'Cold & Flu', 'Antibiotics', 'Digestive Health', 'Allergy'];

const Medicines = () => {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${API_URL}/api/medicines`);
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const addToCart = (med) => {
    const existing = cart.find(item => item.id === med.id);
    if (existing) {
      setCart(cart.map(item => item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...med, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Pricing math
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountTotal = cart.reduce((acc, item) => acc + (item.discount ? (item.price * (item.discount / 100) * item.quantity) : 0), 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.00;
  const grandTotal = subtotal - discountTotal + shipping;
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (cart.length === 0) return;

    setCheckoutLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: cart.map(item => ({
            medicineId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          totalAmount: grandTotal
        })
      });

      if (response.ok) {
        setCart([]);
        setIsCartOpen(false);
        setOrderStatus({ show: true, message: 'Order placed successfully!' });
        setTimeout(() => setOrderStatus({ show: false, message: '' }), 3000);
      } else {
        throw new Error('Failed to complete order');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout error. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const filteredMedicines = medicines.filter(med => {
    const matchCategory = activeCategory === 'All' || med.category === activeCategory;
    const matchSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 pt-32 relative overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-8">
          <BackButton to="/" label="Home" />
        </div>
        
        {/* Order Success Toast */}
        <AnimatePresence>
          {orderStatus.show && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-slate-700"
            >
              <div className="bg-primary-600 p-2 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="font-black text-sm">{orderStatus.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Modern <span className="text-primary-600">Pharmacy</span> Store
            </h1>
            <p className="text-slate-500 font-medium">Get genuine medicines delivered to your doorstep within 24 hours. Safe, fast, and reliable.</p>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsCartOpen(true)}
               className="relative group cursor-pointer bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-lg shadow-slate-200/50 hover:border-primary-200 transition-all outline-none"
             >
                <ShoppingBag className="w-6 h-6 text-slate-900 group-hover:text-primary-600" />
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-white">
                  {cartTotalItems}
                </span>
             </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/20">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3.5 rounded-2xl text-sm font-black text-left transition-all flex items-center justify-between group ${
                      activeCategory === category 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {category}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${activeCategory === category ? 'bg-white' : 'bg-transparent group-hover:bg-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
             <div className="relative mb-8">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search for medicines, vitamins, or brands..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-slate-100 focus:border-primary-500 rounded-3xl py-5 pl-14 pr-6 outline-none font-bold text-slate-700 transition-all shadow-xl shadow-slate-200/30"
                />
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Loading Catalog...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMedicines.map((med, index) => (
                    <motion.div
                      key={med.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white rounded-[32px] border border-slate-100 overflow-hidden card-hover flex flex-col group"
                    >
                      <div className="relative h-56 bg-slate-50 p-8 flex items-center justify-center overflow-hidden">
                        {med.discount && (
                          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 z-10 shadow-lg shadow-red-200">
                            <Tag className="w-3 h-3" />
                            {med.discount}% OFF
                          </div>
                        )}
                        <img src={med.image} alt={med.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-all" />
                      </div>
                      
                      <div className="p-7 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] text-primary-600 uppercase tracking-widest font-black">{med.category}</p>
                          <div className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            {med.rating}
                          </div>
                        </div>
                        
                        <h3 className="font-black text-xl text-slate-900 mb-6 leading-tight group-hover:text-primary-600 transition-colors">{med.name}</h3>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex flex-col">
                            {med.discount && (
                              <span className="text-xs text-slate-400 font-bold line-through">₹{(med.price / (1 - med.discount/100)).toFixed(2)}</span>
                            )}
                            <span className="text-2xl font-black text-slate-900">₹{med.price.toFixed(2)}</span>
                          </div>
                          
                          <div className="flex gap-2">
                             <button 
                               onClick={() => { addToCart(med); setIsCartOpen(true); }}
                               className="bg-slate-100 text-slate-600 hover:bg-slate-200 w-12 h-12 rounded-2xl flex items-center justify-center transition-all outline-none"
                             >
                               <Plus className="w-5 h-5" />
                             </button>
                             <button 
                               onClick={() => { addToCart(med); setIsCartOpen(true); }}
                               className="bg-primary-600 text-white px-6 py-3 rounded-2xl font-black text-xs hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 btn-shine outline-none"
                             >
                               Buy Now
                             </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredMedicines.length === 0 && (
                    <div className="col-span-full py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">No items found</h3>
                      <p className="text-slate-400 font-medium">We couldn't find anything matching your search.</p>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>

      </div>

      {/* Sliding E-Commerce Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] cursor-pointer"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[160] shadow-2xl flex flex-col border-l border-slate-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary-50 text-primary-600 rounded-xl">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Your Basket</h3>
                  <span className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-full">{cartTotalItems} items</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-all outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 border border-slate-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-primary-600 uppercase font-black tracking-wider mb-0.5">{item.category}</p>
                        <h4 className="font-bold text-slate-900 text-sm truncate mb-2">{item.name}</h4>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-900 text-sm">₹{item.price.toFixed(2)}</span>
                          
                          {/* Qty controller */}
                          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-100 p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black text-slate-800 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all outline-none"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">Your basket is empty</h4>
                    <p className="text-slate-400 text-sm max-w-xs font-medium">Browse our pharmacy catalog and add medicines to get started.</p>
                  </div>
                )}
              </div>

              {/* Pricing Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  <div className="space-y-2 text-sm font-bold text-slate-500">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-slate-900 font-black">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {discountTotal > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Discounts</span>
                        <span className="font-black">-₹{discountTotal.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-slate-900 font-black">{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-primary-600 font-medium italic mt-1 text-right">Add ₹{(50 - subtotal).toFixed(2)} more for FREE delivery</p>
                    )}
                    <div className="h-[1px] bg-slate-200/60 my-2" />
                    <div className="flex justify-between text-lg text-slate-900 font-black pt-2">
                      <span>Total Amount</span>
                      <span className="text-primary-600 font-black">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 btn-shine outline-none disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Placing Order...
                      </>
                    ) : (
                      <>
                        Confirm & Order All
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Medicines;
