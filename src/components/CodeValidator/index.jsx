import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faTimes, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './CodeValidator.module.scss';
import { apiService } from '../../services/api.js';
import { useAuth } from '../../hooks/useAuth';

const CodeValidator = ({ problem, userCode, onValidationComplete }) => {
    const { user, isAuthenticated } = useAuth();
    const [validationResults, setValidationResults] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState(null);

    // Convert problem test cases to API format
    const convertTestCasesToAPI = useCallback((testCases) => {
        return testCases.map(testCase => {
            // Convert input to string format expected by API
            let inputString = '';
            if (problem.slug === 'two-sum') {
                inputString = `${JSON.stringify(testCase.input.nums)}\n${testCase.input.target}`;
            } else if (problem.slug === 'add-two-numbers') {
                inputString = `${JSON.stringify(testCase.input.l1)}\n${JSON.stringify(testCase.input.l2)}`;
            } else if (problem.slug === 'longest-substring-without-repeating-characters') {
                inputString = testCase.input.s;
            } else if (problem.slug === 'median-of-two-sorted-arrays') {
                inputString = `${JSON.stringify(testCase.input.nums1)}\n${JSON.stringify(testCase.input.nums2)}`;
            } else if (problem.slug === 'longest-palindromic-substring') {
                inputString = testCase.input.s;
            } else if (problem.slug === 'zigzag-conversion') {
                inputString = `${testCase.input.s}\n${testCase.input.numRows}`;
            } else if (problem.slug === 'reverse-integer') {
                inputString = testCase.input.x.toString();
            } else if (problem.slug === 'string-to-integer-atoi') {
                inputString = testCase.input.s;
            } else {
                // Default: try to stringify the input
                inputString = JSON.stringify(testCase.input);
            }

            return {
                input: inputString,
                output: JSON.stringify(testCase.expected)
            };
        });
    }, [problem.slug]);

    // Get language ID for API
    const getLanguageId = useCallback(() => {
        // Default to JavaScript for now
        return 63; // JavaScript
    }, []);

    const validateCode = async () => {
        if (!userCode.trim()) {
            setError('Please write some code before running validation!');
            return;
        }

        setIsValidating(true);
        setError(null);
        setValidationResults(null);

        try {
            const testCases = convertTestCasesToAPI(problem.testCases);
            const languageId = getLanguageId();

            const validationData = {
                source_code: userCode,
                language_id: languageId,
                problemId: problem.slug,
                testCases: testCases
            };

            console.log('Sending validation request:', validationData);

            const response = await apiService.validateCode(validationData);

            console.log('Validation response:', response);

            if (response.success) {
                setValidationResults({
                    success: true,
                    summary: response.data.summary,
                    results: response.data.results,
                    message: response.message
                });
            } else {
                setValidationResults({
                    success: false,
                    summary: response.data.summary,
                    results: response.data.results,
                    message: response.message
                });
            }

            // Save progress to database if user is authenticated
            if (isAuthenticated && user?.id) {
                try {
                    const submissionResult = {
                        status: response.success ? 'Accepted' : 'Wrong Answer',
                        executionTime: response.data.summary.averageExecutionTime || 0,
                        memoryUsed: response.data.summary.averageMemoryUsed || 0,
                        score: Math.round((response.data.summary.passed / response.data.summary.total) * 100)
                    };

                    await apiService.updateProblemProgress(user.id, problem.id, submissionResult);
                } catch (error) {
                    console.warn('Failed to save problem progress:', error);
                }
            }

            // Notify parent component
            if (onValidationComplete) {
                onValidationComplete({
                    success: response.success,
                    passed: response.data.summary.passed,
                    total: response.data.summary.total,
                    allPassed: response.data.summary.allPassed,
                    results: response.data.results
                });
            }

        } catch (error) {
            console.error('Validation error:', error);
            setError(`Validation failed: ${error.message}`);
        } finally {
            setIsValidating(false);
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

    const formatValue = (value) => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return JSON.stringify(parsed, null, 2);
            } catch {
                return value;
            }
        }
        return JSON.stringify(value, null, 2);
    };

    return (
        <div className={styles.codeValidator}>
            <div className={styles.header}>
                <h3>Code Validation</h3>
                <div className={styles.actions}>
                    <button 
                        className={styles.validateButton}
                        onClick={validateCode}
                        disabled={isValidating}
                    >
                        {isValidating ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className={styles.spinning} />
                                Validating...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPlay} />
                                Validate Code
                            </>
                        )}
                    </button>
                </div>
            </div>

            {error && (
                <div className={styles.errorMessage}>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    {error}
                </div>
            )}

            {validationResults && (
                <div className={styles.summary}>
                    <div className={styles.summaryStats}>
                        <span className={styles.passed}>
                            {validationResults.summary.passed} passed
                        </span>
                        <span className={styles.failed}>
                            {validationResults.summary.failed} failed
                        </span>
                        <span className={styles.total}>
                            {validationResults.summary.total} total
                        </span>
                    </div>
                    {validationResults.success && (
                        <div className={styles.congratulations}>
                            🎉 Congratulations! All tests passed!
                        </div>
                    )}
                    {!validationResults.success && (
                        <div className={styles.failureMessage}>
                            ❌ Some tests failed. Please check your solution.
                        </div>
                    )}
                </div>
            )}

            {validationResults && validationResults.results && (
                <div className={styles.validationResults}>
                    {validationResults.results.map((result, index) => (
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
                            
                            <div className={styles.testDetails}>
                                <div className={styles.testInput}>
                                    <strong>Input:</strong>
                                    <pre>{result.input}</pre>
                                </div>
                                
                                <div className={styles.testExpected}>
                                    <strong>Expected:</strong>
                                    <pre>{formatValue(result.expectedOutput)}</pre>
                                </div>
                                
                                {result.error ? (
                                    <div className={styles.testError}>
                                        <strong>Error:</strong>
                                        <pre>{result.error}</pre>
                                    </div>
                                ) : (
                                    <div className={styles.testActual}>
                                        <strong>Actual:</strong>
                                        <pre>{formatValue(result.actualOutput)}</pre>
                                    </div>
                                )}

                                {result.comparison && (
                                    <div className={styles.comparison}>
                                        <strong>Comparison:</strong>
                                        <span className={result.comparison.passed ? styles.comparisonPassed : styles.comparisonFailed}>
                                            {result.comparison.message}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!validationResults && !isValidating && !error && (
                <div className={styles.noValidation}>
                    <p>Click "Validate Code" to test your solution against all test cases using the backend validation system.</p>
                </div>
            )}
        </div>
    );
};

export default CodeValidator;
