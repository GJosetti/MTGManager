import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AdminHome from "./Pages/Admin/AdminDashboard.jsx";
import FuncionarioHome from "./Pages/Funcionario/FuncionarioHome.jsx";
import LoginScreen from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Inventory from "./Pages/Admin/Inventory.jsx";

import { AuthProvider } from "./RouteControl/AuthContext.jsx";
import ProtectedRoute from "./RouteControl/ProtectedRoute.jsx";
import ClientStore from "./Pages/Client/ClientStore.jsx";
import SalesHistory from "./Pages/Admin/SaleHistory.jsx";
import Reservation from "./Pages/Admin/Reservation.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* públicas */}
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/register" element={<Register />} />

                    {/* admin */}
                    <Route path="/admin/home" element={
                        <ProtectedRoute allowedRoles={[0]}>
                            <AdminHome />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/inventory" element={
                        <ProtectedRoute allowedRoles={[0]}>
                            <Inventory />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/sales" element={
                        <ProtectedRoute allowedRoles={[0]}>
                            <SalesHistory/>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reservation" element={
                        <ProtectedRoute allowedRoles={[0]}>
                            <Reservation/>
                        </ProtectedRoute>
                    } />

                    {/* funcionário */}
                    <Route path="/funcionario/home" element={
                        <ProtectedRoute allowedRoles={[1]}>
                            <FuncionarioHome />
                        </ProtectedRoute>
                    } />

                    {/* cliente */}
                    <Route path="/client/home" element={
                        <ProtectedRoute allowedRoles={[2,1,0]}>
                            <ClientStore/>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
