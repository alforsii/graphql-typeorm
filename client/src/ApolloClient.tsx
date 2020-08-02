import ApolloClient from "apollo-boost";
import { getAccessToken } from "./auth/access";

const baseURI = process.env.REACT_APP_BASE_URL;
export const client = new ApolloClient({
  uri: `${baseURI}/graphql`,
  credentials: "include",
  request: (operation) => {
    const accessToken = getAccessToken();
    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });
  },
});
