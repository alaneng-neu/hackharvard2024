import { useEffect } from "react";

export const useAuthenticatedView = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:7071/user/vat", {
        credentials: "include",
      });

      if (!response.ok) {
        window.location.href = "/user/login";
      }
    };

    fetchData();
  }, []);
};
