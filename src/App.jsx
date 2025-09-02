import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import ROUTES from "./configs/routes";
import Problems from "./pages/problems";
import ProblemDetail from "./pages/problem-detail";
import { ThemeProvider } from "./contexts/theme-context.jsx";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className={styles.app}>
                    <div className={styles.app__container}>
                        <Routes>
                            <Route path={ROUTES.PROBLEMS} element={<Problems />} />
                            <Route path={ROUTES.PROBLEM_DETAIL} element={<ProblemDetail />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
