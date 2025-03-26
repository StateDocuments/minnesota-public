# Application Styling Rules

This document defines best practices for styling components and implementing themes to ensure consistency and maintainability.

## 1. General Styling Guidelines

- **Use CSS Variables**: Always use `var(--variable-name)` for colors and spacing.
- **BEM Naming Convention**: Use `block__element--modifier` format for class names.
- **Mobile-First Approach**: Design for mobile screens first, then scale up with media queries.
- **Avoid Inline Styles**: Use external CSS or styled components instead.
- **Minimize Specificity**: Keep selector nesting to a minimum to avoid specificity issues.

## 2. CSS Variables

| Variable | Purpose |
|----------|---------|
| `--primary-color` | Main brand color |
| `--background-color` | Page background |
| `--card-background` | Component backgrounds |
| `--text-color` | Primary text |
| `--border-color` | Borders and dividers |
| `--shadow-color` | Box shadows |

```css
:root {
  --primary-color: #007bff;
  --background-color: #f9f9f9;
  --text-color: #333;
}

[data-theme='dark'] {
  --background-color: #121212;
  --text-color: #f0f0f0;
}
3. Element Rules
Headings
css
Copy
Edit
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: var(--text-color);
}

h1 { font-size: 2.5rem; margin: 2rem 0 1.5rem; }
h2 { font-size: 2rem; margin: 1.75rem 0 1.25rem; }
h3 { font-size: 1.5rem; margin: 1.5rem 0 1rem; }
Buttons
css
Copy
Edit
.button {
  background-color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--secondary-color);
}
Forms
css
Copy
Edit
.form-group { margin-bottom: 1.5rem; }
.form-label { margin-bottom: 0.5rem; display: block; }
.form-input { padding: 0.75rem 1rem; }
4. Layout & Spacing
Use rem units for spacing consistency.

Value	Usage
0.5rem	Small padding/margin
1rem	Standard padding/margin
1.5rem	Medium spacing
2rem	Large spacing
css
Copy
Edit
.container { padding: 1.5rem; }
.card { margin: 1rem 0; padding: 1.5rem; }
5. Responsive Design
Use media queries to adjust layouts at different screen sizes.

css
Copy
Edit
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

@media (min-width: 1200px) {
  .container { padding: 3rem; }
}
6. File Organization
Structure styles efficiently.

css
Copy
Edit
src/
  styles/
    theme.css
    global.css
  components/
    Button/
      Button.js
      Button.css
7. Performance Considerations
Use pseudo-classes (:hover, :focus) instead of class toggling in JavaScript.

Keep CSS specificity low to prevent conflicts.

Avoid unnecessary animations and excessive shadow effects.

By following these principles, the application remains scalable, performant, and easy to maintain.