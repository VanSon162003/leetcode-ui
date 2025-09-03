import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./auth-context";
import { apiService } from "../services/api.js";

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

    const login = async (credentials) => {
        try {
            const response = await apiService.login(credentials);
            const { user: userData, token } = response;
            
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("authToken", token);
            
            return { success: true, message: response.message };
        } catch (error) {
            console.error("Login failed:", error);
            return { 
                success: false, 
                message: error.message || "Login failed. Please try again." 
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await apiService.register(userData);
            const { user: newUser } = response;
            
            setUser(newUser);
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(newUser));
            // Note: Registration doesn't return token, user needs to login
            
            return { success: true, message: response.message };
        } catch (error) {
            console.error("Registration failed:", error);
            return { 
                success: false, 
                message: error.message || "Registration failed. Please try again." 
            };
        }
    };

    const logout = async () => {
        try {
            await apiService.logout();
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setShowProfileDropdown(false);
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
        }
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
                register,
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


