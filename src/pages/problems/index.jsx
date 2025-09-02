import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useTheme } from "../../contexts/use-theme";
import ROUTES from "../../configs/routes";
import styles from "./Problems.module.scss";

const Problems = () => {
    const { theme: _theme } = useTheme();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        difficulty: "All",
        status: "All",
        search: "",
        topic: "All"
    });
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    // Mock problems data
    const mockProblems = useMemo(() => [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            status: "Solved",
            acceptance: "44.8%",
            slug: "two-sum",
            topics: ["Array", "Hash Table"],
            companies: ["Amazon", "Google", "Microsoft"],
            likes: 12500,
            dislikes: 400
        },
        {
            id: 2,
            title: "Add Two Numbers",
            difficulty: "Medium",
            status: "Attempted",
            acceptance: "33.1%",
            slug: "add-two-numbers",
            topics: ["Linked List", "Math"],
            companies: ["Amazon", "Google", "Microsoft"],
            likes: 8900,
            dislikes: 300
        },
        {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            status: "Not Attempted",
            acceptance: "29.8%",
            slug: "longest-substring-without-repeating-characters",
            topics: ["Hash Table", "String", "Sliding Window"],
            companies: ["Amazon", "Google", "Microsoft"],
            likes: 11200,
            dislikes: 500
        },
        {
            id: 4,
            title: "Median of Two Sorted Arrays",
            difficulty: "Hard",
            status: "Not Attempted",
            acceptance: "28.9%",
            slug: "median-of-two-sorted-arrays",
            topics: ["Array", "Binary Search", "Divide and Conquer"],
            companies: ["Amazon", "Google", "Microsoft"],
            likes: 7800,
            dislikes: 200
        },
        {
            id: 5,
            title: "Longest Palindromic Substring",
            difficulty: "Medium",
            status: "Not Attempted",
            acceptance: "28.7%",
            slug: "longest-palindromic-substring",
            topics: ["String", "Dynamic Programming"],
            companies: ["Amazon", "Google", "Microsoft"],
            likes: 9500,
            dislikes: 350
        },
        {
            id: 6,
            title: "ZigZag Conversion",
            difficulty: "Medium",
            status: "Solved",
            acceptance: "35.2%",
            slug: "zigzag-conversion",
            topics: ["String"],
            companies: ["PayPal", "Adobe"],
            likes: 6800,
            dislikes: 250
        },
        {
            id: 7,
            title: "Reverse Integer",
            difficulty: "Easy",
            status: "Attempted",
            acceptance: "25.5%",
            slug: "reverse-integer",
            topics: ["Math"],
            companies: ["Apple", "Microsoft"],
            likes: 7200,
            dislikes: 180
        },
        {
            id: 8,
            title: "String to Integer (atoi)",
            difficulty: "Medium",
            status: "Not Attempted",
            acceptance: "16.6%",
            slug: "string-to-integer-atoi",
            topics: ["String", "Math"],
            companies: ["Amazon", "Microsoft"],
            likes: 5400,
            dislikes: 400
        }
    ], []);

    const allTopics = useMemo(() => {
        const topics = new Set();
        mockProblems.forEach(problem => {
            problem.topics.forEach(topic => topics.add(topic));
        });
        return Array.from(topics).sort();
    }, [mockProblems]);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProblems(mockProblems);
            setLoading(false);
        }, 1000);
    }, [mockProblems]);

    const filteredProblems = problems.filter(problem => {
        const matchesDifficulty = filters.difficulty === "All" || problem.difficulty === filters.difficulty;
        const matchesStatus = filters.status === "All" || problem.status === filters.status;
        const matchesTopic = filters.topic === "All" || problem.topics.includes(filters.topic);
        const matchesSearch = problem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                             problem.topics.some(topic => topic.toLowerCase().includes(filters.search.toLowerCase()));
        
        return matchesDifficulty && matchesStatus && matchesTopic && matchesSearch;
    });

    const sortedProblems = [...filteredProblems].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
            case "id":
                aValue = a.id;
                bValue = b.id;
                break;
            case "title":
                aValue = a.title.toLowerCase();
                bValue = b.title.toLowerCase();
                break;
            case "difficulty":
                const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
                aValue = difficultyOrder[a.difficulty];
                bValue = difficultyOrder[b.difficulty];
                break;
            case "acceptance":
                aValue = parseFloat(a.acceptance);
                bValue = parseFloat(b.acceptance);
                break;
            default:
                aValue = a.id;
                bValue = b.id;
        }

        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Solved":
                return styles.solved;
            case "Attempted":
                return styles.attempted;
            default:
                return styles.notAttempted;
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return styles.easy;
            case "medium":
                return styles.medium;
            case "hard":
                return styles.hard;
            default:
                return styles.easy;
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    if (loading) {
        return (
            <div className={styles.problems}>
                <Header />
                <main className={styles.mainContent}>
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading problems...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.problems}>
            <Header />
            
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    {/* Header Section */}
                    <div className={styles.header}>
                        <div className={styles.titleSection}>
                            <h1>Problems</h1>
                            <p>Practice coding problems to improve your skills</p>
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>{problems.length}</span>
                                <span className={styles.statLabel}>Total Problems</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>
                                    {problems.filter(p => p.status === "Solved").length}
                                </span>
                                <span className={styles.statLabel}>Solved</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>
                                    {problems.filter(p => p.status === "Attempted").length}
                                </span>
                                <span className={styles.statLabel}>Attempted</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className={styles.filters}>
                        <div className={styles.searchBox}>
                            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className={styles.searchInput}
                            />
                        </div>
                        
                        <div className={styles.filterOptions}>
                            <select
                                value={filters.difficulty}
                                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                                className={styles.filterSelect}
                            >
                                <option value="All">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className={styles.filterSelect}
                            >
                                <option value="All">All Status</option>
                                <option value="Solved">Solved</option>
                                <option value="Attempted">Attempted</option>
                                <option value="Not Attempted">Not Attempted</option>
                            </select>

                            <select
                                value={filters.topic}
                                onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
                                className={styles.filterSelect}
                            >
                                <option value="All">All Topics</option>
                                {allTopics.map(topic => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Problems Table */}
                    <div className={styles.problemsTable}>
                        <div className={styles.tableHeader}>
                            <div className={styles.tableRow}>
                                <div 
                                    className={`${styles.tableCell} ${styles.sortable}`}
                                    onClick={() => handleSort("id")}
                                >
                                    <span>#</span>
                                    <FontAwesomeIcon 
                                        icon={faSort} 
                                        className={`${styles.sortIcon} ${sortBy === "id" ? styles.active : ""}`}
                                    />
                                </div>
                                <div 
                                    className={`${styles.tableCell} ${styles.sortable}`}
                                    onClick={() => handleSort("title")}
                                >
                                    <span>Title</span>
                                    <FontAwesomeIcon 
                                        icon={faSort} 
                                        className={`${styles.sortIcon} ${sortBy === "title" ? styles.active : ""}`}
                                    />
                                </div>
                                <div 
                                    className={`${styles.tableCell} ${styles.sortable}`}
                                    onClick={() => handleSort("difficulty")}
                                >
                                    <span>Difficulty</span>
                                    <FontAwesomeIcon 
                                        icon={faSort} 
                                        className={`${styles.sortIcon} ${sortBy === "difficulty" ? styles.active : ""}`}
                                    />
                                </div>
                                <div className={styles.tableCell}>Status</div>
                                <div className={styles.tableCell}>Topics</div>
                                <div 
                                    className={`${styles.tableCell} ${styles.sortable}`}
                                    onClick={() => handleSort("acceptance")}
                                >
                                    <span>Acceptance</span>
                                    <FontAwesomeIcon 
                                        icon={faSort} 
                                        className={`${styles.sortIcon} ${sortBy === "acceptance" ? styles.active : ""}`}
                                    />
                                </div>
                                <div className={styles.tableCell}>Actions</div>
                            </div>
                        </div>

                        <div className={styles.tableBody}>
                            {sortedProblems.map(problem => (
                                <div key={problem.id} className={styles.tableRow}>
                                    <div className={styles.tableCell}>{problem.id}</div>
                                    <div className={styles.tableCell}>
                                        <Link 
                                            to={`${ROUTES.PROBLEM_DETAIL.replace(':slug', problem.slug)}`}
                                            className={styles.problemTitle}
                                        >
                                            {problem.title}
                                        </Link>
                                    </div>
                                    <div className={styles.tableCell}>
                                        <span className={`${styles.difficulty} ${getDifficultyColor(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <div className={styles.tableCell}>
                                        <span className={`${styles.status} ${getStatusColor(problem.status)}`}>
                                            {problem.status}
                                        </span>
                                    </div>
                                    <div className={styles.tableCell}>
                                        <div className={styles.topics}>
                                            {problem.topics.slice(0, 2).map((topic, index) => (
                                                <span key={index} className={styles.topic}>
                                                    {topic}
                                                </span>
                                            ))}
                                            {problem.topics.length > 2 && (
                                                <span className={styles.moreTopics}>
                                                    +{problem.topics.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.tableCell}>
                                        <span className={styles.acceptance}>
                                            {problem.acceptance}
                                        </span>
                                    </div>
                                    <div className={styles.tableCell}>
                                        <Link 
                                            to={`${ROUTES.PROBLEM_DETAIL.replace(':slug', problem.slug)}`}
                                            className={styles.solveBtn}
                                        >
                                            {problem.status === "Solved" ? "View" : "Solve"}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {sortedProblems.length === 0 && (
                        <div className={styles.noResults}>
                            <div className={styles.noResultsIcon}>🔍</div>
                            <h3>No problems found</h3>
                            <p>Try adjusting your filters or search terms</p>
                        </div>
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Problems;
