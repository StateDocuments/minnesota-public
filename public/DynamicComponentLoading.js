// In your component library (Repo 2)
// registry.js
const componentRegistry = {};

export function registerComponent(name, component) {
  componentRegistry[name] = component;
}

export function getComponent(name) {
  return componentRegistry[name];
}

// For each component
import { registerComponent } from './registry';
import ImageGallery from './components/ImageGallery';

registerComponent('ImageGallery', ImageGallery);