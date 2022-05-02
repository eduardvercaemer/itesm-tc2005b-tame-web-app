import React from "react";
import { useParams } from "react-router-dom";

const Profile = ({ props }) => {
  const params = useParams();
  const username = params.username;

  return (
    <>
      <div>Profile</div>
      {username && <h1>{username}</h1>}
    </>
  );
};

export default Profile;
