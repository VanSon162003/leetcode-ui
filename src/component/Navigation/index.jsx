import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styles from "./Navigation.module.scss"

const Navigation = () => {
  const location = useLocation()
  
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return null;
  }

      const navigationItems = [
        { label: "Problems", path: "/", hasDropdown: false },
    ]

  // Check if current path matches navigation item
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname.startsWith("/problems/")
    }
    return location.pathname === path
  }

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {navigationItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <Link
              to={item.path}
              className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}
            >
              {item.label}
              {item.hasDropdown && <FontAwesomeIcon icon={faChevronDown} className={styles.dropdownIcon} />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
