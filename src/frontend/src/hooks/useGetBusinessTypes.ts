import { useEffect, useState } from "react";

export const useGetBusinessTypes = () => {
  const [businessTypes, setBusinessTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const response = await fetch("http://localhost:7071/business/types");
        const data = await response.json();
        setBusinessTypes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBusinessTypes();
  }, []);

  return businessTypes;
};
