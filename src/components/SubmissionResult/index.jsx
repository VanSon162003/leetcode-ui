import React from "react";
import styles from "./SubmissionResult.module.scss";

const SubmissionResult = ({ 
    testResult, 
    submissionResult, 
    showTestResult, 
    isRunning, 
    isSubmitting 
}) => {
    if (isRunning) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <h3>Running Code...</h3>
                <p>Please wait while your code is being executed</p>
            </div>
        );
    }

    if (isSubmitting) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <h3>Submitting Code...</h3>
                <p>Please wait while your code is being tested against all test cases</p>
            </div>
        );
    }

    if (!showTestResult && !submissionResult) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📝</div>
                <h3>No Results Yet</h3>
                <p>Run your code or submit it to see the results here</p>
            </div>
        );
    }

    // Display test result (single execution)
    if (showTestResult && testResult) {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <h3>Test Result</h3>
                    <span className={`${styles.status} ${styles[testResult.status?.toLowerCase()] || styles.unknown}`}>
                        {testResult.status || 'Unknown'}
                    </span>
                </div>

                <div className={styles.resultContent}>
                    {testResult.stdout && (
                        <div className={styles.outputSection}>
                            <h4>Output:</h4>
                            <pre className={styles.output}>{testResult.stdout}</pre>
                        </div>
                    )}

                    {testResult.stderr && (
                        <div className={styles.errorSection}>
                            <h4>Error:</h4>
                            <pre className={styles.error}>{testResult.stderr}</pre>
                        </div>
                    )}

                    {testResult.compile_output && (
                        <div className={styles.compileSection}>
                            <h4>Compilation Output:</h4>
                            <pre className={styles.compile}>{testResult.compile_output}</pre>
                        </div>
                    )}

                    <div className={styles.metrics}>
                        <div className={styles.metric}>
                            <span className={styles.metricLabel}>Time:</span>
                            <span className={styles.metricValue}>{testResult.time}s</span>
                        </div>
                        <div className={styles.metric}>
                            <span className={styles.metricLabel}>Memory:</span>
                            <span className={styles.metricValue}>{testResult.memory} KB</span>
                        </div>
                        <div className={styles.metric}>
                            <span className={styles.metricLabel}>Language:</span>
                            <span className={styles.metricValue}>{testResult.language}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Display submission result (multiple test cases)
    if (submissionResult && submissionResult.type === "multiple") {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <h3>Submission Results</h3>
                    <div className={styles.summary}>
                        <span className={styles.summaryItem}>
                            <span className={styles.summaryLabel}>Total:</span>
                            <span className={styles.summaryValue}>{submissionResult.summary.total}</span>
                        </span>
                        <span className={styles.summaryItem}>
                            <span className={styles.summaryLabel}>Passed:</span>
                            <span className={`${styles.summaryValue} ${styles.passed}`}>
                                {submissionResult.summary.passed}
                            </span>
                        </span>
                        <span className={styles.summaryItem}>
                            <span className={styles.summaryLabel}>Failed:</span>
                            <span className={`${styles.summaryValue} ${styles.failed}`}>
                                {submissionResult.summary.failed}
                            </span>
                        </span>
                    </div>
                </div>

                <div className={styles.resultContent}>
                    {submissionResult.results.map((result, index) => (
                        <div key={index} className={styles.testCaseResult}>
                            <div className={styles.testCaseHeader}>
                                <h4>Test Case {index + 1}</h4>
                                <span className={`${styles.status} ${styles[result.status?.toLowerCase()] || styles.unknown}`}>
                                    {result.status || 'Unknown'}
                                </span>
                            </div>

                            {result.stdout && (
                                <div className={styles.outputSection}>
                                    <h5>Output:</h5>
                                    <pre className={styles.output}>{result.stdout}</pre>
                                </div>
                            )}

                            {result.stderr && (
                                <div className={styles.errorSection}>
                                    <h5>Error:</h5>
                                    <pre className={styles.error}>{result.stderr}</pre>
                                </div>
                            )}

                            <div className={styles.testCaseMetrics}>
                                <div className={styles.metric}>
                                    <span className={styles.metricLabel}>Time:</span>
                                    <span className={styles.metricValue}>{result.time}s</span>
                                </div>
                                <div className={styles.metric}>
                                    <span className={styles.metricLabel}>Memory:</span>
                                    <span className={styles.metricValue}>{result.memory} KB</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Display error
    if (submissionResult && submissionResult.type === "error") {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultHeader}>
                    <h3>Submission Error</h3>
                    <span className={`${styles.status} ${styles.error}`}>Error</span>
                </div>
                <div className={styles.resultContent}>
                    <div className={styles.errorSection}>
                        <h4>Error Details:</h4>
                        <pre className={styles.error}>{submissionResult.error}</pre>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default SubmissionResult;

