import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import { client } from "./ApolloClient";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as any}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
