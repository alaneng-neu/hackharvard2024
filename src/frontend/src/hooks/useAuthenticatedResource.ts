import { useEffect } from "react";
import { User } from "../../../shared";

export const useAuthenticatedResource = (businessId: string) => {
  // This hook will be used to check whether the user is authenticated to access the resource
  // It will get the user from the API, and if the business ID doesn't matches the user's business ID, the user will be
  // redirected to the page with the business ID (similar to useAuthenticatedView hook)

  useEffect(() => {
    const fetchUserAuthenticated = async () => {
      const response = await fetch("http://localhost:7071/user/get", {
        credentials: "include",
      });

      if (!response.ok) {
        window.location.href = "/user/login";
      }

      const user: User = await response.json();
      if (
        !user.businesses
          .map((business) => business.id === businessId)
          .includes(true)
      ) {
        window.location.href = `/business/${businessId}`;
      }
    };

    fetchUserAuthenticated();
  }, [businessId]);
};
