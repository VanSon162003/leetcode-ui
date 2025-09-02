"use client";

import { useCallback, useReducer } from "react";
import { ProblemContext } from "./problem-context-definition";

const problemsReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_PROBLEMS":
            return { ...state, problems: action.payload, loading: false };
        case "SET_FILTER":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterType]: action.payload.value,
                },
            };
        default:
            return state;
    }
};

export function ProblemProvider({ children }) {
    const [state, dispatch] = useReducer(problemsReducer, {
        problems: [],
        loading: false,
        filters: { difficulty: "All", status: "All" },
    });

    const fetchProblems = useCallback(async () => {
        dispatch({ type: "SET_LOADING", payload: true });

        // Mock API call - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockProblems = [
            {
                id: 1,
                title: "Two Sum",
                difficulty: "Easy",
                acceptance: "44.8%",
                status: "solved",
            },
            {
                id: 2,
                title: "Add Two Numbers",
                difficulty: "Medium",
                acceptance: "35.6%",
            },
            {
                id: 3,
                title: "Longest Substring Without Repeating Characters",
                difficulty: "Medium",
                acceptance: "32.4%",
                status: "solved",
            },
            // Add more mock problems as needed
        ];

        dispatch({ type: "SET_PROBLEMS", payload: mockProblems });
    }, []);

    const setFilter = useCallback((filterType, value) => {
        dispatch({ type: "SET_FILTER", payload: { filterType, value } });
    }, []);

    return (
        <ProblemContext.Provider
            value={{
                problems: state.problems,
                loading: state.loading,
                filters: state.filters,
                fetchProblems,
                setFilter,
            }}
        >
            {children}
        </ProblemContext.Provider>
    );
}
