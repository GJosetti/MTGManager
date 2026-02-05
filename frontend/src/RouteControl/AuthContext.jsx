import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/me", {
      credentials: "include"
    })
        .then(res => {
          if (!res.ok) { // status 401, 403, etc.
            setUser(null);
            return null; // importante!
          }
          return res.json(); // só chama se tiver corpo
        })
        .then(data => {
          if (data) setUser(data);
        })
        .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
