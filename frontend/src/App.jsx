import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AdminHome from "./Pages/Admin/AdminDashboard.jsx";
import FuncionarioHome from "./Pages/Funcionario/FuncionarioHome.jsx";
import LoginScreen from "./Pages/Login.jsx";
import Register from "./Pages/Client/Register.jsx";
import Inventory from "./Pages/Admin/Inventory.jsx";

import { AuthProvider } from "./RouteControl/AuthContext.jsx";
import ProtectedRoute from "./RouteControl/ProtectedRoute.jsx";
import ClientStore from "./Pages/Client/ClientStore.jsx";
import SalesHistory from "./Pages/Admin/SaleHistory.jsx";
import Reservation from "./Pages/Admin/Reservation.jsx";
import Employee from "./Pages/Admin/Employee.jsx";
import CardView from "./Pages/CardView.jsx";
import ProductsInventory from "./Pages/Admin/ProductsInventory.jsx";
import Cart from "./Pages/Client/Cart.jsx";
import ProductView from "./Pages/Client/ProductView.jsx";
import SealedCatalog from "./Pages/Client/SealedCatalog.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* públicas */}
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="client/register" element={<Register/>} />
                    <Route path="/client/home" element={<ClientStore />} />
                    <Route path="/cardview/:id" element={<CardView/>} />
                    <Route path="/client/product/:id" element={<ProductView/>}/>
                    <Route path="/client/sealedCatalog" element={<SealedCatalog/>}/>

                    {/* admin */}
                    <Route path="/admin/home" element={
                        <ProtectedRoute allowedRoles={[0,2]}>
                            <AdminHome />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/inventory" element={
                        <ProtectedRoute allowedRoles={[0,2]}>
                            <Inventory />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/productsinventory" element={
                        <ProtectedRoute allowedRoles={[0,2]}>
                            <ProductsInventory />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/sales" element={
                        <ProtectedRoute allowedRoles={[0,2]}>
                            <SalesHistory/>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/reservation" element={
                        <ProtectedRoute allowedRoles={[0,2]}>
                            <Reservation/>
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/employee" element={
                        <ProtectedRoute allowedRoles={[0]}>
                            <Employee />
                        </ProtectedRoute>
                    } />




                    <Route path="/client/cart" element={
                        <ProtectedRoute allowedRoles={[2,1,0]}>
                            <Cart/>
                        </ProtectedRoute>
                    } />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
