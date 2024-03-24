import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

export const LeftSideBar = () => {
  const { mutate: signOutAccount, isSuccess: isSignedOut } = useSignOutAccount();

  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSignedOut) navigate(0);
  }, [isSignedOut]);

  return (
    <div className="leftsidebar">
      <div className="flex flex-col gap-10">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.png" alt="logo" width={300} />
        </Link>
        <Link className="flex gap-2" to={`/profile/${user.id}`}>
          <img className="w-10 h-10 rounded-full" src={user.imageURL} />
          <div className="flex flex-col">
            <span className="text-white text-md font-bold ">{user.name}</span>
            <span className="text-sm">{user.username}</span>
          </div>
        </Link>
        <ul>
          {sidebarLinks.map((link: INavLink) => {
            const isLinkActive = link.route === pathname;

            return (
              <li className={`leftsidebar-link group mb-6 ${isLinkActive && "bg-primary-500"} `}>
                <NavLink className="flex gap-6 items-center p-4" to={link.route}>
                  <img
                    className={`w-8 h-8 group-hover:invert-white  ${
                      isLinkActive && "invert-white"
                    }`}
                    src={link.imgURL}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant="ghost" className="shad-button_ghost" onClick={() => signOutAccount()}>
        <img src="/assets/icons/logout.svg" />
        <span className="small-medium lg:base-medium">Logout</span>
      </Button>
    </div>
  );
};

export default LeftSideBar;
