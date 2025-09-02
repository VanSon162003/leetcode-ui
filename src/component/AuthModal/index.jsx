"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
    faGoogle as faGoogleBrand,
    faGithub as faGithubBrand,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../hooks/use-auth";
import styles from "./AuthModal.module.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
    const { login, register } = useAuth();
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (mode === "register") {
            if (!formData.username) {
                newErrors.username = "Username is required";
            } else if (formData.username.length < 3) {
                newErrors.username = "Username must be at least 3 characters";
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            if (mode === "login") {
                await login(formData.email, formData.password);
            } else {
                await register(
                    formData.email,
                    formData.password,
                    formData.username
                );
            }
            onClose();
        } catch {
            setErrors({ general: "Authentication failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const handleSocialAuth = async (provider) => {
        setLoading(true);
        try {
            // Will implement social auth later in the auth context
            await login(`${provider}@example.com`, "dummypassword");
            onClose();
        } catch {
            setErrors({
                general: "Social authentication failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {mode === "login" ? "Sign In" : "Create Account"}
                    </h2>
                    <p className={styles.subtitle}>
                        {mode === "login"
                            ? "Welcome back! Please sign in to continue."
                            : "Join LeetCode to start your journey."}
                    </p>
                </div>

                {errors.general && (
                    <div className={styles.errorMessage}>{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    {mode === "register" && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`${styles.input} ${
                                    errors.username ? styles.inputError : ""
                                }`}
                                placeholder="Enter your username"
                            />
                            {errors.username && (
                                <span className={styles.fieldError}>
                                    {errors.username}
                                </span>
                            )}
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`${styles.input} ${
                                errors.email ? styles.inputError : ""
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <span className={styles.fieldError}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <div className={styles.passwordInput}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`${styles.input} ${
                                    errors.password ? styles.inputError : ""
                                }`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                />
                            </button>
                        </div>
                        {errors.password && (
                            <span className={styles.fieldError}>
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {mode === "register" && (
                        <div className={styles.inputGroup}>
                            <label
                                htmlFor="confirmPassword"
                                className={styles.label}
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`${styles.input} ${
                                    errors.confirmPassword
                                        ? styles.inputError
                                        : ""
                                }`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <span className={styles.fieldError}>
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : mode === "login"
                            ? "Sign In"
                            : "Create Account"}
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>or</span>
                </div>

                <div className={styles.socialButtons}>
                    <button
                        type="button"
                        className={styles.socialButton}
                        onClick={() => handleSocialAuth("google")}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faGoogleBrand} />
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        className={styles.socialButton}
                        onClick={() => handleSocialAuth("github")}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faGithubBrand} />
                        Continue with GitHub
                    </button>
                </div>

                <div className={styles.footer}>
                    {mode === "login" ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                className={styles.linkButton}
                                onClick={() => setMode("register")}
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className={styles.linkButton}
                                onClick={() => setMode("login")}
                            >
                                Sign in
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
