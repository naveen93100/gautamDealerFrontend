import { createContext, useContext, useState, useEffect } from "react";
// import { setApiCompany } from "../services/api";

const CompanyContext = createContext(null);
const STORAGE_KEY = "selectedCompany";

export const CompanyProvider = ({ children }) => {
    const [company, setCompanyState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : null;
        // if (parsed) setApiCompany(parsed); // restore base URL on page refresh
        return parsed;
    });

    useEffect(() => {
        if (company) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(company));
            // setApiCompany(company);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [company]);

    const setCompany = (companyObj) => setCompanyState(companyObj);
    const clearCompany = () => setCompanyState(null);

    return (
        <CompanyContext.Provider value={{ company, setCompany, clearCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const ctx = useContext(CompanyContext);
    console.log(ctx)
    if (!ctx) throw new Error("useCompany must be used within CompanyProvider");
    return ctx;
};
