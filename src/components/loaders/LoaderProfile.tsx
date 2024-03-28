import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoaderProfile = () => {
  return (
    <SkeletonTheme baseColor="#727272 " highlightColor="#A4A3A3">
      <div className="flex gap-3 items-center">
        <Skeleton count={1} className="w-10 h-10 rounded-full" />
        {/* <div className="flex flex-col">
          <Skeleton count={1} className=" w-32 h-3 " />
          <Skeleton count={1} className=" w-16 h-3" />
        </div> */}
      </div>
    </SkeletonTheme>
  );
};

export default LoaderProfile;
