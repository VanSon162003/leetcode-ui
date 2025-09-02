"use client";

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faBook,
    faClipboardList,
    faChartLine,
    faCoins,
    faFlask,
    faShoppingCart,
    faGamepad,
    faCog,
    faPalette,
    faSignOutAlt,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/use-auth";
import styles from "./UserProfileDropdown.module.scss";

const UserProfileDropdown = () => {
    const { user, logout: handleLogout, closeDropdown } = useAuth();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            const dropdownEl = dropdownRef.current;
            if (dropdownEl && !dropdownEl.contains(e.target)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [closeDropdown]);

    useEffect(() => {
        if (user && !user.stats) {
            // TODO: Implement fetching user profile in AuthContext
        }
    }, [user]);

    const menuItems = [
        { icon: faList, label: "My Lists", color: "#4CAF50" },
        { icon: faBook, label: "Notebook", color: "#2196F3" },
        { icon: faClipboardList, label: "Submissions", color: "#FF9800" },
        { icon: faChartLine, label: "Progress", color: "#4CAF50" },
        { icon: faCoins, label: "Points", color: "#FFC107" },
    ];

    const bottomMenuItems = [
        { icon: faFlask, label: "Try New Features", hasNew: true },
        { icon: faShoppingCart, label: "Orders" },
        { icon: faGamepad, label: "My Playgrounds" },
        { icon: faCog, label: "Settings" },
        { icon: faPalette, label: "Appearance", hasChevron: true },
    ];

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            {/* User Info Section */}
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    {user.avatar ? (
                        <img
                            src={user.avatar || "/placeholder.svg"}
                            alt="User avatar"
                        />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className={styles.userDetails}>
                    <h3 className={styles.username}>{user.username}</h3>
                    {user.isPremium ? (
                        <p className={styles.premiumText}>Premium Member</p>
                    ) : (
                        <p className={styles.premiumText}>
                            Access all features with our Premium subscription!
                        </p>
                    )}
                    {user.stats && (
                        <div className={styles.userStats}>
                            <span className={styles.statItem}>
                                {user.stats.solved}/{user.stats.total} Solved
                            </span>
                            {user.stats.ranking && (
                                <span className={styles.statItem}>
                                    Ranking: #
                                    {user.stats.ranking.toLocaleString()}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className={styles.statsGrid}>
                {menuItems.map((item) => (
                    <button key={item.label} className={styles.statItem}>
                        <div
                            className={styles.statIcon}
                            style={{ backgroundColor: item.color }}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <span className={styles.statLabel}>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Menu Items */}
            <div className={styles.menuSection}>
                {bottomMenuItems.map((item) => (
                    <button key={item.label} className={styles.menuItem}>
                        <FontAwesomeIcon
                            icon={item.icon}
                            className={styles.menuIcon}
                        />
                        <span className={styles.menuLabel}>{item.label}</span>
                        {item.hasNew && (
                            <span className={styles.newBadge}>•</span>
                        )}
                        {item.hasChevron && (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={styles.chevronIcon}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Logout */}
            <div className={styles.logoutSection}>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className={styles.menuIcon}
                    />
                    <span className={styles.menuLabel}>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default UserProfileDropdown;
