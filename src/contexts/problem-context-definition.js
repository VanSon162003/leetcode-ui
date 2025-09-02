import { createContext } from "react";

export const ProblemContext = createContext({
    problems: [],
    loading: false,
    filters: { difficulty: "All", status: "All" },
    fetchProblems: () => {},
    setFilter: () => {},
});
