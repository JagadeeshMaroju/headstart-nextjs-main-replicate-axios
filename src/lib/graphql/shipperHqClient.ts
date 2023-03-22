import { GraphQLClient } from 'graphql-request';
import { IncomingMessage, ServerResponse } from 'http';
import config from 'temp/config';

let requestClient: GraphQLClient;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createRequestClient(accessToken: string): GraphQLClient {
  const graphQLClient = new GraphQLClient(config.shipperhqEndpoint, {
    headers: {
      'X-ShipperHQ-Secret-Token': accessToken,
      'X-ShipperHQ-Scope': config.shipperhqScope,
    },
  });

  return graphQLClient;
}

export function initHqClient(accessToken: string): GraphQLClient {
  const _client = requestClient ?? createRequestClient(accessToken);

  if (!requestClient) requestClient = _client;

  return _client;
}
