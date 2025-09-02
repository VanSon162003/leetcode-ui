import { LockClosedIcon } from "@heroicons/react/24/solid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import styles from "./CourseCard.module.scss"

const CourseCard = ({ course }) => {
  const {
    title,
    description,
    progress,
    totalProblems,
    difficulty,
    premium,
    thumbnail,
    backgroundColor,
    textColor,
    buttonColor,
    buttonText = "Start Learning",
  } = course

  return (
    <div className={styles.card} style={{ backgroundColor }}>
      <div className={styles.thumbnail}>
        <img src={thumbnail} alt={title} />
        {premium && (
          <div className={styles.premiumBadge}>
            <LockClosedIcon className={styles.lockIcon} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} style={{ color: textColor }}>
          {title}
        </h3>
        <p className={styles.description} style={{ color: textColor }}>
          {description}
        </p>

        <div className={styles.stats}>
          <div className={styles.progress}>
            <div
              className={styles.progressBar}
              style={{ width: `${(progress / totalProblems) * 100}%` }}
            />
          </div>

          <div className={styles.details}>
            <span style={{ color: textColor }}>
              {progress}/{totalProblems}
            </span>
            <span className={styles.difficulty} style={{ color: textColor }}>
              {difficulty}
            </span>
          </div>
        </div>

        <button
          className={styles.startButton}
          style={{ backgroundColor: buttonColor }}
        >
          <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default CourseCard
