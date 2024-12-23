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
import Enrow from './pages/Enrow/Enrow';
import Apply from './pages/Enrow/Apply';
import Adminjob from './pages/Enrow/Adminjob';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='register' element={<Login />} />
        <Route path='login' element={<Register />} />
        <Route path='booking' element={<Booking />} />
        <Route path='careers' element={<Enrow />} />
        <Route path="/careers/apply/:jobname" element={<Apply />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="rooms" element={<Rooms />} />
        <Route path="users" element={<Users />} />
        <Route path="bookings" element={<BookingPage />} />
        <Route path="jobapplication" element={<Adminjob />} />
      </Route>
    </Routes>
  );
}

export default App;
