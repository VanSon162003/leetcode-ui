"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import styles from "./Calendar.module.scss"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentMonth + direction)
    setCurrentDate(newDate)
  }

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const hasActivity = (day) => {
    // Mock activity data - in real app this would come from props/state
    const activeDays = [15, 16, 20, 22, 25, 26]
    return activeDays.includes(day)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className={styles.navigation}>
          <button className={styles.navButton} onClick={() => navigateMonth(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={styles.navButton} onClick={() => navigateMonth(1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className={styles.weekdays}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              ${styles.day} 
              ${day ? styles.dayActive : styles.dayEmpty}
              ${isToday(day) ? styles.today : ""}
              ${hasActivity(day) ? styles.hasActivity : ""}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.streak}>
          <span className={styles.streakLabel}>Weekly Premium</span>
          <span className={styles.streakDays}>2 days left</span>
        </div>
      </div>
    </div>
  )
}

export default Calendar
