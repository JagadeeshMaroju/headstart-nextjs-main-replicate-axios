import { GraphQLClient } from 'graphql-request';
import { IncomingMessage, ServerResponse } from 'http';
import config from 'temp/config';

let requestClient: GraphQLClient;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createRequestClient(context?: ResolverContext) {
  const graphQLClient = new GraphQLClient(
    typeof window === 'undefined' ? config.graphQLEndpoint : config.connectedGraphQLEndpoint,
    {
      headers: {
        sc_apikey: config.sitecoreApiKey,
      },
    }
  );
  return graphQLClient;
}

export function initRequestClient(
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext
) {
  const _client = requestClient ?? createRequestClient(context);

  // For SSG and SSR always create a new Client
  if (typeof window === 'undefined') return _client;

  // Create the client once in the client
  if (!requestClient) requestClient = _client;

  return _client;
}
