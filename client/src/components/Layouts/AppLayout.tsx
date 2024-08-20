"use client";
import { ReactNode, useContext } from "react";
import NavBar from "../Navbar/NavBar";
import SideBar from "../Sidebar/SideBar";
import { ThemeContext } from "@/contexts/ThemeContext";
import FeedbackCom from "../Feedback/FeedbackCom";
type Props = {
  children: ReactNode;
};
export default function AppLayout({ children }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <body className="w-full lg:h-full" data-theme={theme}>
        <div className="w-full max-w-screen">
          <NavBar />
          <div className="flex lg:px-20 w-full h-full">{children}</div>
        </div>
      </body>
    </>
  );
}
