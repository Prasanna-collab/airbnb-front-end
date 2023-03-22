import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4001/api/places").then((response) => {
      setPlaces(response.data);
      // console.log(response.data)
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-2 gap-y-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} className='bg-gray-200 w-45'>
            <div className="rounded-2xl ">
              {place.addedphotos?.[0] && (
                <img
                  src={
                    "http://localhost:4001/uploads/" + place.addedphotos?.[0]
                  }
                  alt="loading.."
                  className="object-cover h-32 w-full"
                />
              )}
            </div>
            <div className="mt-2">
            <h3 className="font-bold truncate mt-2 text-sm mb-3 pl-2 ">
              {place.title}
            </h3>
            <p className="leading-4 text-gray-500 mt-2 mb-2 pl-2 truncate">{place.address}</p>
            <p className="mt-2 mb-4 pl-2">Rs. <span className="font-bold">{place.price}</span> /night</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
