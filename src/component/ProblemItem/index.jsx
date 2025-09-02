import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import styles from "./ProblemItem.module.scss"

const ProblemItem = ({ problem }) => {
  const { id, title, difficulty, acceptance, status } = problem

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return styles.easy
      case "medium":
        return styles.medium
      case "hard":
        return styles.hard
      default:
        return ""
    }
  }

  const getStatusIcon = () => {
    if (status === "solved") {
      return <FontAwesomeIcon icon={faCheck} className={styles.solvedIcon} />
    }
    return null
  }

  return (
    <div className={styles.problemItem}>
      <div className={styles.statusCell}>{getStatusIcon()}</div>

      <div className={styles.titleCell}>
        <span className={styles.problemNumber}>{id}.</span>
        <span className={styles.problemTitle}>{title}</span>
      </div>

      <div className={styles.acceptanceCell}>
        <span className={styles.acceptance}>{acceptance}</span>
      </div>

      <div className={styles.difficultyCell}>
        <span className={`${styles.difficulty} ${getDifficultyClass(difficulty)}`}>{difficulty}</span>
      </div>

      <div className={styles.frequencyCell}>
        <div className={styles.frequencyBars}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>
    </div>
  )
}

export default ProblemItem
