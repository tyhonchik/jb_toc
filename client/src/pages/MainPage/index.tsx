import { useContext, useEffect } from "react";

import { Layout } from "@/components/Layout";
import { DataContext } from "@/containers/DataContext";

export const MainPage = () => {
  const { data, errorMessage, loading, fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>Error occurred while fetching data</p>;

  return (
    <Layout data={data}>
      <h1>My Page</h1>
      <p>This is some page content...</p>
    </Layout>
  );
};
