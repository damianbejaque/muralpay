import { useEffect, useState } from "react";

type FetchDataProps<T, K extends keyof T | undefined = undefined> = {
  url: string;
  field?: K;
  id?: string;
};

// Ensure correct typing
const useFetchData = <T, K extends keyof T | undefined = undefined>({
  url,
  id,
  field,
}: FetchDataProps<T, K>) => {
  type DataType = K extends keyof T ? T[K] : T; // Correctly infer the return type

  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const createUrl = () => (id ? `${url}/${id}` : url);

    const fetchData = async () => {
      try {
        const response = await fetch(createUrl(), {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData: T = await response.json();
        // Correctly infer and set the data type
        setData((field ? jsonData[field] : jsonData) as DataType);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, id, field]);

  return { data, loading, error };
};

export default useFetchData;
