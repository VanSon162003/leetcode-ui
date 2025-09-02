import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children = null }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const authToken = localStorage.getItem("authToken");

        if (savedUser && authToken) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse saved user data:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("authToken");
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", "mock-jwt-token");
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setShowProfileDropdown(false);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown((prev) => !prev);
    };

    const closeProfileDropdown = () => {
        setShowProfileDropdown(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                showProfileDropdown,
                login,
                logout,
                toggleProfileDropdown,
                closeProfileDropdown,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
