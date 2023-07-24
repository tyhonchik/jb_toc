import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import { IApiResponse } from "@/types";

/**
 * Represents the shape of the context state in the DataContext.
 */
interface DataContextState {
  data?: IApiResponse;
  errorMessage?: string;
  loading: boolean;
  fetchData: () => Promise<void>;
}

/**
 * DataContext is a React context that provides data and state related to the application data.
 */
export const DataContext = createContext<DataContextState>({
  loading: false,
  fetchData: async () => undefined,
});

/**
 * DataProvider is a higher-order component that wraps the application and provides the DataContext
 * context values and functions to its children components.
 *
 * @param children - The child components that should have access to the DataContext.
 */
export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IApiResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  /**
   * Fetches data from the API and updates the context state accordingly.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage(undefined);
    try {
      const response = await fetch(`/api/data`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      let message;
      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: DataContextState = {
    data,
    errorMessage,
    loading,
    fetchData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
