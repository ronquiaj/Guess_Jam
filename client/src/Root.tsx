import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SongProvider } from "./contexts/SongContext";
import { useSong } from "./contexts/SongContext";
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
  const { setSongPlaying } = useSong();

  // Actions that we can enforce on every page change
  useEffect(() => {
    return history.listen((location) => {
      setSongPlaying && setSongPlaying("");
    });
  }, [history]);

  return (
    <ApolloProvider client={client}>
      <SongProvider>
        <App />
      </SongProvider>
    </ApolloProvider>
  );
};

export default Root;
