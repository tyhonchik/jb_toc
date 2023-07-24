import React from "react";

import styles from "../TableOfContents.module.css";

/**
 * Props for the PlaceholderItem component.
 */
interface IProps {
  level: number; // The nesting level of the placeholder item.
}

/**
 * PlaceholderItem is a recursive component that renders a placeholder tree node with nested sub-items.
 * It is used to show a loading placeholder for the Table of Contents.
 */
const PlaceholderItem: React.FC<IProps> = ({ level }) => {
  // Different sizes for each nesting level to create the visual indentation.
  const sizes = [216, 200, 184, 168];
  const size = sizes[level % sizes.length];

  return (
    <li>
      {/* Placeholder item with a colored rectangle to simulate the tree node. */}
      <div
        style={{
          backgroundColor: "#e9e9ea",
          width: `${size}px`,
          height: "16px",
          marginBottom: "8px",
          padding: 0,
        }}
      />

      {/* Recursively render sub-items for nesting levels less than 2. */}
      {level < 2 && (
        <ul className={styles["tree-node"]}>
          <PlaceholderItem level={level + 1} />
          <PlaceholderItem level={level + 2} />
        </ul>
      )}
    </li>
  );
};

/**
 * TableOfContentsPlaceholder is a component that renders a loading placeholder for the Table of Contents.
 * It uses the PlaceholderItem component to create the nested structure of the placeholder.
 */
const TableOfContentsPlaceholder: React.FC = () => {
  return (
    <ul className={styles.tree} style={{ padding: 0 }}>
      {/* Render the PlaceholderItem twice to create the initial placeholder structure. */}
      <PlaceholderItem level={0} />
      <PlaceholderItem level={0} />
    </ul>
  );
};

export default TableOfContentsPlaceholder;
