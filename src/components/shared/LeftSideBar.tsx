import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
import LoaderProfile from "../loaders/LoaderProfile";
import { toast } from "react-toastify";

export const LeftSideBar = () => {
  const {
    mutate: signOutAccount,
    isLoading: isSigningOut,
    isSuccess: isSignedOut,
  } = useSignOutAccount();

  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toastId = 1;

  useEffect(() => {
    if (isSignedOut) {
      toast.update(toastId, { render: "All is good", type: "success", isLoading: false });
      navigate(0);
    }

    if (isSigningOut) toast.loading("Signing Out User", { toastId });
  }, [isSignedOut, isSigningOut]);

  const handleSignOut = async () => {
    signOutAccount();
  };

  return (
    <div className="leftsidebar">
      <div className="flex flex-col gap-16 ">
        <Link to="/" className="flex -ml-6 ">
          <img src="/assets/images/logo.png" alt="logo" width={300} />
        </Link>

        <ul>
          {sidebarLinks.map((link: INavLink) => {
            const isLinkActive = link.route === pathname;

            return (
              <li
                className={`leftsidebar-link group w-[15vw] mb-6 ${
                  isLinkActive && "bg-primary-500"
                } `}
              >
                <NavLink className="flex gap-6 items-center p-4 " to={link.route}>
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
      {/* Profile  */}
      <div className="flex-between">
        {isLoading ? (
          <LoaderProfile />
        ) : (
          <Link className="flex gap-2" to={`/profile/${user.id}`}>
            <img className="w-10 h-10 rounded-full" src={user.imageURL} />
            {/* <div className="flex flex-col">
              <span className="text-white text-md font-bold ">{user.name}</span>
              <span className="text-sm">{user.username}</span>
            </div> */}
          </Link>
        )}
        <Button
          disabled={isSigningOut}
          variant="ghost"
          className="shad-button_ghost"
          onClick={handleSignOut}
        >
          <img src="/assets/icons/logout.svg" />
          <span className="small-medium lg:base-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default LeftSideBar;
