import { useContext } from "react";
import AfterLoggin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";
import ChangeLang from "./ChangeLang";
import ChangeTheme from "./ChangeTheme";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
// import { Icon } from "../Icons";
import { navLinks } from "@/utils/navLink";

export default function NavBar() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="drawer z-auto">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar justify-between top-0 sticky bg-base-100 w-full h-16 shadow-lg">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 px-2">Logo</div>
            <div className="flex-row ">
              <ul className="hidden lg:flex">
                {navLinks.map((item, index) => (
                  <li key={index} className="ml-2 btn btn-ghost">
                    <Link
                      href={item.href}
                      className="justify-center items-center"
                    >
                      <span className="m-1 mr-3">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ChangeTheme />
              <ChangeLang />
              {loggedIn ? <AfterLoggin /> : <BeforeLogin />}
            </div>
          </div>
        </div>
        {/* Page content here */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-2/3 p-4 z-1000">
            {navLinks.map((item, index) => (
              <li key={index} className="ml-2">
                <Link href={item.href} className="justify-center items-center">
                  <span className="m-1 mr-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <nav className="navbar justify-between top-0 z-30 sticky bg-base-100 w-full h-16 shadow-lg">
        <div className="logo-nav lg:ps-20">
          <p>LOGO</p>
        </div>
        <div className="flex-row flex-0">
          <ul className="flex flex-row mr-4">
            {navLinks.map((item, index) => (
              <li key={index} className="ml-2 btn btn-ghost">
                <Link
                  href={item.href}
                  className="flex flex-auto justify-center items-center"
                >
                  <Icon kind={item.icon} size={20}></Icon> 
                  <span className="m-1 ">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ChangeTheme />
          <ChangeLang />
          {loggedIn ? <AfterLoggin /> : <BeforeLogin />}
        </div>
      </nav> */}
    </>
  );
}
