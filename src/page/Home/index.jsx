"use client"

import { useState } from "react"
import CourseCard from "../../component/CourseCard"
import TopicFilter from "../../component/TopicFilter"
import ProblemList from "../../component/ProblemList"
import Calendar from "../../component/Calendar"
import TrendingCompanies from "../../component/TrendingCompanies"
import styles from "./Home.module.scss"

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("all")

  const courses = [
    {
      id: 1,
      title: "School Time Leet Time",
      subtitle: null,
      price: "$119/yr",
      backgroundColor: "#2d3748",
      textColor: "#ffffff",
      buttonColor: "#ffffff",
      buttonText: "Start Learning",
      image: "/school-coding-illustration-dark-theme.png",
    },
    {
      id: 2,
      title: "LeetCode's Interview Crash Course:",
      subtitle: "System Design for Interviews and Beyond",
      price: null,
      backgroundColor: "#00af9b",
      textColor: "#ffffff",
      buttonColor: "#ffffff",
      buttonText: "Start Learning",
      image: "/system-design-interview-illustration.png",
    },
    {
      id: 3,
      title: "LeetCode's Interview Crash Course:",
      subtitle: "Data Structures and Algorithms",
      price: null,
      backgroundColor: "#8b5cf6",
      textColor: "#ffffff",
      buttonColor: "#ffffff",
      buttonText: "Start Learning",
      image: "/data-structures-algorithms-illustration.png",
    },
    {
      id: 4,
      title: "Top Interview Questions",
      subtitle: "Get Started",
      price: null,
      backgroundColor: "#3b82f6",
      textColor: "#ffffff",
      buttonColor: "#ffffff",
      buttonText: "Get Started",
      image: "/interview-questions-coding-illustration.png",
    },
  ]

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        {/* Course Cards Section */}
        <div className={styles.coursesSection}>
          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Topic Filter Section */}
        <TopicFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        <div className={styles.problemsSection}>
          <ProblemList />
        </div>
      </div>

      <div className={styles.rightSidebar}>
        <Calendar />
        <TrendingCompanies />
      </div>
    </div>
  )
}

export default Home
