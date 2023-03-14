import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UsersContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "../PlacesPage";

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UsersContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }
  const classesFunc = (type = null) => {
    let classes = "px-6 py-2 inline-flex gap-2 rounded-full ";
    if (type === subpage) {
      classes += " bg-primary text-white ";
    } else {
      classes += "bg-gray-200";
    }
    return classes;
  };

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
      <nav className="flex mt-6 gap-6 w-full  justify-center">
        <Link className={classesFunc("profile")} to="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={classesFunc("bookings")} to="/account/bookings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My Bookings
        </Link>
        <Link className={classesFunc("places")} to="/account/places">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My Accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center my-6 mx-auto max-w-lg">
          <h1 className="mb-4">
            Logged in as {user.name} ({user.email})
          </h1>
          <button
            onClick={handleLogout}
            className="primary max-w-sm px-6 py-2 "
          >
            Log out
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div className="my-6">
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
