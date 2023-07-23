import styles from "./TableOfContents.module.css";

interface IProps {
  level: number;
}

const PlaceholderItem = ({ level }: IProps) => {
  const sizes = [216, 200, 184, 168];
  const size = sizes[level % sizes.length];

  return (
    <li>
      <div
        style={{
          backgroundColor: "#e9e9ea",
          width: `${size}px`,
          height: "16px",
          marginBottom: "8px",
          padding: 0,
        }}
      />
      {level < 2 && (
        <ul className={styles["tree-node"]}>
          <PlaceholderItem level={level + 1} />
          <PlaceholderItem level={level + 2} />
        </ul>
      )}
    </li>
  );
};

const TableOfContentsPlaceholder = () => {
  return (
    <ul className={styles.tree} style={{ padding: 0 }}>
      <PlaceholderItem level={0} />
      <PlaceholderItem level={0} />
    </ul>
  );
};

export default TableOfContentsPlaceholder;
