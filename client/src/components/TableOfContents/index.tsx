import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DataContext } from "@/containers/DataContext";
import { IApiResponse, TAnchor, TPage } from "@/types";

import TableOfContentsPlaceholder from "./Placeholder";
import styles from "./TableOfContents.module.css";

interface IPageItemProps {
  id: string;
  pages: { [key: string]: TPage };
  anchors: { [key: string]: TAnchor };
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

const PageAnchors: FC<{
  page: TPage;
  anchors: { [key: string]: TAnchor };
  tocWidthStyle: React.CSSProperties;
}> = ({ page, anchors, tocWidthStyle }) => {
  if (!page.anchors) return null;
  return (
    <ul className={styles.anchors} style={tocWidthStyle}>
      {page.anchors.map(anchorId => {
        const anchor = anchors[anchorId];
        if (!anchor) return null;
        return (
          <li key={anchorId}>
            <a
              href={page.id + anchor.anchor}
              className={styles.anchor}
              style={tocWidthStyle}
            >
              {anchor.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const PageItem: FC<IPageItemProps> = ({ id, pages, anchors }) => {
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
  const tocWidthStyle = {
    marginInlineStart: `-${levelMargin}px`,
    paddingInlineStart: `${levelMargin}px`,
  };

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
          ...tocWidthStyle,
          ...(page.anchors && isSelected
            ? {
                display: "inherit",
                backgroundColor: "#f3f3f3",
              }
            : {}),
        }}
        onClick={handleClick}
      >
        {page.title}
      </a>

      {isSelected && (
        <PageAnchors
          page={page}
          anchors={anchors}
          tocWidthStyle={tocWidthStyle}
        />
      )}

      {isExpanded && page.pages && (
        <ul
          className={styles["tree-node"]}
          role="group"
          aria-label={page.title}
          id={page.id}
        >
          {page.pages.map(nestedId => (
            <PageItem
              key={nestedId}
              id={nestedId}
              pages={pages}
              anchors={anchors}
            />
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
