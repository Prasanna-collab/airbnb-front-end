import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UsersContext } from "../UserContext";
import axios from "axios";

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UsersContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }
  const classesFunc = (type = null) => {
    let classes = "px-6 py-2";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full ";
    }
    return classes;
  };

  if (!user && ready) {
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
      <nav className="flex mt-6 gap-6 w-full  justify-center">
        <Link className={classesFunc("profile")} to="/account">
          My Profile
        </Link>
        <Link className={classesFunc("bookings")} to="/account/bookings">
          My Bookings
        </Link>
        <Link
          className={classesFunc("accomodations")}
          to="/account/accomodations"
        >
          My Accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div>
          <h1>
            Loogged in as {user.name} {user.email}
          </h1>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
