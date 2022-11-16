import { createApp, provide, h } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { ApolloLink, concat } from 'apollo-link';
import { ID_TOKEN_KEY } from '@/common/token';

const cache = new InMemoryCache();
// HTTP connection to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://atnpeasywork.link/graphql',
});

// add the authorization to the headers
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'auth-token': localStorage.getItem(ID_TOKEN_KEY) || null,
    },
  });
  return forward(operation);
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(store).use(router).mount('#app');
