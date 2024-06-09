import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
