import React, { ReactNode } from "react";
import styles from "./layout.module.css";
import NavBar from "./_components/navbar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <body>
      <NavBar />
      <main>{children}</main>
    </body>
  );
};

export default DashboardLayout;
