"use client";
import { ReactNode, useContext } from "react";
import NavBar from "../Navbar/NavBar";
import SideBar from "../Sidebar/SideBar";
import { ThemeContext } from "@/contexts/ThemeContext";
import FeedbackCom from "../Feedback/FeedbackCom";
import Footer from "../Footer/Footer";
type Props = {
  children: ReactNode;
};
export default function AppLayout({ children }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <body className="w-full min-h-screen relative" data-theme={theme}>
        <NavBar />
        <main className="flex lg:px-20 w-full bg-base-100">{children}</main>
        {/* <Footer /> */}
      </body>
    </>
  );
}
