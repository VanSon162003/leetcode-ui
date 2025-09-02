"use client";

import { useContext } from "react";
import { ProblemContext } from "../contexts/problem-context/context";

export function useProblems() {
    const context = useContext(ProblemContext);
    if (!context) {
        throw new Error("useProblems must be used within a ProblemProvider");
    }
    return context;
}
