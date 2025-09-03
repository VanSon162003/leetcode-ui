import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import ProblemItem from "../ProblemItem";
import styles from "./ProblemList.module.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiService } from "../../services/api.js";
import { useAuth } from "../../hooks/useAuth";

const ProblemList = () => {
    const { user, isAuthenticated } = useAuth();
    const [problems, setProblems] = useState([]);
    const [userProblems, setUserProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        difficulty: "All",
        status: "All",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    // Load problems and user progress
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load problems
                const problemsResponse = await apiService.getProblems();
                setProblems(problemsResponse.problems || []);

                // Load user problems if authenticated
                if (isAuthenticated && user?.id) {
                    try {
                        const userProblemsResponse = await apiService.getUserProblems(user.id);
                        setUserProblems(userProblemsResponse.rows || []);
                    } catch (userError) {
                        console.warn("Failed to load user problems:", userError);
                        // Don't set error for user problems, just continue without them
                    }
                }
            } catch (err) {
                console.error("Failed to load problems:", err);
                setError("Failed to load problems. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [isAuthenticated, user?.id]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    // Helper function to get user problem status
    const getUserProblemStatus = (problemId) => {
        const userProblem = userProblems.find(up => up.problemId === problemId);
        return userProblem ? userProblem.status : 'Not Started';
    };

    const filteredAndSortedProblems = problems
        .map(problem => ({
            ...problem,
            userStatus: getUserProblemStatus(problem.id)
        }))
        .filter((problem) => {
            const matchesSearch = problem.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesDifficulty =
                filters.difficulty === "All" ||
                problem.difficulty === filters.difficulty;
            const matchesStatus =
                filters.status === "All" ||
                (filters.status === "Solved" && problem.userStatus === "Completed") ||
                (filters.status === "Unsolved" && problem.userStatus !== "Completed");
            return matchesSearch && matchesDifficulty && matchesStatus;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === "acceptance") {
                aValue = Number.parseFloat(a.acceptance);
                bValue = Number.parseFloat(b.acceptance);
            }

            if (sortOrder === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    return (
        <div className={styles.container}>
            {/* Search and Filters */}
            <div className={styles.controls}>
                <div className={styles.searchContainer}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={styles.searchIcon}
                    />
                    <input
                        type="text"
                        placeholder="Search questions"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={filters.difficulty}
                        onChange={(e) =>
                            handleFilterChange("difficulty", e.target.value)
                        }
                        className={styles.filterSelect}
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <select
                        value={filters.status}
                        onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                        }
                        className={styles.filterSelect}
                    >
                        <option value="All">All Status</option>
                        <option value="Solved">Solved</option>
                        <option value="Unsolved">Unsolved</option>
                    </select>
                </div>

                <div className={styles.stats}>
                    <span className={styles.statText}>
                        {userProblems.filter(up => up.status === 'Completed').length}/{problems.length}{" "}
                        Solved
                    </span>
                </div>
            </div>

            {/* Problem List Header */}
            <div className={styles.listHeader}>
                <button
                    className={styles.headerButton}
                    onClick={() => handleSort("id")}
                >
                    <span>Status</span>
                    <FontAwesomeIcon
                        icon={faSort}
                        className={styles.sortIcon}
                    />
                </button>
                <button
                    className={styles.headerButton}
                    onClick={() => handleSort("title")}
                >
                    <span>Title</span>
                    <FontAwesomeIcon
                        icon={faSort}
                        className={styles.sortIcon}
                    />
                </button>
                <button
                    className={styles.headerButton}
                    onClick={() => handleSort("acceptance")}
                >
                    <span>Acceptance</span>
                    <FontAwesomeIcon
                        icon={faSort}
                        className={styles.sortIcon}
                    />
                </button>
                <button
                    className={styles.headerButton}
                    onClick={() => handleSort("difficulty")}
                >
                    <span>Difficulty</span>
                    <FontAwesomeIcon
                        icon={faSort}
                        className={styles.sortIcon}
                    />
                </button>
                <div className={styles.headerCell}>Frequency</div>
            </div>

            {/* Problem List */}
            <div className={styles.problemList}>
                {loading ? (
                    <div className={styles.loadingState}>
                        <p>Loading problems...</p>
                    </div>
                ) : error ? (
                    <div className={styles.errorState}>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>
                            Retry
                        </button>
                    </div>
                ) : filteredAndSortedProblems.length > 0 ? (
                    filteredAndSortedProblems.map((problem) => (
                        <ProblemItem key={problem.id} problem={problem} />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>No problems found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemList;
