import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../auth/access";

interface Props extends RouteComponentProps {
  setToken: Function;
}

export const Login: React.FC<Props> = ({ history, setToken }) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
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
    if (!email) {
      return setMsg("Please enter your email");
    }
    const res = await login({
      variables: {
        email,
        password,
      },
    });
    console.log(res);
    if (res?.data?.login.ok) {
      setAccessToken(res.data.login.accessToken);
      setToken(res.data.login.accessToken);
      history.push("/is_auth");
    } else {
      setMsg(res?.data?.login.message!);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div> {msg} </div>
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
