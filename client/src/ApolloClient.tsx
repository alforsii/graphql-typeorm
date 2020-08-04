// import ApolloClient from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { getAccessToken } from "./auth/access";

const baseURI = process.env.REACT_APP_BASE_URL;
const cache = new InMemoryCache({});
const request = (operation: any) => {
  const accessToken = getAccessToken();

  operation.setContext({
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
};
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((op) => request(op))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      // console.log(graphQLErrors);
    }
    if (networkError) {
      console.log(networkError);
    }
  }),
  requestLink,
  new HttpLink({
    uri: `${baseURI}/graphql`,
    credentials: "include",
  }),
]);

export const client = new ApolloClient({
  link,
  cache,
});
