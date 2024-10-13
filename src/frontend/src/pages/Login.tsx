import React, { useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";
import { User } from "../../../shared";

const googleSsoParams = {
  redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
};

const Login: React.FC = () => {
  const handleGoogleSSO = () => {
    const baseUrl = "https://accounts.google.com";
    const endpoint = "/o/oauth2/v2/auth";
    const queryParams = {
      ...googleSsoParams,
      prompt: "consent",
      response_type: "code",
      scope: "email profile",
      access_type: "offline",
    };

    const url = new URL(endpoint, baseUrl);
    url.search = new URLSearchParams(queryParams).toString();
    window.location.href = url.href;
  };

  useEffect(() => {
    fetch("http://localhost:7071/user/get", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object" && "id" in data)
          window.location.href = "/user";
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <AuthNavbar />
      <div className="relative flex items-center justify-center h-screen">
        <h1 className="absolute text-black text-3xl mb-[15rem]">Sign in</h1>
        <img src="/gem.svg" className="absolute h-12 w-35 mb-[9rem]"></img>
        <button
          className="flex items-center bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md p-3 hover:bg-gray-100 transition duration-200"
          onClick={handleGoogleSSO}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
            className="w-7 h-7 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
