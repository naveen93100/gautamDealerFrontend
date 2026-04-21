import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userData, token) => {
        // localStorage.setItem('token', token);
        // localStorage.setItem('userData', JSON.stringify(userData));
        if(userData) localStorage.setItem('userData', JSON.stringify(userData));
        if(token) localStorage.setItem('token', token);
        setUser(userData);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUser(null);
        setToken(null);
    }

    useEffect(() => {

        const rawUser = localStorage.getItem('userData');
        const rawToken = localStorage.getItem('token');
const d = rawUser && rawUser !== "Undefined" ? JSON.parse(rawUser) : null;
const t = rawToken && rawToken !== "Undefined" ? rawToken : null;

        console.log("User Data:", localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null);
        // let d = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
        // let t = localStorage.getItem('token') ? localStorage.getItem('token') : null;

        if (!d && !t) return;

        setUser(d);
        setToken(t);

    }, []);

    return (

        <AuthContext.Provider value={{ user, login, logout, token, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}

