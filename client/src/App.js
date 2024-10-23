import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Register/>} />
      <Route path='/register' element={<Login/>} />
    </Routes>
   </>
  );
}

export default App;
