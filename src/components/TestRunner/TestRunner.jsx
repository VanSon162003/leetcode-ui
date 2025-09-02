import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './TestRunner.module.scss';

const TestRunner = ({ problem, userCode, onTestComplete }) => {
    const [testResults, setTestResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [allTestsPassed, setAllTestsPassed] = useState(false);

    // Safe evaluation function
    const safeEvaluate = useCallback((code, testCase) => {
        try {
            // Create a safe execution environment
            // eslint-disable-next-line no-new-func
            const func = new Function('return ' + code)();
            
            // Handle different function signatures
            if (problem.slug === 'two-sum') {
                return func(testCase.input.nums, testCase.input.target);
            } else if (problem.slug === 'add-two-numbers') {
                // Convert arrays to linked list structure
                const l1 = arrayToList(testCase.input.l1);
                const l2 = arrayToList(testCase.input.l2);
                const result = func(l1, l2);
                return listToArray(result);
            } else if (problem.slug === 'longest-substring-without-repeating-characters') {
                return func(testCase.input.s);
            } else if (problem.slug === 'median-of-two-sorted-arrays') {
                return func(testCase.input.nums1, testCase.input.nums2);
            } else if (problem.slug === 'longest-palindromic-substring') {
                return func(testCase.input.s);
            } else if (problem.slug === 'zigzag-conversion') {
                return func(testCase.input.s, testCase.input.numRows);
            } else if (problem.slug === 'reverse-integer') {
                return func(testCase.input.x);
            } else if (problem.slug === 'string-to-integer-atoi') {
                return func(testCase.input.s);
            }
            
            return null;
        } catch (error) {
            throw new Error(`Runtime Error: ${error.message}`);
        }
    }, [problem.slug]);

    // Helper functions for linked list problems
    const arrayToList = (arr) => {
        if (!arr || arr.length === 0) return null;
        const head = { val: arr[0], next: null };
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            current.next = { val: arr[i], next: null };
            current = current.next;
        }
        return head;
    };

    const listToArray = (head) => {
        const result = [];
        let current = head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    };

    // Deep equality check for arrays and objects
    const deepEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!deepEqual(a[i], b[i])) return false;
            }
            return true;
        }
        if (typeof a === 'object' && typeof b === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            for (let key of keysA) {
                if (!keysB.includes(key)) return false;
                if (!deepEqual(a[key], b[key])) return false;
            }
            return true;
        }
        return false;
    };

    const runTests = async () => {
        if (!userCode.trim()) {
            if (typeof window !== 'undefined') {
                alert('Please write some code before running tests!');
            }
            return;
        }

        setIsRunning(true);
        setTestResults([]);
        setAllTestsPassed(false);

        const results = [];
        let passedCount = 0;

        for (let i = 0; i < problem.testCases.length; i++) {
            const testCase = problem.testCases[i];
            const result = {
                testCase: i + 1,
                description: testCase.description,
                input: testCase.input,
                expected: testCase.expected,
                actual: null,
                passed: false,
                error: null,
                executionTime: 0
            };

            try {
                const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
                const actual = safeEvaluate(userCode, testCase);
                const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
                
                result.actual = actual;
                result.executionTime = Math.round(endTime - startTime);
                result.passed = deepEqual(actual, testCase.expected);
                
                if (result.passed) {
                    passedCount++;
                }
            } catch (error) {
                result.error = error.message;
                result.passed = false;
            }

            results.push(result);
            
            // Add small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        setTestResults(results);
        setAllTestsPassed(passedCount === problem.testCases.length);
        setIsRunning(false);

        // Notify parent component
        if (onTestComplete) {
            onTestComplete({
                passed: passedCount,
                total: problem.testCases.length,
                allPassed: passedCount === problem.testCases.length,
                results: results
            });
        }
    };

    const getStatusIcon = (result) => {
        if (result.error) {
            return <FontAwesomeIcon icon={faTimes} className={styles.errorIcon} />;
        }
        return result.passed ? 
            <FontAwesomeIcon icon={faCheck} className={styles.successIcon} /> :
            <FontAwesomeIcon icon={faTimes} className={styles.failIcon} />;
    };

    const getStatusText = (result) => {
        if (result.error) {
            return 'Error';
        }
        return result.passed ? 'Passed' : 'Failed';
    };

    const getStatusClass = (result) => {
        if (result.error) {
            return styles.error;
        }
        return result.passed ? styles.success : styles.fail;
    };

    return (
        <div className={styles.testRunner}>
            <div className={styles.header}>
                <h3>Test Cases</h3>
                <button 
                    className={styles.runButton}
                    onClick={runTests}
                    disabled={isRunning}
                >
                    {isRunning ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className={styles.spinning} />
                            Running...
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faPlay} />
                            Run Tests
                        </>
                    )}
                </button>
            </div>

            {testResults.length > 0 && (
                <div className={styles.summary}>
                    <div className={styles.summaryStats}>
                        <span className={styles.passed}>
                            {testResults.filter(r => r.passed).length} passed
                        </span>
                        <span className={styles.failed}>
                            {testResults.filter(r => !r.passed).length} failed
                        </span>
                        <span className={styles.total}>
                            {testResults.length} total
                        </span>
                    </div>
                    {allTestsPassed && (
                        <div className={styles.congratulations}>
                            🎉 Congratulations! All tests passed!
                        </div>
                    )}
                </div>
            )}

            <div className={styles.testResults}>
                {testResults.map((result, index) => (
                    <div key={index} className={`${styles.testCase} ${getStatusClass(result)}`}>
                        <div className={styles.testHeader}>
                            <div className={styles.testInfo}>
                                {getStatusIcon(result)}
                                <span className={styles.testNumber}>Test {result.testCase}</span>
                                <span className={styles.testStatus}>{getStatusText(result)}</span>
                                {result.executionTime > 0 && (
                                    <span className={styles.executionTime}>
                                        ({result.executionTime}ms)
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.testDescription}>
                            {result.description}
                        </div>

                        <div className={styles.testDetails}>
                            <div className={styles.testInput}>
                                <strong>Input:</strong>
                                <pre>{JSON.stringify(result.input, null, 2)}</pre>
                            </div>
                            
                            <div className={styles.testExpected}>
                                <strong>Expected:</strong>
                                <pre>{JSON.stringify(result.expected, null, 2)}</pre>
                            </div>
                            
                            {result.error ? (
                                <div className={styles.testError}>
                                    <strong>Error:</strong>
                                    <pre>{result.error}</pre>
                                </div>
                            ) : (
                                <div className={styles.testActual}>
                                    <strong>Actual:</strong>
                                    <pre>{JSON.stringify(result.actual, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {testResults.length === 0 && !isRunning && (
                <div className={styles.noTests}>
                    <p>Click "Run Tests" to execute your solution against all test cases.</p>
                </div>
            )}
        </div>
    );
};

export default TestRunner;
