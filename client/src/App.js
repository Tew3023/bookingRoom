// src/App.js
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Booking from './pages/Booking';
import AdminLayout from './components/AdminLayout';
import Layout from "./components/Layout";
import Rooms from './pages/Rooms';
import Users from './pages/Users';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/booking' element={<Booking />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="rooms" element={<Rooms />} />
        <Route path="users" element={<Users />} />
        <Route path="bookings" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
