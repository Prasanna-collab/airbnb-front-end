import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from 'axios'

const PlacesPage = () => {
  
  useEffect(()=>{
    const {data} = axios.get('http://localhost:4001/api/places')
  },[])

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
      <h2>This is the list of places.</h2>
    </div>
  );
};

export default PlacesPage;
