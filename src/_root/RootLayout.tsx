import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import { TopBar } from "@/components/shared/TopBar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSideBar />
      <section className="flex flex-1 h-full relative">
        <Outlet />
      </section>
      <BottomBar />
      <Toaster />
    </div>
  );
};

export default RootLayout;
