import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Tocky from "./Tocky/Tocky";
import ProtectedRoute from "../helpers/protectedRoute/ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tocky" element={
                    <ProtectedRoute>
                        <Tocky />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}
