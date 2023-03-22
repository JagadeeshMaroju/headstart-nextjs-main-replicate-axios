const cybersourcePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      //config.resolve = Object.assign({}, config.resolve,
      //  {
      //    preferRelative: true,
      //    extensions: [".jsx", ".json", ".js", ".ts", ".tsx"]
      //  });

      config.amd = false; //should we move this under isServer?

      if (!options.isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = Object.assign({}, config.resolve.fallback, {
          fs: false,
          net: false,
          tls: false,
          dns: false,
          module: false,
          'cybersource-rest-client': false,
        });
      }

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = cybersourcePlugin;
