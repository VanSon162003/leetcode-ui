import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./ThemeToggle.module.scss";
import { useTheme } from "../ThemeProvider/useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
            } theme`}
        >
            <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                className={styles.icon}
            />
        </button>
    );
};

export default ThemeToggle;
