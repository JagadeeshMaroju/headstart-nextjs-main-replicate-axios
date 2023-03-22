import {
  GraphQLLayoutService,
  LayoutService,
  RestLayoutService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(appName: string = null): LayoutService {
    return process.env.FETCH_WITH === 'GraphQL'
      ? new GraphQLLayoutService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          siteName: appName || config.jssAppName,
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName: appName || config.jssAppName,
          configurationName: 'sxa-jss',
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
