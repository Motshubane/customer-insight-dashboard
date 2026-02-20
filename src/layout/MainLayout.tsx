import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import "./MainLayout.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
};

export default MainLayout;
