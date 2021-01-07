const path = require('path');
const RouteManifest = require('webpack-route-manifest');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '../../data': `${path.resolve(__dirname, 'src/data')}`,
      '../../services': `${path.resolve(__dirname, 'src/services')}`,
      '../../images': `${path.resolve(__dirname, 'src/images')}`,
      '../../views': `${path.resolve(__dirname, 'src/views')}`,
      '../../components': `${path.resolve(__dirname, 'src/components')}`,
    },
  };

  config.plugins.push(
    new RouteManifest({
      minify: true,
      filename: 'rmanifest.json',
      routes(str) {
        let out = str.replace('../../views', '').toLowerCase();
        if (out === '/homepage') return '/';
        if (out === '/moviedetailspage') return '/movies/:movieId';
        if (out === '/tvdetailspage') return '/tv/:tvId';
        return out;
      },
    }),
  );

  return config;
};