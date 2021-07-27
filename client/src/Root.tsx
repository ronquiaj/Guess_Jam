import { useEffect, FC } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
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
  const history = useHistory();

  // Actions that we can enforce on every page change
  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
    });
  }, [history]);

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Root;
