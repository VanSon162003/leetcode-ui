import React from "react";
import styles from "./ProblemDescription.module.scss";

const ProblemDescription = ({ 
    problem, 
    customInput, 
    setCustomInput, 
    customOutput, 
    setCustomOutput 
}) => {
    return (
        <div className={styles.problemDescription}>
            {/* Problem Description */}
            <div className={styles.section}>
                <h3>Problem Description</h3>
                <div className={styles.description}>
                    {problem.description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>

            {/* Examples */}
            <div className={styles.section}>
                <h3>Examples</h3>
                {problem.examples && problem.examples.map((example, index) => (
                    <div key={index} className={styles.example}>
                        <h4>Example {index + 1}:</h4>
                        <div className={styles.exampleContent}>
                            <div className={styles.exampleItem}>
                                <strong>Input:</strong>
                                <code>{example.input}</code>
                            </div>
                            <div className={styles.exampleItem}>
                                <strong>Output:</strong>
                                <code>{example.output}</code>
                            </div>
                            {example.explanation && (
                                <div className={styles.exampleItem}>
                                    <strong>Explanation:</strong>
                                    <p>{example.explanation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Constraints */}
            <div className={styles.section}>
                <h3>Constraints</h3>
                <ul className={styles.constraints}>
                    {problem.constraints && problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                    ))}
                </ul>
            </div>

            {/* Follow Up */}
            {problem.followUp && (
                <div className={styles.section}>
                    <h3>Follow-up</h3>
                    <p>{problem.followUp}</p>
                </div>
            )}

            {/* Topics */}
            <div className={styles.section}>
                <h3>Related Topics</h3>
                <div className={styles.topics}>
                    {problem.topics.map((topic, index) => (
                        <span key={index} className={styles.topic}>
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            {/* Companies */}
            <div className={styles.section}>
                <h3>Companies</h3>
                <div className={styles.companies}>
                    {problem.companies.map((company, index) => (
                        <span key={index} className={styles.company}>
                            {company}
                        </span>
                    ))}
                </div>
            </div>

            {/* Custom Test Case */}
            <div className={styles.section}>
                <h3>Custom Test Case</h3>
                <div className={styles.customTestCase}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="customInput">Input:</label>
                        <textarea
                            id="customInput"
                            value={customInput}
                            onChange={(e) => setCustomInput(e.target.value)}
                            placeholder="Enter your test input here..."
                            rows={4}
                        />
                    </div>
                    <div className={styles.outputGroup}>
                        <label htmlFor="customOutput">Expected Output:</label>
                        <textarea
                            id="customOutput"
                            value={customOutput}
                            onChange={(e) => setCustomOutput(e.target.value)}
                            placeholder="Enter expected output here..."
                            rows={4}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;

