import React from "react";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
const PlacesFormPage = () => {
  const [booking, setBooking] = useState({
    title: " ",
    address: " ",
    photolink: " ",
    description: " ",
    extraInfo: " ",
    checkIn: " ",
    checkOut: " ",
    maxGuests: " ",
  });
  const [perks, setPerks] = useState([]);
  const [addedphotos, setAddedphotos] = useState([]);
  const [redirect, setRedirect] = useState("");

  const handleInput = (options) => {
    return setBooking((value) => {
      return { ...value, ...options };
    });
  };

  const imageFunc = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post(
      "http://localhost:4001/api/upload-by-link",
      { link: booking.photolink }
    );
    setAddedphotos((prev) => {
      return [...prev, filename];
    });
    setBooking({ photolink: " " });
  };
  const inputHeader = (text) => {
    return <h2 className="text-xl mt-2">{text}</h2>;
  };
  const preInput = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  // console.log(addedphotos);

  const uploadPhoto = (event) => {
    const files = event.target.files;
    console.log(files); //returns the array of uploaded file. first index value consists the uploaded file data. Here after we store the file into
    // formData function
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    // console.log(data)
    axios
      .post("http://localhost:4001/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedphotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  const addNewPlaces = async (ev) => {
    ev.preventDefault();
    await axios.post("http://localhost:4001/api/places", {
      title: booking.title,
      address: booking.address,
      addedphotos,
      perks,
      description: booking.description,
      extraInfo: booking.extraInfo,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      maxGuests: booking.maxGuests,
    });
    setRedirect("/account/places");
  };
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <div className="mb-5">
        <AccountNav />
      </div>
      <form onSubmit={addNewPlaces}>
        {inputHeader("Title")}
        {preInput("Title for your place, should be short and catchy")}
        <input
          type="text"
          placeholder="title eg: My Home"
          value={booking.title}
          onChange={(e) => handleInput({ title: e.target.value })}
        />
        {inputHeader("Address")}
        {preInput("Address for your page")}
        <input
          type="text"
          placeholder="address"
          value={booking.address}
          onChange={(e) => handleInput({ address: e.target.value })}
        />
        {inputHeader("Photos")}
        {preInput("more = better")}

        <div className=" flex gap-2">
          <input
            type="text"
            placeholder="Add photo url..."
            value={booking.photolink}
            onChange={(e) => handleInput({ photolink: e.target.value })}
          />
          <button onClick={imageFunc} className="bg-gray-200 px-4 rounded-xl">
            Add&nbsp;photo
          </button>
        </div>
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {addedphotos.length > 0 &&
            addedphotos.map((link) => {
              return (
                <div key={link}>
                  <img
                    src={"http://localhost:4001/uploads/" + link}
                    alt={"House"}
                    className="rounded-2xl w-32 h-24"
                  />
                </div>
              );
            })}
          <label className="border cursor-pointer flex py-8 px-10 rounded-xl justify-between items-center">
            <input type="file" className="hidden" onChange={uploadPhoto} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload Your Photos
          </label>
        </div>
        {inputHeader("Description")}
        {preInput("Description about your place")}
        <textarea
          value={booking.description}
          onChange={(e) => handleInput({ description: e.target.value })}
        />
        {inputHeader("Perks")}
        {preInput(" Select the perks of your place")}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <h2 className=" text-xl mt-2">Extra Info</h2>
        <p className="text-gray-500 text-sm">House rules, etc...</p>
        <textarea
          value={booking.extraInfo}
          onChange={(e) => handleInput({ extraInfo: e.target.value })}
        />
        <h2 className=" text-xl mt-2">Check in & Check out times</h2>
        <p className="text-gray-500 text-sm">add check in, check out times</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h2 className="mt-2 mb-1">Check In</h2>
            <input
              type="text"
              placeholder="14:00"
              value={booking.checkIn}
              onChange={(e) => handleInput({ checkIn: e.target.value })}
            />
          </div>
          <div>
            <h2 className="mt-2 mb-1">Check Out</h2>
            <input
              type="text"
              value={booking.checkOut}
              onChange={(e) => handleInput({ checkOut: e.target.value })}
            />
          </div>
          <div>
            <h2 className="mt-2 mb-1">Maximum Guests</h2>
            <input
              type="text"
              value={booking.maxGuests}
              onChange={(e) => handleInput({ maxGuests: e.target.value })}
            />
          </div>
        </div>
        <button className="primary my-4" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default PlacesFormPage;
