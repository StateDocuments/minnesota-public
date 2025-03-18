import { lazy, Suspense } from 'react';

function ComponentExplorer() {
  const [components, setComponents] = useState([]);
  const [loadedComponents, setLoadedComponents] = useState({});
  
  useEffect(() => {
    // Fetch the component index
    fetch('/path/to/components-index.json')
      .then(res => res.json())
      .then(data => {
        setComponents(data.components);
      });
  }, []);
  
  const loadComponent = async (componentInfo) => {
    if (!loadedComponents[componentInfo.name]) {
      const Component = lazy(() => import(`/path/to/${componentInfo.path}`));
      setLoadedComponents(prev => ({
        ...prev,
        [componentInfo.name]: Component
      }));
    }
  };
  
  return (
    <div>
      <h2>Available Components:</h2>
      <div className="component-list">
        {components.map(comp => (
          <button key={comp.name} onClick={() => loadComponent(comp)}>
            Load {comp.name}
          </button>
        ))}
      </div>
      
      <div className="component-preview">
        <Suspense fallback={<div>Loading component...</div>}>
          {Object.entries(loadedComponents).map(([name, Component]) => (
            <div key={name} className="component-instance">
              <h3>{name}</h3>
              <Component />
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}