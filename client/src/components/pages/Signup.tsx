import React, { useState, useEffect } from "react";
import { useSignupMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

export const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useSignupMutation();

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
    const res = await signup({
      variables: {
        email,
        password,
      },
    });
    if (res.data?.signup.ok) {
      history.push("/");
    } else {
      setMsg(res.data?.signup.message!);
    }
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div> {msg} </div>
      <h2>Signup</h2>
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
      <button type="submit">Signup</button>
    </form>
  );
};
