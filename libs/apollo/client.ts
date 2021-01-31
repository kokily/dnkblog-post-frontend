import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client';
import { useMemo } from 'react';
import { HttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import jsCookie from 'js-cookie';
import fetch from 'isomorphic-unfetch';

import { devServer, isProd, prodServer } from '../constants';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const httpLink = new HttpLink({
  uri: `${isProd ? prodServer : devServer}/graphql`,
  credentials: 'include',
  fetch,
});

const authLink = setContext((_request, { headers }) => {
  let token;

  if (typeof window !== 'undefined') {
    token = jsCookie.get('accessToken');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // console.table({ graphQLErrors, networkError });
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
