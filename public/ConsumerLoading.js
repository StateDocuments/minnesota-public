// webpack.config.js in consuming app
module.exports = {
  // ...other webpack config
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_app',
      remotes: {
        components: 'component_library@http://localhost:3001/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    }),
  ],
};

// In your app code:
const ComponentLoader = () => {
  const [availableComponents, setAvailableComponents] = useState([]);
  
  useEffect(() => {
    // Discover available components
    Promise.all([
      import('components/ImageGallery'),
      import('components/Calendar')
    ]).then(modules => {
      setAvailableComponents(modules.map(m => m.default));
    });
  }, []);
  
  return (
    <div>
      {availableComponents.map((Component, i) => (
        <div key={i}>
          <Component />
        </div>
      ))}
    </div>
  );
}