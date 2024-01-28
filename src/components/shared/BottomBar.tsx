import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isLinkActive = link.route === pathname;

        return (
          <Link
            className={` group  p-2 flex-center flex-col gap-1 rounded-md transition  hover:bg-primary-500 ${
              isLinkActive && "bg-primary-500 "
            } `}
            to={link.route}
          >
            <img
              className={`w-8 h-8 group-hover:invert-white  ${
                isLinkActive && "invert-white"
              }`}
              width={16}
              height={16}
              src={link.imgURL}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
