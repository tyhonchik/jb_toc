import { FC } from "react";

import Logo from "@/assets/logo.png";
import { IApiResponse } from "@/types";

import { TableOfContents } from "../TableOfContents";
import styles from "./Layout.module.css";

interface ILayoutProps {
  data?: IApiResponse;
  children: React.ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ data, children }) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} alt="TOC logo" src={Logo} />
      </header>
      <div className={styles.layout}>
        <TableOfContents data={data} />
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
