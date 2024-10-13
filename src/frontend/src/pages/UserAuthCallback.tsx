import React, { useEffect } from "react";

const UserAuthCallback: React.FC = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      const url = new URL(
        import.meta.env.VITE_API_BASE_URL ||
          "http://localhost:7071/user/login/code"
      );
      url.searchParams.append("code", code);

      fetch(url.href, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "/user";
          }
        });
    }
  });

  return <>Redirecting...</>;
};

export default UserAuthCallback;
