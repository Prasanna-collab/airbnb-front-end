import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UsersContext } from "../UserContext";
import axios from "axios";
import AccountNav from "../AccountNav";

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UsersContext);
  const [redirect, setRedirect] = useState(null);

  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (!ready) {
    return "Loading...";
  }
  const handleLogout = () => {
    axios.post("http://localhost:4001/api/logout");
    setRedirect("/");
    setUser(null);
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <h1>Account Page for {user.name} </h1>
      <AccountNav />

      <div className="text-center my-6 mx-auto max-w-lg">
        <h1 className="mb-4">
          Logged in as {user.name} ({user.email})
        </h1>
        <button onClick={handleLogout} className="primary max-w-sm px-6 py-2 ">
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
