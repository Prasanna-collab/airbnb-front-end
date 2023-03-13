import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { UsersContext } from "../UserContext";

const LoginPage = () => {
const {setUser} = useContext(UsersContext)
  const [login, setLogin] = useState({ email: "", password: "" });
  const [allow, setAllow] = useState(false);

  const handleInput = (value) => {
    return setLogin((logindetails) => {
      return { ...logindetails, ...value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:4001/api/login",
        {
          email: login.email, 
          password: login.password,
        }
        // { withCredentials: true }
        //withCredentials:true allows us to store the token into cookies
      );
      setUser(data.data)
      alert("Login Successful");
      
      setAllow(true);
      
  
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };
  if (allow) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="my-32">
        <h1 className="text-4xl text-center">Login</h1>
        <form
          className="mx-auto my-2 max-w-lg border p-5"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={login.email}
            onChange={(e) => handleInput({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) => handleInput({ password: e.target.value })}
          />
          <button className="primary">Log in</button>
          <div className="text-center">
            <h5 className="text-gray-300 py-2">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-black underline">
                Register now
              </Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
