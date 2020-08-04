import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { IsAuthTest } from "./components/IsAuthTest";

interface Props {
  token?: string;
  setToken: Function;
}

export const Routes: React.FC<Props> = ({ token, setToken }) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/is_auth"
        render={(props) =>
          token ? (
            <IsAuthTest {...props} setToken={setToken} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        exact
        path="/login"
        render={(props) => <Login {...props} setToken={setToken} />}
      />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
};
export default Routes;
