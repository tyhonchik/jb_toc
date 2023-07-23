import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import { IApiResponse } from "@/types";

interface DataContextState {
  data?: IApiResponse;
  errorMessage?: string;
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const DataContext = createContext<DataContextState>({
  loading: false,
  fetchData: async () => undefined,
});

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<IApiResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setError] = useState<string | undefined>(undefined);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch("http://localhost:5000/api/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, errorMessage, loading, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
