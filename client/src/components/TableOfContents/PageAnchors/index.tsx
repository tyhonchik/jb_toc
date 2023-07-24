import React, { FC } from "react";

import { TAnchor, TPage } from "@/types";

import styles from "./PageAnchors.module.css";

interface IPageAnchorsProps {
  page: TPage;
  anchors: { [key: string]: TAnchor };
  tocWidthStyle: React.CSSProperties;
}

/**
 * Component representing the list of anchors (headings) within a page.
 *
 * @param {IPageAnchorsProps} props - The props for the PageAnchors component.
 * @returns {JSX.Element | null} The rendered PageAnchors component.
 */
const PageAnchors: FC<IPageAnchorsProps> = ({
  page,
  anchors,
  tocWidthStyle,
}: IPageAnchorsProps): JSX.Element | null => {
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

export default PageAnchors;
