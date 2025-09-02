import React from "react";
import { useTheme } from "@/contexts/use-theme";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./theme-toggle.module.scss";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={styles.themeToggle}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
            <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                className={styles.icon}
            />
        </Button>
    );
}
