import { FC, useContext } from "react";

import { DataContext } from "@/containers/DataContext";

import { PageItem } from "./PageItem";
import TableOfContentsPlaceholder from "./Placeholder";
import styles from "./TableOfContents.module.css";

/**
 * Component representing the Table of Contents.
 */
export const TableOfContents: FC = () => {
  const { data, loading } = useContext(DataContext);

  /**
   * Render the loading placeholder if data is still loading.
   */
  if (loading) return <TableOfContentsPlaceholder />;

  if (!data) return null;

  const {
    entities: { pages, anchors },
    topLevelIds,
  } = data;

  return (
    <ul className={styles.tree} role="tree">
      {topLevelIds.map(id => (
        <PageItem key={id} id={id} pages={pages} anchors={anchors} />
      ))}
    </ul>
  );
};
