import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { CompanyProvider } from "./Context/CompanyContext.jsx";
import "./pages/Dashboard/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <CompanyProvider>
            <AuthProvider>
                <QueryClientProvider client={query}>
                    <App />
                </QueryClientProvider>
                <Toaster
                    className="dont-print"
                    position="top-center"
                    toastOptions={{
                        duration: 5000,
                    }}
                />
            </AuthProvider>
        </CompanyProvider>
    </BrowserRouter>,
);
