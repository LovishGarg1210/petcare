import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxtoolkit/Slice";
import { useNavigate } from "react-router-dom";

const LoginWithGoogleButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/Signup/validate", data);
      dispatch(setUser(response.data.data.Email));
      localStorage.setItem("user", response.data.data.Email);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);

      if (response.data.data.role === "Admin") {
        alert("Admin Login Successful");
        navigate("/adminpanel");
      } else {
        alert("User Login Successful");
        navigate("/");
      }

      setData({ Email: "", Password: "" });
    } catch (e) {
      alert(`Invalid Credentials: ${e.response?.data?.message}`);
      console.log(e);
    }
  };

  // Google login response handler
  const handleGoogleLogin = async (response) => {
    try {
      const userObject = jwtDecode(response.credential);
      const { name, email, sub: googleId } = userObject;

      // Send the decoded token data to your backend
      const result = await axios.post("http://localhost:4000/Signup/GoogleLogin", {
        Name: name,
        Email: email,
        GoogleId: googleId,
      });

      const user = result.data.data;

      dispatch(setUser(user.Email));
      localStorage.setItem("user",user.Email);
      localStorage.setItem("token",user.token);
      localStorage.setItem("role",user.role);

      alert("Google Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Google login failed");
    }
  };

  // Load Google button
  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: "162599922941-l7mfp5v1er99chlcvd5jsu03uo77mqp1.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    window.google.accounts.id.renderButton(document.getElementById("googleBtn"), {
      theme: "outline",
      size: "large",
      width: "100%",
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-5xl w-full h-[84%]">
        <div
          className="hidden md:block lg:w-[75%] bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1482434368596-fbd06cae4f89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZ2luJTIwaW4lMjBwZXR8ZW58MHx8MHx8fDA%3D)`,
          }}
        ></div>

        <div className="w-full p-15 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              name="Email"
              onChange={handleChange}
              value={data.Email}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              name="Password"
              onChange={handleChange}
              value={data.Password}
            />
            <a href="/forgetpass" className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2">
              Forget Password?
            </a>
          </div>

          <div className="mt-8">
            <button
              className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          {/* Google Login Button */}
          <div className="mt-4   w-full">
            <div id="googleBtn" className="w-full  "></div>
          </div>

          <div className="mt-4 flex items-center w-full text-center">
            <a href="/signup" className="text-xs text-gray-500 capitalize text-center w-full">
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithGoogleButton;
