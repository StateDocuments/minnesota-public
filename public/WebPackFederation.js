// webpack.config.js in component library
module.exports = {
  // ...other webpack config
  plugins: [
    new ModuleFederationPlugin({
      name: 'component_library',
      filename: 'remoteEntry.js',
      exposes: {
        './ImageGallery': './src/components/ImageGallery',
        './Calendar': './src/components/Calendar',
        // Other components you want to expose
      },
      shared: ['react', 'react-dom']
    }),
  ],
};