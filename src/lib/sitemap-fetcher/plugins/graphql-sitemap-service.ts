import { GraphQLSitemapService, StaticPath } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStaticPathsContext } from 'next';
import config from 'temp/config';
import { SitemapFetcherPlugin } from '..';
import pkg from '../../../../package.json';

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: GraphQLSitemapService;

  constructor() {
    // console.log('SETUP:', config);
    this._graphqlSitemapService = new GraphQLSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      rootItemId: '{D2B7B58C-B29B-435C-940C-50C81AE2269B}',
      /*
      The Sitemap Service needs a root item ID in order to fetch the list of pages for the current
      app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
      otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
      rootItemId: '{GUID}'
      */
    });
  }

  async exec(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    if (process.env.EXPORT_MODE) {
      // Disconnected Export mode
      if (process.env.JSS_MODE !== 'disconnected') {
        // console.log('FETCH EXPORT');
        return this._graphqlSitemapService.fetchExportSitemap(pkg.config.language);
      }
    }
    // console.log('FETCH SSG');
    return this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
