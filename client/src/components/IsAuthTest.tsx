import React from "react";
import { useLogoutMutation, useLoggedUserQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../auth/access";

interface Props extends RouteComponentProps {
  setToken: Function;
}

export const IsAuthTest: React.FC<Props> = ({ history, setToken }) => {
  const { data, loading, error, client } = useLoggedUserQuery();
  console.log("data", data);
  const [logout] = useLogoutMutation();

  if (loading) return <div>loading...</div>;
  if (error) return <div>err</div>;
  if (!data?.loggedUser) return <div>no data</div>;

  return (
    <div>
      <button
        onClick={async () => {
          await logout();
          client.resetStore();
          setAccessToken("");
          setToken("");
          history.push("/");
        }}
      >
        logout
      </button>
      <div>{data?.loggedUser?.email}</div>
    </div>
  );
};
