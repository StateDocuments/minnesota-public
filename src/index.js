// src/index.js
import App from './App';

// Export the component so it can be imported by other applications
export default App;

// If using as a standalone app too
if (document.getElementById('root')) {
  // Use dynamic import with the modern JSX transform
  import('react').then((React) => {
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(document.getElementById('root'));
      root.render(React.createElement(App));
    });
  });
}