import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Navbar } from "./components/pages/Navbar";
import { setAccessToken } from "./auth/access";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.accessToken);
        console.log(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
