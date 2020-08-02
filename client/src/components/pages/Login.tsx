import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../auth/access";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
    const res = await login({
      variables: {
        email,
        password,
      },
    });
    console.log(res);
    if (res && res.data) {
      setAccessToken(res.data.login.accessToken);
      history.push("/is_auth");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
