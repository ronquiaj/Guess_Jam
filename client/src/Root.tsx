import { ApolloProvider } from "@apollo/client";
import { SongProvider } from "./contexts/SongContext";
import App from "./App";
import client from "./ApolloConfig";

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
