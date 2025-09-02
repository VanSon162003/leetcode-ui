"use client";

import Header from "../Header";
import Sidebar from "../Sidebar";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
