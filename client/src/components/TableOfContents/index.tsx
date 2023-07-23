import { FC, useContext, useState } from "react";

import { DataContext } from "@/containers/DataContext";
import { IApiResponse, TPage } from "@/types";

import TableOfContentsPlaceholder from "./Placeholder";
import styles from "./TableOfContents.module.css";

interface IPageItemProps {
  id: string;
  pages: { [key: string]: TPage };
}

const PageItem: FC<IPageItemProps> = ({ id, pages }) => {
  const [isExpanded, setExpanded] = useState(false);
  const page = pages[id];

  if (!page) return null;

  const handleExpandClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!isExpandable) return;
    setExpanded(!isExpanded);
  };

  const isExpandable = !!page.pages;
  const levelMargin = (page.level + 1) * 16 + 32;

  return (
    <li role="none">
      <a
        role="treeitem"
        href={page.url}
        aria-expanded={isExpandable ? isExpanded : undefined}
        aria-selected={false} //TODO: make it real
        style={{
          marginInlineStart: `-${levelMargin}px`,
          paddingInlineStart: `${levelMargin}px`,
        }}
        onClick={handleExpandClick}
      >
        {page.title}
      </a>

      {isExpanded && page.pages && (
        <ul
          className={styles["tree-node"]}
          role="group"
          aria-label={page.title}
          id={page.id}
        >
          {page.pages.map(nestedId => (
            <PageItem key={nestedId} id={nestedId} pages={pages} />
          ))}
        </ul>
      )}
    </li>
  );
};

interface ITocProps {
  data?: IApiResponse;
}

export const TableOfContents: FC<ITocProps> = () => {
  const { data, loading } = useContext(DataContext);

  if (loading) return <TableOfContentsPlaceholder />;

  if (!data) return null;
  const {
    entities: { pages },
    topLevelIds,
  } = data;

  return (
    <ul className={styles.tree} role="tree">
      {topLevelIds.map(id => (
        <PageItem key={id} id={id} pages={pages} />
      ))}
    </ul>
  );
};
