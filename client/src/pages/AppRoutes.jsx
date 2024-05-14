import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Tocky from "./Tocky/Tocky";
import Login from "./Login/Login";
import Register from "./Register/Register";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tocky" element={<Tocky />} />
      </Routes>
    </BrowserRouter>
  );
}
