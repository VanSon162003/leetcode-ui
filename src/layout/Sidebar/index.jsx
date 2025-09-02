"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook,
  faGraduationCap,
  faList,
  faHeart,
  faPlus,
  faLock,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import styles from "./Sidebar.module.scss"

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    library: true,
    studyPlan: false,
    myLists: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <aside className={styles.sidebar}>
      {/* Library Section */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggleSection("library")}>
          <FontAwesomeIcon icon={faBook} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Library</span>
          <FontAwesomeIcon
            icon={expandedSections.library ? faChevronDown : faChevronRight}
            className={styles.chevronIcon}
          />
        </button>
        {expandedSections.library && (
          <div className={styles.sectionContent}>{/* Library content can be added here */}</div>
        )}
      </div>

      {/* Study Plan Section */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggleSection("studyPlan")}>
          <FontAwesomeIcon icon={faGraduationCap} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Study Plan</span>
          <FontAwesomeIcon
            icon={expandedSections.studyPlan ? faChevronDown : faChevronRight}
            className={styles.chevronIcon}
          />
        </button>
        {expandedSections.studyPlan && (
          <div className={styles.sectionContent}>{/* Study plan content can be added here */}</div>
        )}
      </div>

      {/* My Lists Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeaderWithAction}>
          <button className={styles.sectionHeader} onClick={() => toggleSection("myLists")}>
            <FontAwesomeIcon icon={faList} className={styles.sectionIcon} />
            <span className={styles.sectionTitle}>My Lists</span>
            <FontAwesomeIcon
              icon={expandedSections.myLists ? faChevronDown : faChevronRight}
              className={styles.chevronIcon}
            />
          </button>
          <button className={styles.addButton}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {expandedSections.myLists && (
          <div className={styles.sectionContent}>{/* My lists content can be added here */}</div>
        )}
      </div>

      {/* Favorite Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <FontAwesomeIcon icon={faHeart} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Favorite</span>
          <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
