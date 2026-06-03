import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Camera, Shield, Bell, Lock, Save, X, CheckCircle2, Loader2, Heart, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Profile = () => {
  const { user, login } = useAuth();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: 'User',
    email: 'user@example.com',
    phone: '+91 00000 00000',
    address: 'City, Country',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    joinDate: 'May 2026',
    bloodGroup: 'O+',
    age: 24,
    gender: 'Male'
  });

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        age: user.age || 24,
        gender: user.gender || 'Male',
        bloodGroup: user.bloodGroup || 'O+',
        image: user.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        joinDate: 'May 2026'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/profile/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        const data = await response.json();
        login(data.user, localStorage.getItem('token')); // Update context
        setSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">My <span className="text-primary-600">Profile</span></h1>
          <p className="text-slate-500 font-medium italic">Manage your medical identity and account security.</p>
        </div>
        
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3 font-black text-sm"
            >
              <CheckCircle2 className="w-5 h-5" /> Profile Updated!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column - Card */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/30 p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary-600/5 blur-3xl rounded-full -translate-y-1/2" />
            
            <div 
              onClick={triggerFileInput}
              className={`relative w-40 h-40 mx-auto mb-8 group ${isEditing ? 'cursor-pointer' : ''}`}
            >
              <img src={userData.image} alt={userData.name} className="w-full h-full rounded-[40px] object-cover border-8 border-slate-50 shadow-xl transition-transform group-hover:scale-105 duration-500" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-[40px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center text-white">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                  </div>
                </div>
              )}
              <div className={`absolute -bottom-2 -right-2 p-4 rounded-2xl shadow-2xl border-4 border-white transition-all ${isEditing ? 'bg-primary-600 text-white animate-pulse' : 'bg-slate-900 text-white'}`}>
                <Camera className="w-5 h-5" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            {isEditing && (
              <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-6">Click photo to upload new picture</p>
            )}
            
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{userData.name}</h2>
            <p className="text-primary-600 font-black text-xs uppercase tracking-[0.2em] mb-10">Patient #MC-2026-001</p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined</span>
                <span className="text-sm font-black text-slate-900">{userData.joinDate}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" /> Blood Group
                </span>
                {isEditing ? (
                  <select 
                    name="bloodGroup" 
                    value={userData.bloodGroup} 
                    onChange={handleChange}
                    className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-rose-600 outline-none"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm font-black text-rose-600">{userData.bloodGroup}</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                <Shield className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Trust Status</p>
                <p className="text-lg font-black tracking-tight">Verified Member</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed relative z-10">
              Your identity has been verified. You have full access to global specialist consultations and priority medical delivery.
            </p>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
            <div className="p-8 md:p-10 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <User className="w-5 h-5" />
                </div>
                Identity Vault
              </h3>
              
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                >
                  <Edit className="w-4 h-4" /> Edit Info
                </button>
              ) : (
                <div className="flex gap-2">
                   <button 
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 btn-shine"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save</>}
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary-500" /> Email
                </p>
                {isEditing ? (
                  <input name="email" value={userData.email} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary-500 font-bold" />
                ) : (
                  <p className="text-lg font-black text-slate-900">{userData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" /> Phone Number
                </p>
                {isEditing ? (
                  <input name="phone" value={userData.phone} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary-500 font-bold" />
                ) : (
                  <p className="text-lg font-black text-slate-900">{userData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> Current Address
                </p>
                {isEditing ? (
                  <input name="address" value={userData.address} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary-500 font-bold" />
                ) : (
                  <p className="text-lg font-black text-slate-900">{userData.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-indigo-500" /> Demographic
                </p>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input name="age" value={userData.age} onChange={handleChange} className="w-1/2 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary-500 font-bold" />
                    <select name="gender" value={userData.gender} onChange={handleChange} className="w-1/2 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary-500 font-bold">
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <p className="text-lg font-black text-slate-900">{userData.age} Years / {userData.gender}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
