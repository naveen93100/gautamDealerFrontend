import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loginType, setLoginType] = useState(null);


    const login = (userData, token, type) => {
        if (userData)
            localStorage.setItem("userData", JSON.stringify(userData));
        if (token) localStorage.setItem("token", token);
        if (type) localStorage.setItem("loginType", type);
        setUser(userData);
        setToken(token);
        setLoginType(type);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("loginType");
        setUser(null);
        setToken(null);
        setLoginType(null);
    };

    useEffect(() => {
        const rawUser = localStorage.getItem("userData");
        const rawToken = localStorage.getItem("token");
        const rawLoginType = localStorage.getItem("loginType");

        const d =
            rawUser && rawUser !== "Undefined" ? JSON.parse(rawUser) : null;
        const t = rawToken && rawToken !== "Undefined" ? rawToken : null;
        const lt =
            rawLoginType && rawLoginType !== "Undefined" ? rawLoginType : null;

        if (!d && !t) return;

        setUser(d);
        setToken(t);
        setLoginType(lt);
        
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                token,
                setToken,
                setLoginType,
                setUser,
                loginType,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
