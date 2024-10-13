import React, { useEffect } from "react";

const UserAuthCallback: React.FC = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const scope = searchParams.get("scope"); // Assuming scope is also passed in the URL

    if (code) {
      const url =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:7071/user/login/code";

      const bodyData = JSON.stringify({
        code: code,
        scope: scope,
      });

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: bodyData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.href = "/user";
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    }
  }, []);

  return <>Redirecting...</>;
};

export default UserAuthCallback;
