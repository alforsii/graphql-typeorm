import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Navbar: React.FC<Props> = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/is_auth">IsAuth</Link>
    </header>
  );
};
