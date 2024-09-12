"use client";
import { ReactNode, useContext } from "react";
import NavBar from "../Navbar/NavBar";
import { ThemeContext } from "@/contexts/ThemeContext";
type Props = {
  children: ReactNode;
};
export default function AppLayout({ children }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <body className="w-full min-h-screen" data-theme={theme}>
        <div className="relative z-50">
          <NavBar />
        </div>
        <main className="flex lg:px-20 w-full bg-base-100 relative z-10">
          {children}
        </main>
        {/* <Footer /> */}
      </body>
    </>
  );
}
