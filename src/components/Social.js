import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getFollowedPlayers } from "../api";
import { Navigate } from "react-router-dom";

const MyFollowing = ({ token }) => {
  const [following, setFollowing] = useState("LOADING");

  useEffect(() => {
    async function fetchData() {
      const data = await getFollowedPlayers({ token });
      if (data.error) {
        console.error(data.error);
        setFollowing("ERROR");
        return;
      }

      setFollowing(data.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <h1>following</h1>
      {following === "LOADING" && <p>Loading...</p>}
      {following === "ERROR" && <p>Error</p>}
      {typeof following === "object" &&
        following.map((player) => <p key={player}>{player}</p>)}
    </Container>
  );
};

const Amigo = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <MyFollowing token={token} />
    </Container>
  );
};

export default Amigo;
