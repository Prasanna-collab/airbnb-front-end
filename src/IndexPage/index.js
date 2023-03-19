import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4001/api/places").then((response) => {
      setPlaces(response.data);
      // console.log(response.data)
    })
  }, []);
  return (
    <div className="mt-8 grid  gap-x-1 gap-y-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/'+ place._id}>
            <div className="rounded-2xl">
              {place.addedphotos?.[0] && (
                <img
                  src={"http://localhost:4001/uploads/" + place.addedphotos?.[0]}
                  alt="loading.."
                  className="rounded-2xl object-cover aspect-square mb-2  w-40"
                />
              )}
            </div>

              <h3 className="font-bold  text-sm truncate mb-3 leading-4">{place.title}</h3> 
              <p className="leading-4 text-gray-500" >{place.address}</p>
              <div className="mt-2">Rs. <span className="font-bold">{place.price}</span> /night</div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
