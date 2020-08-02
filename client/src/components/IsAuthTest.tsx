import React from "react";
import { useTestIsAuthQuery, useLogoutMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../auth/access";

interface Props {}

export const IsAuthTest: React.FC<RouteComponentProps> = ({ history }) => {
  const [logout] = useLogoutMutation();

  const { data, loading, error } = useTestIsAuthQuery();
  if (error)
    return (
      <div>
        <pre>err</pre>
      </div>
    );
  if (loading) return <div>loading...</div>;
  if (!data) return <div>no data</div>;
  return (
    <div>
      <button
        onClick={async () => {
          await logout();
          setAccessToken("");
          history.push("/");
        }}
      >
        logout
      </button>
      <pre> {data.testIsAuth} </pre>
    </div>
  );
};
