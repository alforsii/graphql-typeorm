import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Navbar } from "./components/pages/Navbar";
import { renewAccessToken, accessToken } from "./auth/access";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const update = async () => {
    await renewAccessToken();
    setToken(accessToken);
    setLoading(false);
  };

  useEffect(() => {
    update();
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className="App">
      <Navbar />
      <Routes token={token} setToken={setToken} />
    </div>
  );
};

export default App;
