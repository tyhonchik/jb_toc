import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { DataContext } from "@/containers/DataContext";

export const MainPage = () => {
  const { fetchData, data } = useContext(DataContext);
  const { pageId } = useParams<{ pageId: string }>();
  const page = pageId ? data?.entities.pages[pageId] : undefined;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <h1>{page ? page.title : "Some Page"}</h1>
      <p>This is some page content...</p>
    </Layout>
  );
};
