import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  const [showphotos, setShowPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:4001/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return;

  if (showphotos) {
    return (
      <div className="bg-white absolute inset-0 min-h-screen ">
        <div className="py-2 px-4 grid gap-2 bg-black text-white text-center overflow-hidden">
          <div>
            <h1>{place.title}</h1>
          <button className=" fixed right-0 p-2 rounded-2xl justify-end flex gap-1" onClick={()=>setShowPhotos(false)}>
          
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Close
        </button>
          </div>
         
          {place?.addedphotos?.map((photo) => {
            return (
              <img
                src={"http://localhost:4001/uploads/" + photo}
                alt="place"
                className=""
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-bold">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        rel="noreferrer"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>

      <div className="">
        <div className="child">
          {place.addedphotos?.[0] && (
            <div className="relative p-2">
              <img
                src={"http://localhost:4001/uploads/" + place.addedphotos[0]}
                alt="place"
                className="one rounded"
              />

              <button
                onClick={() => setShowPhotos(true)}
                className="absolute right-30 bottom-2 text-white rounded-2xl p-2 text-xs bg-opacity-75 bg-primary m-2 flex gap-1"
              >
                More+
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PlacePage;
