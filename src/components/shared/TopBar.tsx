import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";

export const TopBar = () => {
  const { mutate: signOutAccount, isSuccess: isSignedOut } =
    useSignOutAccount();

  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedOut) navigate(0);
  }, [isSignedOut]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={135} />
        </Link>
        <div className="flex">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOutAccount()}
          >
            <img src="/assets/icons/logout.svg" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageURL || "assets/images/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
