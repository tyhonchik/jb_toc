import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TAnchor, TPage } from "@/types";
import { findAncestors } from "@/utils/findAncestors";

import PageAnchors from "../PageAnchors";
import styles from "./PageItem.module.css";

interface IPageItemProps {
  id: string;
  pages: { [key: string]: TPage };
  anchors: { [key: string]: TAnchor };
}

/**
 * Component representing an item in the Table of Contents.
 *
 * @param {IPageItemProps} props - The props for the PageItem component.
 * @returns {JSX.Element | null} The rendered PageItem component.
 */
export const PageItem: FC<IPageItemProps> = ({
  id,
  pages,
  anchors,
}: IPageItemProps): JSX.Element | null => {
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
      const rect = itemRef.current.getBoundingClientRect();
      if (!(rect.top >= 0 && rect.bottom <= window.innerHeight)) {
        itemRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isSelected, itemRef]);

  /**
   * Handles click event for the item.
   *
   * @param {React.MouseEvent} event - The click event.
   */
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/" + page.id);

    setExpanded(!isExpanded);
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
