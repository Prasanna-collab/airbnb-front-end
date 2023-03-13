import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:4001/api/register", {
        name: userdetails.name,
        email: userdetails.email,
        password: userdetails.password,
      });
      alert(data.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  function handleInput(users) {
    return setUserdetails((value) => {
      return { ...value, ...users };
    });
  }

  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="my-32">
        <h1 className="text-4xl text-center">Register</h1>
        <form
          className="mx-auto my-2 max-w-lg border p-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="John Doe"
            value={userdetails.name}
            onChange={(e) => handleInput({ name: e.target.value })}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={userdetails.email}
            onChange={(e) => handleInput({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={userdetails.password}
            onChange={(e) => handleInput({ password: e.target.value })}
          />
          <button className="primary">Sign up</button>
          <div className="text-center">
            <h5 className="text-gray-300 py-2">
              Already a member?{" "}
              <Link to="/login" className="text-black underline">
                Log in
              </Link>
            </h5>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
