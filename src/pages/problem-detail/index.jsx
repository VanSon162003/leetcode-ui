import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import CodeEditor from "../../components/CodeEditor";
import ProblemDescription from "../../components/ProblemDescription";
import TestCases from "../../components/TestCases";
import SubmissionResult from "../../components/SubmissionResult";
import TestRunner from "../../components/TestRunner/TestRunner";
import { useTheme } from "../../contexts/use-theme";
import { mockProblemDetails } from "../../data/mockProblemDetails";
import styles from "./ProblemDetail.module.scss";

const ProblemDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
        return <div>Loading...</div>;
    }
    
    // State management
    const [problem, setProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("javascript"); // JavaScript default
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [customOutput, setCustomOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [activeTab, setActiveTab] = useState("description"); // description, editorial, solutions, submissions
    const [activeCodeTab, setActiveCodeTab] = useState("code"); // code, testcase, result
    const [showTestResult, setShowTestResult] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [testResults, setTestResults] = useState(null);
    const [allTestsPassed, setAllTestsPassed] = useState(false);

    // Get problem data from mock data
    const currentProblem = useMemo(() => {
        return mockProblemDetails[slug] || null;
    }, [slug]);

    // Default code templates
    const defaultCodeTemplates = useMemo(() => ({
        javascript: currentProblem?.starterCode || `function solution() {
    // Your code here
    return null;
}`,
        python: `def solution():
    # Your code here
    pass`,
        java: `class Solution {
    public int[] solution() {
        // Your code here
        return new int[]{};
    }
}`,
        cpp: `class Solution {
public:
    vector<int> solution() {
        // Your code here
        return {};
    }
};`
    }), [currentProblem]);

    // Language options
    const languages = [
        { id: "javascript", name: "JavaScript", extension: "js" },
        { id: "python", name: "Python3", extension: "py" },
        { id: "java", name: "Java", extension: "java" },
        { id: "cpp", name: "C++17", extension: "cpp" }
    ];

    useEffect(() => {
        // Set problem data
        setProblem(currentProblem);
        
        // Set default code for selected language
        if (defaultCodeTemplates[selectedLanguage]) {
            setCode(defaultCodeTemplates[selectedLanguage]);
        }
    }, [slug, selectedLanguage, defaultCodeTemplates, currentProblem]);

    // Handle language change
    const handleLanguageChange = (languageId) => {
        setSelectedLanguage(languageId);
        setSubmissionResult(null);
        setTestResult(null);
        setTestResults(null);
        setAllTestsPassed(false);
    };

    // Handle code change
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    // Handle test completion
    const handleTestComplete = (results) => {
        setTestResults(results);
        setAllTestsPassed(results.allPassed);
        
        if (results.allPassed) {
            // Show success message
            if (typeof window !== 'undefined') {
                alert('🎉 Congratulations! All tests passed! You have successfully solved this problem!');
            }
        }
    };

    // Helper function to wait for submission completion
    const waitForSubmissionCompletion = async (token, maxAttempts = 10) => {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const response = await fetch(`http://localhost:5000/api/submissions/${token}`);
                const result = await response.json();
                
                if (result.success && result.data.status !== 'In Queue' && result.data.status !== 'Processing') {
                    return result.data;
                }
                
                // Wait before next attempt
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(`Attempt ${attempt} failed:`, error);
                if (attempt === maxAttempts) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        throw new Error('Submission timeout - maximum attempts reached');
    };

    // Run code with custom input
    const handleRunCode = async () => {
        if (!code.trim()) return;
        
        setIsRunning(true);
        setActiveCodeTab("result");
        setTestResult(null);
        
        try {
            if (typeof window === 'undefined') return;
            
            const response = await fetch('http://localhost:5000/api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id: selectedLanguage,
                    stdin: customInput,
                    problemId: slug
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Wait for execution with retry logic
                const executionResult = await waitForSubmissionCompletion(result.data.token);
                setTestResult(executionResult);
                setShowTestResult(true);
            } else {
                throw new Error(result.error || 'Failed to submit code');
            }
        } catch (error) {
            console.error('Error running code:', error);
            setTestResult({
                status: 'Error',
                stderr: `Failed to execute code: ${error.message}`,
                passed: false
            });
        } finally {
            setIsRunning(false);
        }
    };

    // Submit code
    const handleSubmitCode = async () => {
        if (!code.trim()) return;
        
        setIsSubmitting(true);
        setActiveCodeTab("result");
        setSubmissionResult(null);
        
        try {
            if (typeof window === 'undefined') return;
            
            const response = await fetch('http://localhost:5000/api/submissions/test-cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id: selectedLanguage,
                    testCases: [
                        { input: "2 7 11 15\n9", output: "0 1" },
                        { input: "3 2 4\n6", output: "1 2" },
                        { input: "3 3\n6", output: "0 1" }
                    ],
                    problemId: slug
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Wait for all test cases to complete
                const testCaseResults = [];
                for (const token of result.data.tokens) {
                    try {
                        const executionResult = await waitForSubmissionCompletion(token);
                        testCaseResults.push(executionResult);
                    } catch (error) {
                        console.error(`Error getting result for token ${token}:`, error);
                        testCaseResults.push({
                            status: 'Error',
                            stderr: `Failed to get result: ${error.message}`,
                            passed: false
                        });
                    }
                }
                
                setSubmissionResult({
                    type: "multiple",
                    results: testCaseResults,
                    summary: {
                        total: testCaseResults.length,
                        passed: testCaseResults.filter(r => r.passed).length,
                        failed: testCaseResults.filter(r => !r.passed).length
                    }
                });
            } else {
                throw new Error(result.error || 'Failed to submit code');
            }
        } catch (error) {
            console.error('Error submitting code:', error);
            setSubmissionResult({
                type: "error",
                error: `Failed to submit code: ${error.message}`
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.problemDetail}>
            <Header />
            
            <main className={styles.mainContent}>
                {/* Problem Description Panel */}
                <div className={styles.leftPanel}>
                    <div className={styles.problemHeader}>
                        <div className={styles.navigation}>
                            <button 
                                className={styles.navButton}
                                onClick={() => {
                                    if (typeof window !== 'undefined') {
                                        navigate('/');
                                    }
                                }}
                            >
                                ← Problem List
                            </button>
                        </div>
                        
                        <div className={styles.problemInfo}>
                            <h1 className={styles.problemTitle}>{problem.title}</h1>
                            <div className={styles.problemMeta}>
                                <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
                                    {problem.difficulty}
                                </span>
                                <span className={styles.acceptance}>
                                    {problem.acceptance} Acceptance
                                </span>
                                <span className={styles.submissions}>
                                    {problem?.submissions?.toLocaleString()} Submissions
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Problem Tabs */}
                    <div className={styles.problemTabs}>
                        <button 
                            className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'editorial' ? styles.active : ''}`}
                            onClick={() => setActiveTab('editorial')}
                        >
                            Editorial
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'solutions' ? styles.active : ''}`}
                            onClick={() => setActiveTab('solutions')}
                        >
                            Solutions
                        </button>
                        <button 
                            className={`${styles.tab} ${activeTab === 'submissions' ? styles.active : ''}`}
                            onClick={() => setActiveTab('submissions')}
                        >
                            Submissions
                        </button>
                    </div>

                    {/* Problem Content */}
                    <div className={styles.problemContent}>
                        {activeTab === 'description' && (
                            <ProblemDescription 
                                problem={problem}
                                customInput={customInput}
                                setCustomInput={setCustomInput}
                                customOutput={customOutput}
                                setCustomOutput={setCustomOutput}
                            />
                        )}
                        {activeTab === 'editorial' && (
                            <div className={styles.editorial}>
                                <h3>Editorial</h3>
                                <p>Editorial content will be available here.</p>
                            </div>
                        )}
                        {activeTab === 'solutions' && (
                            <div className={styles.solutions}>
                                <h3>Solutions</h3>
                                <p>Community solutions will be available here.</p>
                            </div>
                        )}
                        {activeTab === 'submissions' && (
                            <div className={styles.submissions}>
                                <h3>Submissions</h3>
                                <p>Your submission history will be available here.</p>
                            </div>
                        )}
                    </div>

                    {/* Problem Footer */}
                    <div className={styles.problemFooter}>
                        <div className={styles.interactions}>
                            <button className={styles.interactionBtn}>
                                👍 {problem?.likes?.toLocaleString()}
                            </button>
                            <button className={styles.interactionBtn}>
                                👎 {problem?.dislikes?.toLocaleString()}
                            </button>
                            <button className={styles.interactionBtn}>
                                💬 {problem?.comments?.toLocaleString()}
                            </button>
                            <button className={styles.interactionBtn}>
                                💾 Save
                            </button>
                            <button className={styles.interactionBtn}>
                                📤 Share
                            </button>
                        </div>
                        <div className={styles.onlineUsers}>
                            {Math.floor(Math.random() * 5000) + 1000} Online
                        </div>
                    </div>
                </div>

                {/* Code Editor Panel */}
                <div className={styles.rightPanel}>
                    <div className={styles.editorHeader}>
                        <div className={styles.editorTabs}>
                            <button 
                                className={`${styles.editorTab} ${activeCodeTab === 'code' ? styles.active : ''}`}
                                onClick={() => setActiveCodeTab('code')}
                            >
                                Code
                            </button>
                            <button 
                                className={`${styles.editorTab} ${activeCodeTab === 'testcase' ? styles.active : ''}`}
                                onClick={() => setActiveCodeTab('testcase')}
                            >
                                Testcase
                            </button>
                            <button 
                                className={`${styles.editorTab} ${activeCodeTab === 'result' ? styles.active : ''}`}
                                onClick={() => setActiveCodeTab('result')}
                            >
                                Test Result
                            </button>
                        </div>
                        
                        <div className={styles.editorControls}>
                            <select 
                                value={selectedLanguage}
                                onChange={(e) => handleLanguageChange(parseInt(e.target.value))}
                                className={styles.languageSelect}
                            >
                                {languages.map(lang => (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                            
                            <button className={styles.controlBtn}>
                                <span>🔒</span>
                            </button>
                            <button className={styles.controlBtn}>
                                <span>⚙️</span>
                            </button>
                            <button className={styles.controlBtn}>
                                <span>↺</span>
                            </button>
                            <button className={styles.controlBtn}>
                                <span>⛶</span>
                            </button>
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className={styles.editorContent}>
                        {activeCodeTab === 'code' && (
                            <CodeEditor
                                code={code}
                                language={selectedLanguage}
                                onChange={handleCodeChange}
                                theme={theme}
                            />
                        )}
                        
                        {activeCodeTab === 'testcase' && (
                            <div className={styles.testRunnerContainer}>
                                <TestRunner
                                    problem={problem}
                                    userCode={code}
                                    onTestComplete={handleTestComplete}
                                />
                            </div>
                        )}
                        
                        {activeCodeTab === 'result' && (
                            <SubmissionResult
                                testResult={testResult}
                                submissionResult={submissionResult}
                                showTestResult={showTestResult}
                                isRunning={isRunning}
                                isSubmitting={isSubmitting}
                            />
                        )}
                    </div>

                    {/* Editor Footer */}
                    <div className={styles.editorFooter}>
                        <div className={styles.status}>
                            {isRunning ? 'Running...' : isSubmitting ? 'Submitting...' : 'Ready'}
                        </div>
                        
                        <div className={styles.actions}>
                            <button 
                                className={`${styles.actionBtn} ${styles.runBtn}`}
                                onClick={handleRunCode}
                                disabled={isRunning || isSubmitting}
                            >
                                {isRunning ? 'Running...' : 'Run'}
                            </button>
                            <button 
                                className={`${styles.actionBtn} ${styles.submitBtn} ${allTestsPassed ? styles.success : ''}`}
                                onClick={handleSubmitCode}
                                disabled={isRunning || isSubmitting || !allTestsPassed}
                                title={!allTestsPassed ? 'Complete all test cases first' : 'Submit your solution'}
                            >
                                {isSubmitting ? 'Submitting...' : allTestsPassed ? '✅ Submit' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ProblemDetail;
