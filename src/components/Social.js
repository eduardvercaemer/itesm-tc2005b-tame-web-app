import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { followPlayer, getFollowedPlayers, getFollowers } from "../api";
import { Navigate, useNavigate } from "react-router-dom";

const AddFollow = ({ token }) => {
  const form = useRef();

  const follow = async (ev) => {
    ev.preventDefault();
    const username = form.current.elements["user"].value;
    const data = await followPlayer({ token, username });
    if (data.status === "SUCCESS") {
      console.log("Followed");
    } else {
      console.error(data.error);
      alert("Error");
    }
  };

  return (
    <Form className="form-inline" ref={form}>
      <Form.Group className="inline">
        <Form.Label>username</Form.Label>
        <Form.Control name="user" />
      </Form.Group>
      <Button variant="primary" onClick={follow}>
        Follow
      </Button>
    </Form>
  );
};

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

const MyFollowers = ({ token }) => {
  const [followers, setFollowers] = useState("LOADING");

  useEffect(() => {
    async function fetchData() {
      const data = getFollowers({ token });
      if (data.error) {
        console.error(data.error);
        setFollowers("ERROR");
        return;
      }

      setFollowers(data.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <h1>followers</h1>
      {followers === "LOADING" && <p>Loading...</p>}
      {followers === "ERROR" && <p>Error</p>}
      {typeof followers === "object" &&
        followers.map((player) => <p key={player}>{player}</p>)}
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
      <AddFollow token={token} />
      <MyFollowing token={token} />
      <MyFollowers token={token} />
    </Container>
  );
};

export default Amigo;
