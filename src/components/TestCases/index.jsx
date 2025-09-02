import React from "react";
import styles from "./TestCases.module.scss";

const TestCases = ({ customInput, setCustomInput, customOutput, setCustomOutput }) => {
    return (
        <div className={styles.testCases}>
            <div className={styles.header}>
                <h3>Custom Test Case</h3>
                <p>Test your code with custom input and expected output</p>
            </div>

            <div className={styles.content}>
                <div className={styles.inputSection}>
                    <label htmlFor="customInput">Input:</label>
                    <textarea
                        id="customInput"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter your test input here...
Example for Two Sum:
2 7 11 15
9"
                        rows={8}
                        className={styles.inputTextarea}
                    />
                    <div className={styles.inputInfo}>
                        <span>💡 Tip: Use new lines to separate multiple inputs</span>
                    </div>
                </div>

                <div className={styles.outputSection}>
                    <label htmlFor="customOutput">Expected Output:</label>
                    <textarea
                        id="customOutput"
                        value={customOutput}
                        onChange={(e) => setCustomOutput(e.target.value)}
                        placeholder="Enter expected output here...
Example for Two Sum:
0 1"
                        rows={8}
                        className={styles.outputTextarea}
                    />
                    <div className={styles.outputInfo}>
                        <span>💡 Tip: Output should match exactly what your code produces</span>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.actions}>
                    <button className={styles.clearBtn} onClick={() => {
                        setCustomInput("");
                        setCustomOutput("");
                    }}>
                        Clear All
                    </button>
                    <button className={styles.exampleBtn} onClick={() => {
                        setCustomInput("2 7 11 15\n9");
                        setCustomOutput("0 1");
                    }}>
                        Load Example
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestCases;

