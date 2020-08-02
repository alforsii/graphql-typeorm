import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { IsAuthTest } from "./components/IsAuthTest";
import { accessToken } from "./auth/access";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/is_auth"
        render={(props) =>
          accessToken ? <IsAuthTest {...props} /> : <Redirect to="/" />
        }
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
}
