import Link from "next/link";
import { Icon } from "../Icons";

export default function TheAccountUnLogged() {
  return (
    <>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <div className="flex justify-center align-middle btn btn-circle btn-ghost">
              <Icon kind="account" size={30} />
            </div>
          </div>
          <div
            tabIndex={0}
            className="top-px border-white/5 bg-base-200 shadow-2xl mt-16 border rounded-box w-44 max-h-[calc(100vh-10rem)] text-base-content overflow-y-auto dropdown-content outline outline-1 outline-black/5"
          >
            <ul className="gap-1 menu menu-sm">
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/register"}>Sign up</Link>
              </li>
              <li>
                <p>Try without account</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
