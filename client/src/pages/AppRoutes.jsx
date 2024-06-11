import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Tocky from "./Tocky/Tocky";
import ProtectedRoute from "../helpers/protectedRoute/ProtectedRoute";
import Deposit from "./Deposit/Deposit";
import DepositSuccess from "./DepositSuccess/DepositSuccess";
import DepositCancel from "./DepositCancel/DepositCancel";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tocky" element={
                        <Tocky />
                } />
                <Route path="/deposit" element={
                    <ProtectedRoute>
                        <Deposit />
                    </ProtectedRoute>
                } />
                <Route path="/deposit/success" element={
                    <ProtectedRoute>
                        <DepositSuccess />
                    </ProtectedRoute>
                } />
                <Route path="/deposit/cancel" element={
                    <ProtectedRoute>
                        <DepositCancel />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}
