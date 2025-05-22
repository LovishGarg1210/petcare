import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Contact: "",
    Password: "",
    Code: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleButtonRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    if (!formData.Email) return alert("Please enter your email first.");
    try {
      setLoading(true);
      const response = await fetch("https://petcare-1.onrender.com/Signup/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.Email }),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("OTP sent to your email.");
        setOtpSent(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Error sending OTP. Try again.");
    }
  };

  // Step 2: Submit form with OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) return alert("Please verify your email first.");

    try {
      setLoading(true);
      const response = await fetch("https://petcare-1.onrender.com/Signup/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        alert(result.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Error occurred during registration.");
    }
  };

  // Google Sign-In
  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: "162599922941-l7mfp5v1er99chlcvd5jsu03uo77mqp1.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
      });
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    const userObject = jwtDecode(response.credential);
    try {
      const res = await fetch("https://petcare-1.onrender.com/Signup/GoogleSave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: userObject.name,
          Email: userObject.email,
          GoogleId: userObject.sub,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Google sign-up successful!");
        navigate("/login");
      } else {
        alert(`Google sign-up failed! ${result.message}`);
        navigate("/login");
      }
    } catch (err) {
      console.error(`Google Sign-In Error:`, err);
    }
  };

  return (
    <div className="h-[130vh] items-center flex justify-center px-5 lg:px-0">
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
            <h1 className="text-2xl xl:text-4xl font-extrabold text-black text-center">
              Sign up
            </h1>
            <p className="text-sm text-gray-500 text-center mt-2">
              Enter your details to create your account
            </p>

            <form onSubmit={handleSubmit} className="w-full mt-8 max-w-xs mx-auto flex flex-col gap-4">
              <input
                type="text"
                name="Name"
                placeholder="Enter your name"
                value={formData.Name}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-lg bg-gray-100 border text-sm"
              />
              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
                value={formData.Email}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-lg bg-gray-100 border text-sm"
              />
              <input
                type="tel"
                name="Contact"
                placeholder="Enter your phone"
                value={formData.Contact}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-lg bg-gray-100 border text-sm"
              />
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-lg bg-gray-100 border text-sm"
              />

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                >
                  {loading ? "Sending OTP..." : "Verify User"}
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    name="Code"
                    placeholder="Enter OTP sent to email"
                    value={formData.Code}
                    onChange={handleChange}
                    className="px-5 py-3 rounded-lg bg-gray-100 border text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </>
              )}

              <div className="text-center text-sm text-gray-500 mt-4">or</div>

              <div ref={googleButtonRef} className="flex justify-center mt-3"></div>

              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-black font-semibold">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
