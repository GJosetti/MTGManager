import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Carregando...</p>; // enquanto checa /me
    if (!user) return <Navigate to="/login" replace />; // não logado
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />; // role não permitida

    return children;
}

export default ProtectedRoute;
