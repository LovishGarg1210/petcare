import React, { useState } from "react";

const RegistrationForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Contact: "",
    Password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send data to API
    try {
      const response = await fetch("https://petcare-1.onrender.com/Signup/Save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", result);
        // Optionally redirect or handle success
      } else {
        console.error("Error registering user:", result);
        // Handle error response from the API
      }
    } catch (error) {
      console.error("Error occurred while registering:", error);
      // Handle network or other errors
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-lg bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 w-full hidden md:flex">
          <div
            className="w-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(https://media.istockphoto.com/id/1413493532/photo/business-woman-in-glasses-working-on-laptop-online-and-hug-corgi-dog-it-specialist-girl.webp?a=1&b=1&s=612x612&w=0&k=20&c=sktcrHMW8QVzrI1rn0HvoF6fgTpBJQqL480xQjCeNas=)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-black">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500 mt-2 ">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="Name"
                  placeholder="Enter your name"
                  value={formData.Name}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={formData.Email}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="tel"
                  name="Contact"
                  placeholder="Enter your phone"
                  value={formData.Contact}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-black text-gray-100 w-full py-4 rounded-lg hover:bg-white  hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleSubmit} // Handle form submission on button click
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="">
                    <span className="text-black font-semibold">Sign in</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
