import { FC } from "react";

import Logo from "@/assets/logo.png";

import { TableOfContents } from "../TableOfContents";
import styles from "./Layout.module.css";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} alt="TOC logo" src={Logo} />
      </header>
      <div className={styles.layout}>
        <div>
          <TableOfContents />
        </div>
        <div className={styles.content}>
          <article className={styles["main-content"]}>{children}</article>
          <footer className={styles.footer}>
            <p>Some Footer Content</p>
          </footer>
        </div>
      </div>
    </main>
  );
};
