import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4001/api/places").then(({ data }) => {
      setPlaces(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <div className="mb-5">
        <AccountNav />
      </div>

      <div className="text-center ">
        <Link
          className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-2"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <div
                className="bg-gray-200 rounded-2xl p-4 flex gap-4"
                key={place.id}
              >
                <img
                  src={"http://localhost:4001/uploads/" + place.addedphotos[0]}
                  alt="Profile"
                  className="w-32 h-32 rounded-xl grow shrink-0"
                />
                <div className="shrink grow-0 ">
                  <h1 className="">{place.title}</h1>
                  <h1>{place.description}</h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
