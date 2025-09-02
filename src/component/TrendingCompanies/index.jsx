"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import styles from "./TrendingCompanies.module.scss"

const TrendingCompanies = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const companies = [
    { name: "Meta", count: 1292, color: "#1877F2" },
    { name: "Amazon", count: 1888, color: "#FF9900" },
    { name: "Uber", count: 484, color: "#000000" },
    { name: "Google", count: 2094, color: "#4285F4" },
  ]

  const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Trending Companies</h3>
        <div className={styles.navigation}>
          <button className={styles.navButton}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={styles.navButton}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchInput}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for a company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.companiesList}>
        {filteredCompanies.map((company) => (
          <div key={company.name} className={styles.companyItem}>
            <div className={styles.companyIcon} style={{ backgroundColor: company.color }}>
              {company.name.charAt(0)}
            </div>
            <div className={styles.companyInfo}>
              <span className={styles.companyName}>{company.name}</span>
              <span className={styles.companyCount}>{company.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingCompanies
