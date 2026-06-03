import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dns.setServers(['8.8.8.8']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- Models ---

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  age: { type: Number },
  gender: { type: String },
  bloodGroup: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: Number,
  doctorName: String,
  specialty: String,
  date: String,
  time: String,
  status: { type: String, default: 'Upcoming' },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      medicineId: Number,
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

const prescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: String,
  specialty: String,
  date: String,
  diagnosis: String,
  medicines: [String],
  createdAt: { type: Date, default: Date.now }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// --- Mock Data ---

const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.9, reviews: 128, experience: '15 Years', location: 'New York, NY', fee: 150, image: '/doctors/dr_sarah.png' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.8, reviews: 95, experience: '12 Years', location: 'San Francisco, CA', fee: 200, image: '/doctors/dr_michael.png' },
  { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrician', rating: 5.0, reviews: 210, experience: '10 Years', location: 'Chicago, IL', fee: 120, image: '/doctors/dr_emily.png' },
  { id: 4, name: 'Dr. David Miller', specialty: 'Dermatologist', rating: 4.9, reviews: 156, experience: '14 Years', location: 'Boston, MA', fee: 160, image: '/doctors/dr_david.png' },
];

const medicines = [
  { id: 1, name: 'Vitamin C 1000mg', category: 'Vitamins', price: 12.99, rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=300&q=80', discount: 15, description: 'Boosts immunity and supports skin health. Take 1 tablet daily with food.' },
  { id: 2, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 5.49, rating: 4.9, reviews: 856, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', description: 'Fast-acting pain and fever relief. Adults: 1-2 tablets every 4-6 hours.' },
  { id: 3, name: 'Cough Syrup', category: 'Cold & Flu', price: 8.99, rating: 4.5, reviews: 124, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=300&q=80', description: 'Relieves dry and wet cough. Take 10ml every 6-8 hours.' },
  { id: 4, name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 15.99, rating: 4.7, reviews: 432, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300&q=80', discount: 10, description: 'Broad-spectrum antibiotic for bacterial infections. Complete the full course.' },
  { id: 5, name: 'Omeprazole 20mg', category: 'Digestive Health', price: 9.49, rating: 4.6, reviews: 278, image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=300&q=80', description: 'Reduces stomach acid, treats heartburn and GERD. Take 1 capsule before breakfast.' },
  { id: 6, name: 'Cetirizine 10mg', category: 'Allergy', price: 6.99, rating: 4.4, reviews: 567, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80', discount: 20, description: 'Non-drowsy antihistamine for allergies and hay fever. Take once daily.' },
  { id: 7, name: 'Ibuprofen 400mg', category: 'Pain Relief', price: 7.99, rating: 4.8, reviews: 923, image: 'https://images.unsplash.com/photo-1626716493137-b67fe9501e76?auto=format&fit=crop&w=300&q=80', description: 'Anti-inflammatory painkiller for headaches, muscle pain, and arthritis.' },
  { id: 8, name: 'Multivitamin Complex', category: 'Vitamins', price: 18.99, rating: 4.9, reviews: 1204, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=300&q=80', discount: 25, description: 'Complete daily nutrition with essential vitamins and minerals for adults.' },
  { id: 9, name: 'Azithromycin 500mg', category: 'Antibiotics', price: 22.49, rating: 4.6, reviews: 389, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=300&q=80', description: 'Treats bacterial infections including respiratory and skin infections.' },
  { id: 10, name: 'Calcium + Vitamin D3', category: 'Vitamins', price: 14.99, rating: 4.7, reviews: 645, image: 'https://images.unsplash.com/photo-1577401239170-897c8507ba26?auto=format&fit=crop&w=300&q=80', discount: 10, description: 'Strengthens bones and teeth. Essential for calcium absorption.' },
  { id: 11, name: 'Loperamide 2mg', category: 'Digestive Health', price: 4.99, rating: 4.3, reviews: 198, image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=300&q=80', description: 'Fast-acting relief from acute diarrhea. Adults: 2 capsules initially.' },
  { id: 12, name: 'Dolo 650mg', category: 'Pain Relief', price: 3.99, rating: 4.9, reviews: 2156, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', discount: 5, description: 'India\'s most trusted fever and pain relief tablet. Safe and effective.' },
];

// --- Routes ---

// Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      phone: user.phone || '+91 00000 00000',
      address: user.address || 'City, Country',
      age: user.age || 24,
      gender: user.gender || 'Male',
      bloodGroup: user.bloodGroup || 'O+',
      image: user.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    } });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
});

// Doctors & Medicines
app.get('/api/doctors', (req, res) => res.json(doctors));
app.get('/api/medicines', (req, res) => res.json(medicines));

// Appointments
app.post('/api/appointments', async (req, res) => {
  try {
    const { userId, doctorId, doctorName, specialty, date, time } = req.body;
    const appointment = new Appointment({ userId, doctorId, doctorName, specialty, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) { res.status(500).json({ message: 'Error booking appointment' }); }
});

app.get('/api/appointments/:userId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) { res.status(500).json({ message: 'Error fetching appointments' }); }
});

// Orders
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const order = new Order({ userId, items, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) { res.status(500).json({ message: 'Error creating order' }); }
});

app.get('/api/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) { res.status(500).json({ message: 'Error fetching orders' }); }
});

// Profile Update
app.put('/api/auth/profile/:userId', async (req, res) => {
  try {
    const { name, email, phone, address, age, gender, bloodGroup, image } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, phone, address, age, gender, bloodGroup, image },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      phone: user.phone || '+91 00000 00000',
      address: user.address || 'City, Country',
      age: user.age || 24,
      gender: user.gender || 'Male',
      bloodGroup: user.bloodGroup || 'O+',
      image: user.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    } });
  } catch (error) { res.status(500).json({ message: 'Error updating profile' }); }
});

app.get('/api/auth/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      phone: user.phone || '+91 00000 00000',
      address: user.address || 'City, Country',
      age: user.age || 24,
      gender: user.gender || 'Male',
      bloodGroup: user.bloodGroup || 'O+',
      image: user.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    } });
  } catch (error) { res.status(500).json({ message: 'Error fetching profile' }); }
});

// Cancel Appointment
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
});

// Get Prescriptions for a User
app.get('/api/prescriptions/:userId', async (req, res) => {
  try {
    let prescriptions = await Prescription.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    
    // If no prescriptions exist, seed some dummy ones for this user
    if (prescriptions.length === 0) {
      prescriptions = [
        new Prescription({
          userId: req.params.userId,
          doctor: 'Dr. Sarah Johnson',
          specialty: 'Cardiologist',
          date: new Date().toISOString().split('T')[0],
          diagnosis: 'Mild Hypertension',
          medicines: ['Amoxicillin 500mg', 'Paracetamol 650mg']
        }),
        new Prescription({
          userId: req.params.userId,
          doctor: 'Dr. Michael Chen',
          specialty: 'Neurologist',
          date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
          diagnosis: 'Tension Headache',
          medicines: ['Ibuprofen 400mg']
        })
      ];
      await Promise.all(prescriptions.map(p => p.save()));
    }
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions' });
  }
});

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account found with this email' });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

app.get('/', (req, res) => res.send('ApnaMedicare API is running...'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
