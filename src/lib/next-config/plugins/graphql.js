const graphqlPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // removed Apollo, code-gen, and graphql-let

      // config.module.rules.push({
      //   test: /\.graphql$/,
      //   exclude: /node_modules/,
      //   use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
      // });

      // config.module.rules.push({
      //   test: /\.graphqls$/,
      //   exclude: /node_modules/,
      //   use: ['graphql-let/schema/loader'],
      // });

      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      });

      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
      });

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = graphqlPlugin;
