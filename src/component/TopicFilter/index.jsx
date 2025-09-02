"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faDatabase,
    faTerminal,
    faCogs,
    faChartBar,
    faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { faJsSquare } from "@fortawesome/free-brands-svg-icons";
import styles from "./TopicFilter.module.scss";

const TopicFilter = ({ onFilterChange, activeFilter }) => {
    const topics = [
        { id: "all", label: "All Topics", icon: faCogs, count: null },
        { id: "algorithms", label: "Algorithms", icon: faCode, count: null },
        { id: "database", label: "Database", icon: faDatabase, count: null },
        { id: "shell", label: "Shell", icon: faTerminal, count: null },
        { id: "concurrency", label: "Concurrency", icon: faCogs, count: null },
        {
            id: "javascript",
            label: "JavaScript",
            icon: faJsSquare,
            count: null,
        },
        { id: "pandas", label: "pandas", icon: faChartBar, count: null },
    ];

    const categories = [
        { label: "Array", count: 1977 },
        { label: "String", count: 809 },
        { label: "Hash Table", count: 722 },
        { label: "Dynamic Programming", count: 609 },
        { label: "Math", count: 607 },
        { label: "Sorting", count: 467 },
        { label: "Greedy", count: 430 },
        { label: "Depth-First Search", count: null },
    ];

    return (
        <div className={styles.container}>
            {/* Topic Buttons */}
            <div className={styles.topicButtons}>
                {topics.map((topic) => (
                    <button
                        key={topic.id}
                        className={`${styles.topicButton} ${
                            activeFilter === topic.id ? styles.active : ""
                        }`}
                        onClick={() => onFilterChange(topic.id)}
                    >
                        <FontAwesomeIcon
                            icon={topic.icon}
                            className={styles.topicIcon}
                        />
                        {topic.label}
                    </button>
                ))}
            </div>

            {/* Category Tags */}
            <div className={styles.categories}>
                {categories.map((category) => (
                    <button key={category.label} className={styles.categoryTag}>
                        {category.label}
                        {category.count && (
                            <span className={styles.count}>
                                {category.count}
                            </span>
                        )}
                        {!category.count && (
                            <FontAwesomeIcon
                                icon={faExpand}
                                className={styles.expandIcon}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TopicFilter;
