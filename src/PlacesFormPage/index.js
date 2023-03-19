import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
const PlacesFormPage = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("http://localhost:4001/api/places/" + id)
      .then((individualPlace) => {
        const { data } = individualPlace;
        setBooking({
          title: data.title,
          address: data.address,
          description: data.description,
          extraInfo: data.extraInfo,
     
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          maxGuests: data.maxGuests,
          price: data.price,
          photolink: "",
        });
        setPerks(data.perks);
        setAddedphotos(data.addedphotos);
      });
  }, [id]);
  const [booking, setBooking] = useState({
    title: " ",
    address: " ",
    photolink: " ",
    description: " ",
    extraInfo: " ",
    checkIn: " ",
    checkOut: " ",
    maxGuests: " ",
    price:" ",
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

  const savePlace = async (ev) => {
    ev.preventDefault();
    if (id) {
      //edit and update
      await axios.put("http://localhost:4001/api/places", {
        id,
        title: booking.title,
        address: booking.address,
        addedphotos,
        perks,
        description: booking.description,
        extraInfo: booking.extraInfo,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        maxGuests: booking.maxGuests,
        price: booking.price,
      });
    } else {
      // new
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
        price: booking.price
      });
      setRedirect("/account/places");
    }
  };
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const removePhotos = (ev, filename) => {
    ev.preventDefault();
    setAddedphotos([...addedphotos.filter((photos) => photos !== filename)]);
  };

  const selectAsMainPhoto = (ev, filename)=>{
    ev.preventDefault();
    const addedPhotosWithoutSelected = addedphotos.filter(photos => photos !== filename)
    setAddedphotos([filename, ...addedPhotosWithoutSelected])
  }
  return (
    <>
      <div className="mb-5">
        <AccountNav />
      </div>
      <form onSubmit={savePlace}>
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
                <div key={link} className="relative">
                  <img
                    src={"http://localhost:4001/uploads/" + link}
                    alt={"House"}
                    className="rounded-2xl w-32 h-24"
                  />
                  <button
                    className="absolute bg-opacity-50 tex-white p-2 top-14 py-2 px-3 right-11 rounded-xl pointer-cursor"
                    onClick={(ev) => removePhotos(ev, link)}
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute bg-opacity-50 tex-white p-2 top-14 py-2 px-3 left- rounded-xl pointer-cursor"
                    onClick={(ev) => selectAsMainPhoto(ev, link)}
                  >
                    {link === addedphotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}

                    {link !== addedphotos[0] && (
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
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                  </button>
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
          <div>
            <h2 className="mt-2 mb-1">Price per night</h2>
            <input
              type="text"
              value={booking.price}
              onChange={(e) => handleInput({ price: e.target.value })}
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
