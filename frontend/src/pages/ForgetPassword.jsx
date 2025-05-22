import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendCode = async () => {
    try {
      const res = await axios.post("https://petcare-1.onrender.com/signup/sendVerificationCode", { email });
      alert(res.data.message);
      setCodeSent(true);
    } catch (err) {
      alert(err.response.data.message || "Failed to send code");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post("https://petcare-1.onrender.com/signup/resetPassword", {
        email,
        verificationCode,
        newPassword
      });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message || "Failed to reset password");
    }
  };

  return (
    <div className="p-6 h-[50vh] mt-5 mb-5 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {!codeSent ? (
        <button onClick={handleSendCode} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Send Verification Code
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter verification code"
            className="border p-2 w-full mt-4"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="border p-2 w-full mt-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword} className="bg-green-600 text-white px-4 py-2 mt-4 rounded w-full">
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
