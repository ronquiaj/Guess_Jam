import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SongProvider } from "./contexts/SongContext";

import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongProvider>
        <App />
      </SongProvider>
    </ApolloProvider>
  );
};

export default Root;
