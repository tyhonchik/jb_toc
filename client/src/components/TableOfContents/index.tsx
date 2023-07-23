import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DataContext } from "@/containers/DataContext";
import { IApiResponse, TPage } from "@/types";

import TableOfContentsPlaceholder from "./Placeholder";
import styles from "./TableOfContents.module.css";

interface IPageItemProps {
  id: string;
  pages: { [key: string]: TPage };
}

const findAncestors = (
  pages: { [key: string]: TPage },
  id?: string
): Set<string> => {
  const ancestors = new Set<string>();
  let current = id ? pages[id] : undefined;

  while (current?.parentId) {
    ancestors.add(current.parentId);
    current = pages[current.parentId];
  }

  return ancestors;
};

const PageItem: FC<IPageItemProps> = ({ id, pages }) => {
  const page = pages[id];
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const isSelected = pageId === page.id;

  const ancestors = findAncestors(pages, pageId);
  const isAncestor = ancestors.has(id);
  const [isExpanded, setExpanded] = useState(isAncestor || isSelected);

  const itemRef = React.useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isSelected, itemRef]);

  if (!page) return null;

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/" + page.id);

    if (!isSelected) {
      setExpanded(!isExpanded);
    }
  };

  const isExpandable = !!page.pages;
  const levelMargin = (page.level + 1) * 16 + 32;

  return (
    <li role="none">
      <a
        ref={itemRef}
        role="treeitem"
        href={page.url}
        aria-expanded={isExpandable ? isExpanded : undefined}
        aria-selected={isSelected}
        className={isSelected ? "selected" : ""}
        style={{
          marginInlineStart: `-${levelMargin}px`,
          paddingInlineStart: `${levelMargin}px`,
        }}
        onClick={handleClick}
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
