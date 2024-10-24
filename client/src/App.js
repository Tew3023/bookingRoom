import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import Booking from './pages/Booking';



function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Register/>} />
      <Route path='/register' element={<Login/>} />
      <Route path='/booking' element={<Booking/>} />
    </Routes>
   </>
  );
}

export default App;
