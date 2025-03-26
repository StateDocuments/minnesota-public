# ⚠️ CRITICAL: Preventing Command Disappearance

- **ABSOLUTELY NO COMMENTS IN PACKAGE.JSON**: Standard JSON does not support comments. Never add comment lines to package.json even though VS Code might display them without errors - they break extension loading silently.
- **ALWAYS VERIFY COMMAND VISIBILITY**: After any change to package.json or command registration, verify that commands with the "CieloVistaSoftware:" prefix appear in the VS Code command palette (Ctrl+Shift+P)
- **PACKAGE.JSON VALIDATION**: Any syntax error, trailing comma, or unclosed bracket in package.json can cause ALL commands to disappear from the interface
- **TEST AFTER EVERY CHANGE**: Run the extension after each significant change to ensure commands remain visible
- **CONSISTENT REGISTRATION**: Ensure each command is registered in both "commands" and "commandPalette" sections with identical IDs


## ALWAYS FOLLOW THESE RULES

1. **Package.json Structural Issues**:
   - **Problem**: Commands disappearing from VS Code interface
   - **Fix**: Corrected JSON syntax in package.json, especially:
     - Removed trailing commas after the last item in arrays and objects
     - Properly closed all brackets and braces in nested structures
     - Ensured each command was registered in both the "commands" and "commandPalette" sections
     - Fixed inconsistent indentation that caused parsing errors
     - Removed ALL comments from package.json (JSON doesn't support comments)

2. **Module Import/Export Problems**:
   - **Problem**: "X is not exported from Y" errors during build
   - **Fix**: Corrected import/export patterns:
     - Changed `export default function X()` to `export function X()` for consistent named exports
     - Updated all import statements to match the actual exported names
     - Fixed file references in import statements (e.g., `import { log } from '../core/logger'` vs `from './logger.js'`)
     - Ensured logger functions were consistently exported and imported with exact matching names

3. **Vite/Rollup Configuration**:
   - **Problem**: Build output incompatible with VS Code extension loader
   - **Fix**: Created precise build configuration:
     ```javascript
     export default defineConfig({
       build: {
         target: 'node14',
         outDir: 'out',
         lib: {
           entry: path.resolve(__dirname, 'src/main.ts'),
           formats: ['cjs'],
           fileName: () => 'main.js',
         },
         rollupOptions: {
           external: ['vscode', ...nodeBuiltins],
           output: {
             format: 'cjs',
             entryFileNames: '[name].js',
           }
         },
         sourcemap: true,
         emptyOutDir: true,
         ssr: true // Critical for proper CommonJS output
       }
     });
     ```
     - The `ssr: true` parameter was particularly essential for correctly handling the CommonJS format

4. **Command Registration Execution**:
   - **Problem**: Commands registered but not actually available at runtime
   - **Fix**: Fixed command registration through:
     - Added proper error handling around command registration to catch subtle issues
     - Ensured command IDs in code matched exactly with package.json
     - Created a consistent command prefix pattern
     - Used the `context.subscriptions.push()` pattern consistently
     - Added clear logging around command registration for debugging

5. **File Path Resolution Errors**:
   - **Problem**: Files not found or path resolution errors during runtime
   - **Fix**: Standardized path handling:
     - Used `path.resolve()` and `path.join()` consistently for file paths
     - Avoided hardcoded path separators (using '/' or '\\')
     - Fixed __dirname references in the compiled output
     - Added robust existence checks (`fs.existsSync()`) before file operations

6. **Duplicate Function/Variable Declarations**:
   - **Problem**: Build errors due to duplicate declarations
   - **Fix**: Resolved through:
     - Renamed functions to avoid conflicts (e.g., changing `copyTemplateFiles` to `copyHtmlTemplateFiles`)
     - Restructured files to avoid duplicate declarations
     - Separated functionality into discrete files with clear boundaries
     - Added clear naming patterns to avoid accidental collisions

7. **Lack of Error Boundaries**:
   - **Problem**: Unhandled exceptions causing extension to silently fail
   - **Fix**: Implemented comprehensive error handling:
     - Added try/catch blocks around all external API calls
     - Implemented proper error logging with meaningful messages
     - Used consistent error object handling pattern
     - Added fallback paths for common error scenarios
     - Created an extension error channel for debugging

These specific technical fixes resolved the core issues that were preventing the extension from functioning properly. The most challenging aspect was the interplay between these different systems - often fixing one issue would reveal another underlying problem that needed addressing.

## Remaining Areas to Validate

1. **Complete Command Testing**: Ensure all commands work correctly in different VS Code environments

2. **Webview Functionality**: Verify that webviews display correctly and handle user interactions

3. **Error Handling**: Test edge cases and error scenarios to ensure graceful recovery

4. **Performance**: Monitor memory usage and responsiveness during extended use

5. **Cross-Platform Behavior**: Test on Windows, macOS, and Linux to catch platform-specific issues

## Next Steps Recommendation

1. Create a test plan covering each command and feature
2. Add automated tests where possible
3. Consider adding telemetry to identify issues in the field
4. Set up a proper versioning and release process
5. Document the extension thoroughly for both users and future developers

This project demonstrates why modern JavaScript/TypeScript development can be challenging - the tooling ecosystem evolves rapidly, and integration points between different systems (VS Code, Vite, Node.js modules) often have subtle compatibility requirements.