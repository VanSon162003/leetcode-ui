import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faMoon,
    faBell,
    faFire,
    faChevronDown,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../component/Navigation";
import UserProfileDropdown from "../../component/UserProfileDropdown";
import AuthModal from "../../component/AuthModal";
import { useTheme } from "../../contexts/use-theme";
import { useAuth } from "../../hooks/use-auth";
import styles from "./Header.module.scss";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const {
        user,
        isAuthenticated,
        showProfileDropdown,
        toggleProfileDropdown,
    } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleThemeToggle = () => {
        toggleTheme();
    };

    const handleProfileClick = () => {
        if (isAuthenticated) {
            toggleProfileDropdown();
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    {/* Left Section - Logo and Navigation */}
                    <div className={styles.leftSection}>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>LeetCode</span>
                        </div>
                        <Navigation />
                    </div>

                    {/* Right Section - Actions and User */}
                    <div className={styles.rightSection}>
                        {/* Notifications */}
                        <button className={styles.iconButton}>
                            <FontAwesomeIcon icon={faBell} />
                        </button>

                        {/* Fire Streak */}
                        <button className={styles.iconButton}>
                            <FontAwesomeIcon icon={faFire} />
                            <span className={styles.streakCount}>0</span>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            className={styles.themeToggle}
                            onClick={handleThemeToggle}
                            aria-label={`Switch to ${
                                theme === "light" ? "dark" : "light"
                            } theme`}
                        >
                            <FontAwesomeIcon
                                icon={theme === "light" ? faMoon : faSun}
                            />
                        </button>

                        {/* User Profile or Sign In */}
                        <div className={styles.userProfile}>
                            <button
                                className={styles.profileButton}
                                onClick={handleProfileClick}
                            >
                                <div className={styles.avatar}>
                                    {isAuthenticated && user?.avatar ? (
                                        <img
                                            src={
                                                user.avatar ||
                                                "/placeholder.svg"
                                            }
                                            alt="User avatar"
                                        />
                                    ) : isAuthenticated && user ? (
                                        <div
                                            className={styles.avatarPlaceholder}
                                        >
                                            {user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    ) : (
                                        <FontAwesomeIcon icon={faUser} />
                                    )}
                                </div>
                                {isAuthenticated ? (
                                    <>
                                        {user?.isPremium && (
                                            <span
                                                className={styles.premiumBadge}
                                            >
                                                Premium
                                            </span>
                                        )}
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={styles.dropdownIcon}
                                        />
                                    </>
                                ) : (
                                    <span className={styles.signInText}>
                                        Sign In
                                    </span>
                                )}
                            </button>

                            {showProfileDropdown && isAuthenticated && (
                                <UserProfileDropdown />
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};

export default Header;
