import { useContext, useEffect } from "react";

import { Layout } from "@/components/Layout";
import { DataContext } from "@/containers/DataContext";

export const MainPage = () => {
  const { fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <h1>My Page</h1>
      <p>This is some page content...</p>
    </Layout>
  );
};
