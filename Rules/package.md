## Rules for package.json

When working with VS Code extensions, the `package.json` file serves as both the configuration manifest and command registry. These rules will help avoid common issues that can cause commands to disappear or the extension to fail:

### 1. JSON Syntax Rules

- **No trailing commas**: Never leave a comma after the last item in an array or object
  ```json
  // WRONG ❌
  "commandPalette": [
    { "command": "vscodeutils.test" },
  ]
  
  // CORRECT ✅
  "commandPalette": [
    { "command": "vscodeutils.test" }
  ]
  ```

- **Proper bracket nesting**: Ensure all brackets and braces are properly closed and nested
  ```json
  // WRONG ❌
  "menus": {
    "editor/context": [
      { "command": "vscodeutils.test" }
    ],  // Missing closing bracket for "menus"
  
  // CORRECT ✅
  "menus": {
    "editor/context": [
      { "command": "vscodeutils.test" }
    ]
  }
  ```

- **Consistent indentation**: Use consistent indentation (preferably 2 spaces) for readability and to avoid subtle errors

- **No comments in JSON**: Despite VS Code allowing them, avoid JavaScript-style comments in package.json as they may cause issues with other tools

### 2. Command Registration Rules

- **Register every command twice**: Each command must appear in both the `commands` array and the `commandPalette` menus section
  ```json
  "commands": [
    {
      "command": "vscodeutils.test",
      "title": "CieloVistaSoftware: Test Command"
    }
  ],
  "menus": {
    "commandPalette": [
      {
        "command": "vscodeutils.test"
      }
    ]
  }
  ```

- **Consistent command prefixes**: Always use the same prefix for command IDs (`vscodeutils.`) and titles (`CieloVistaSoftware:`)

- **Exact command ID matching**: The command ID in your TypeScript files must exactly match the ID in package.json

- **Group context menu items**: If adding commands to context menus, assign them to a specific group
  ```json
  "editor/context": [
    {
      "command": "vscodeutils.test",
      "group": "CieloVistaSoftware"
    }
  ]
  ```

### 3. Extension Metadata Rules

- **Complete required fields**: Always include `name`, `displayName`, `version`, `description`, `publisher`, `engines`, and `main`

- **Activation events**: Include appropriate activation events for your extension
  ```json
  "activationEvents": [
    "onStartupFinished"
  ]
  ```

- **Specify VS Code version**: Set the minimum VS Code version in the `engines` field
  ```json
  "engines": {
    "vscode": "^1.60.0"
  }
  ```

- **Main entry point**: The `main` field must point to your compiled output file, not source
  ```json
  "main": "./out/main.js"
  ```

### 4. Workflow and Build Rules

- **Include useful scripts**: Define scripts for common operations like build, watch, package, and clean
  ```json
  "scripts": {
    "compile": "vite build",
    "watch": "vite build --watch",
    "package": "vsce package",
    "clean": "rimraf out && rimraf *.vsix",
    "start": "npm run compile && npm run package && code --uninstall-extension publisher.extension || echo 'Not installed' && code --install-extension extension-1.0.0.vsix && code --command workbench.action.reloadWindow"
  }
  ```

- **Specify all dependencies**: List all runtime and development dependencies with appropriate versions

- **No extraneous dependencies**: Remove unused dependencies to avoid bloat and potential conflicts

### 5. Extension Marketplace Rules

- **Add repository information**: Include accurate repository URL for source control reference
  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repository"
  }
  ```

- **Specify categories**: Include appropriate categories to help users find your extension

- **License field**: Specify the license under which your extension is distributed

By following these rules, you can avoid many common issues with VS Code extension development and ensure your extension's commands remain visible and functional.