import { FC, ReactNode } from "react";

import Logo from "@/assets/logo.png";

import { TableOfContents } from "../TableOfContents";
import styles from "./Layout.module.css";

/**
 * Props interface for the Layout component.
 */
interface LayoutProps {
  /**
   * The content to be displayed inside the Layout.
   */
  children: ReactNode;
}

/**
 * The main Layout component that wraps the application content.
 *
 * @param {LayoutProps} props - The props for the Layout component.
 * @returns {JSX.Element} The rendered Layout component.
 */
export const Layout: FC<LayoutProps> = ({
  children,
}: LayoutProps): JSX.Element => {
  return (
    <main className={styles.container}>
      {/* Header section */}
      <header className={styles.header}>
        <img className={styles.logo} alt="TOC logo" src={Logo} />
      </header>

      {/* Main content layout */}
      <div className={styles.layout}>
        {/* Table of Contents */}
        <div>
          <TableOfContents />
        </div>

        {/* Main content and footer */}
        <div className={styles.content}>
          {/* Main content section */}
          <article className={styles["main-content"]}>{children}</article>

          {/* Footer section */}
          <footer className={styles.footer}>
            <p>Some Footer Content</p>
          </footer>
        </div>
      </div>
    </main>
  );
};
