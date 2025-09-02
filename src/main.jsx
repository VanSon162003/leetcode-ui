import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/main.scss";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProblemProvider } from "./contexts/problem-context";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <ProblemProvider>
                    <App />
                </ProblemProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
