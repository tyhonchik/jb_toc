import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { DataContext } from "@/containers/DataContext";
import { TPage } from "@/types";

/**
 * The main page component.
 * Displays the title and content of a specific page based on the 'pageId' from the URL.
 * Fetches data using the 'fetchData' function from the DataContext.
 */
const MainPage = () => {
  const { fetchData, data } = useContext(DataContext);
  const { pageId } = useParams<{ pageId: string }>();
  const page: TPage | undefined = pageId
    ? data?.entities.pages[pageId]
    : undefined;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <h1>{page ? page.title : "Some Page"}</h1>
      <p>{page ? "This is some page content..." : "Page not found."}</p>
    </Layout>
  );
};

export default MainPage;
