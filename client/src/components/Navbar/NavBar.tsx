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
      <nav className="navbar justify-between top-0 z-30 sticky bg-base-100 w-full h-16 shadow-lg">
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
                  {/* <Icon kind={item.icon} size={20}></Icon> */}
                  <span className="m-1 ">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ChangeTheme />
          <ChangeLang />
          {loggedIn ? <AfterLoggin /> : <BeforeLogin />}
        </div>
      </nav>
    </>
  );
}
