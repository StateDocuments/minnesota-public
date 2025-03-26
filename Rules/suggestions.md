# VS Code Extension Development Suggestion Rules

This document outlines the established rules for making code suggestions for 
- Any Visual Studio Code extension using React
- Any React project
- The favored language is Typescript
- Following these rules helps maintain consistency, avoid common pitfalls, and prevent regressions.

## 1. File Path Requirements

### Always Include Complete File Paths
Every code suggestion must include the absolute file path as a comment at the top.
It must also use an exact file path so that clicking on apply to editor automatically opens the file

Adding coments to first line of all code suggestions, note it's ok to start at just the src folder.
```typescript
// filepath: c:\Users\jwpmi\Downloads\VSCode\VSCodeUtils\src\commands\example.ts
export function exampleFunction() {
    // Implementation
}
```

### No Suggestions Without File Context
Never suggest code changes without specifying which file they belong to. 
For existing file, then clicking on apply to editor that file will be used.
For non existing files, a sugessed file name and proper folder must be included.

## 2. Code Formatting Standards

### Use Proper Code Blocks
Always use markdown code blocks with appropriate language identifiers.
Use four back ticks for code blocks.
This is an example of code identifier.
````typescript
// Code example here
````

## 3 Acknoledgeement
Always confirm and ack. this file has been read and will be followed.