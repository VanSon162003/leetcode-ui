import React, { useState, useEffect } from "react";
import styles from "./CodeEditor.module.scss";

const CodeEditor = ({ code, language, onChange, theme }) => {
    const [lineNumbers, setLineNumbers] = useState([]);
    const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });

    // Update line numbers when code changes
    useEffect(() => {
        const lines = code.split('\n');
        setLineNumbers(Array.from({ length: lines.length }, (_, i) => i + 1));
    }, [code]);

    // Handle textarea changes
    const handleChange = (e) => {
        onChange(e.target.value);
        updateCursorPosition(e.target);
    };

    // Handle key events for cursor position
    const handleKeyUp = (e) => {
        updateCursorPosition(e.target);
    };

    const handleClick = (e) => {
        updateCursorPosition(e.target);
    };

    // Update cursor position
    const updateCursorPosition = (textarea) => {
        const { selectionStart, value } = textarea;
        const lines = value.substring(0, selectionStart).split('\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;
        setCursorPosition({ line, col });
    };

    // Handle tab key
    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            const newValue = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
            onChange(newValue);
            
            // Set cursor position after tab
            setTimeout(() => {
                e.target.setSelectionRange(selectionStart + 4, selectionStart + 4);
            }, 0);
        }
    };

    // Get language extension for syntax highlighting
    const getLanguageExtension = () => {
        const languageMap = {
            54: 'cpp', // C++17
            71: 'python', // Python 3
            63: 'javascript', // JavaScript
            62: 'java', // Java
            50: 'c', // C
            74: 'typescript', // TypeScript
            51: 'csharp', // C#
            73: 'rust' // Rust
        };
        return languageMap[language] || 'cpp';
    };

    return (
        <div className={styles.codeEditor}>
            {/* Line Numbers */}
            <div className={styles.lineNumbers}>
                {lineNumbers.map((lineNum) => (
                    <div key={lineNum} className={styles.lineNumber}>
                        {lineNum}
                    </div>
                ))}
            </div>

            {/* Code Textarea */}
            <div className={styles.codeArea}>
                <textarea
                    value={code}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onClick={handleClick}
                    className={styles.codeTextarea}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    data-language={getLanguageExtension()}
                    data-theme={theme}
                />
            </div>

            {/* Cursor Position Indicator */}
            <div className={styles.cursorPosition}>
                Ln {cursorPosition.line}, Col {cursorPosition.col}
            </div>
        </div>
    );
};

export default CodeEditor;

