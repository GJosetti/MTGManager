import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./Pages/Admin/AdminDashboard.jsx";
import FuncionarioHome from "./Pages/Funcionario/FuncionarioHome.jsx";
import LoginScreen from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Inventory from "./Pages/Admin/Inventory.jsx";

import { AuthProvider } from "./RouteControl/AuthContext.jsx";
import ProtectedRoute from "./RouteControl/ProtectedRoute.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* públicas */}
                    <Route path="/login" element={<LoginScreen />} />
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

                    {/* funcionário */}
                    <Route path="/funcionario/home" element={
                        <ProtectedRoute allowedRoles={[1]}>
                            <FuncionarioHome />
                        </ProtectedRoute>
                    } />

                    {/* cliente */}
                    <Route path="/cliente/home" element={
                        <ProtectedRoute allowedRoles={[2]}>
                            <AdminHome />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
