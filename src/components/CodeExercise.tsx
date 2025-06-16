import {
  AlertCircle,
  CheckCircle2,
  CodeIcon,
  Loader2,
  Play
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "./Alert";

const CodeExercise = ({
  title,
  description,
  initialCode = "",
  testCases = []
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState(null);
  const [error, setError] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        setPyodide(pyodideInstance);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Python environment: " + err.message);
        setLoading(false);
      }
    };
    loadPyodide();
  }, []);

  const captureOutput = `
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
        self._stdout = sys.stdout
        self._stderr = sys.stderr

    def __enter__(self):
        sys.stdout = self.stdout
        sys.stderr = self.stderr
        return self

    def __exit__(self, *args):
        sys.stdout = self._stdout
        sys.stderr = self._stderr

    def get_output(self):
        return self.stdout.getvalue() + self.stderr.getvalue()
`;

  const runCode = async () => {
    if (!pyodide) return;

    setError(null);
    setOutput("");
    setTestResults(null);
    try {
      const result = await pyodide.runPython(code);
      setOutput(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const runTests = async () => {
    if (!pyodide) return;

    setError(null);
    setTestResults(null);

    try {
      // First, evaluate the user's code to define functions
      await pyodide.runPython(code);

      const results = await Promise.all(
        testCases.map(async test => {
          try {
            // Run the test case in Python
            const passed = await pyodide.runPython(test.test);
            return {
              name: test.name,
              passed: passed,
              message: passed ? "Passed!" : test.message || "Test failed"
            };
          } catch (err) {
            return {
              name: test.name,
              passed: false,
              message: err.message
            };
          }
        })
      );

      setTestResults(results);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='w-6 h-6 animate-spin mr-2' />
        <span>Loading Python environment...</span>
      </div>
    );
  }

  return (
    <div className='w-full max-w-4xl p-4 space-y-4 border rounded-lg bg-background'>
      {/* Exercise Header */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-muted-foreground'>{description}</p>
      </div>

      {/* Code Editor */}
      <div className='relative'>
        <div className='absolute top-2 right-2 text-xs text-muted-foreground'>
          <CodeIcon className='inline-block w-4 h-4 mr-1' />
          Python
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className='w-full h-64 p-4 font-mono text-sm bg-muted/50 rounded-md'
          spellCheck='false'
        />
      </div>

      {/* Controls */}
      <div className='flex gap-2'>
        <button
          onClick={runCode}
          disabled={!pyodide}
          className='inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50'
        >
          <Play className='w-4 h-4 mr-2' />
          Run Code
        </button>
        <button
          onClick={runTests}
          disabled={!pyodide}
          className='inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 disabled:opacity-50'
        >
          <CheckCircle2 className='w-4 h-4 mr-2' />
          Run Tests
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className='p-4 bg-muted rounded-md'>
          <h4 className='text-sm font-semibold mb-2'>Output:</h4>
          <pre className='whitespace-pre-wrap text-sm'>{output}</pre>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Test Results */}
      {testResults && (
        <div className='space-y-2'>
          <h4 className='text-sm font-semibold'>Test Results:</h4>
          {testResults.map((result, index) => (
            <Alert
              key={index}
              variant={result.passed ? "default" : "destructive"}
            >
              <div className='flex items-center'>
                {result.passed ? (
                  <CheckCircle2 className='h-4 w-4 mr-2' />
                ) : (
                  <AlertCircle className='h-4 w-4 mr-2' />
                )}
                <div>
                  <AlertTitle>{result.name}</AlertTitle>
                  <AlertDescription>{result.message}</AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeExercise;
