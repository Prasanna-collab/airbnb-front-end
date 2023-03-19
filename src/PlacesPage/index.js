import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4001/api/user-places").then(({ data }) => {
      setPlaces(data);
      // console.log(data);
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
      <div className="mt-4 gap-2 flex flex-col  h-auto">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link to={"/account/places/"+ place._id}
                className="bg-gray-100 p-4 flex gap-4 rounded-2xl "
                key={place.id}
              >
                <div className="grow shrink-0" >
                {place.addedphotos.length>0 && 
                 <img
                 src={"http://localhost:4001/uploads/" + place.addedphotos[0]}
                 alt="Profile"
                 className="w-32 h-24 rounded-xl"
               />
                }
                </div>
                <div className="shrink grow-0">
                  <h1 className="">{place.title}</h1>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
