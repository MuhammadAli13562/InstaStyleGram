import { Toaster } from "@/components/ui/toaster";
import { useUserContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className=" x1:block h-screen w-1/2 object-cover bg-no-repeat"
          />
          <Toaster />
        </>
      )}
    </>
  );
};

export default AuthLayout;
