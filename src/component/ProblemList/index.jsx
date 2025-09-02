import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import ProblemItem from "../ProblemItem";
import styles from "./ProblemList.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mockProblems } from "../../data/mockProblems";

const ProblemList = () => {
    const [problems] = useState(mockProblems);
    const [filters, setFilters] = useState({
        difficulty: "All",
        status: "All",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

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

    const filteredAndSortedProblems = problems
        .filter((problem) => {
            const matchesSearch = problem.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesDifficulty =
                filters.difficulty === "All" ||
                problem.difficulty === filters.difficulty;
            const matchesStatus =
                filters.status === "All" ||
                (filters.status === "Solved" && problem.status === "solved") ||
                (filters.status === "Unsolved" && !problem.status);
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
                        {filteredAndSortedProblems.length}/{problems.length}{" "}
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
                {filteredAndSortedProblems.length > 0 ? (
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
