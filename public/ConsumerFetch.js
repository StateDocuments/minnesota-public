// In the consuming app
fetch('/path/to/components/manifest.json')
  .then(response => response.json())
  .then(manifest => {
    manifest.components.forEach(component => {
      // Dynamically import each component
      import(`/path/to/components/${component.path}`)
        .then(module => {
          // Register the component in the application
          registerComponent(component.name, module.default);
        });
    });
  });