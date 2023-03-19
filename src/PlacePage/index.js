import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:4001/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if(!place) return;

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="font-bold">{place.title}</h1>
      <a className=' my-2 block font-semibold underline' rel='noreferrer' target='_blank' href={'https://maps.google.com/?q='+ place.address}>{place.address}</a>
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div>
                {place.addedphotos?.[0] &&
                <img src={'http://localhost:4001/uploads/'+ place.addedphotos[0]} alt='place'/>
                }
            </div>
            <div>
            {place.addedphotos?.[1] &&
                <img src={'http://localhost:4001/uploads/'+ place.addedphotos[1]} alt='place'/>
                }
                 {place.addedphotos?.[2] &&
                <img src={'http://localhost:4001/uploads/'+ place.addedphotos[2]} alt='place'/>
                }

            </div>
        </div>
    
    </div>
  );
};

export default PlacePage;
