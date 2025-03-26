# React Development Rules

> Last Updated: March 25, 2025  
> Target React Version: 18.x

## Table of Contents
- [React Development Rules](#react-development-rules)
  - [Table of Contents](#table-of-contents)
  - [General Rules](#general-rules)

## General Rules

- **Development Approach**: Don't assume this is a VSCode plugin without asking
- **Debugging**: Include meaningful `console.log`, `console.warn` statements for debugging
  ```jsx
  // Good
  console.log('User data received:', userData);
  
  // Avoid
  console.log('x', x);
  ```

- Don't use axios, use react query
- All projects HTML will use `<Header>`, `<Main>`, and `<Footer>` semantic elements, they may be integrated into Header, Main and Footer components.
- In the footer there should be an element which automatically shows browser errors being returned; it will have a button to hide
- In this same folder read and follow all rules in [stylingrules.md](c:\Users\jwpmi\Downloads\eyeon\publicImages\Rules\stylingrules.md)
- In this same folder read and follow all rules in [suggestionRules.md](c:\Users\jwpmi\Downloads\eyeon\publicImages\Rules\suggestionRules.md)
- In this same folder read and follow all rules in [viterules.md](c:\Users\jwpmi\Downloads\eyeon\publicImages\Rules\viterules.md)