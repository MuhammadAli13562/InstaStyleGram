import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoaderHomeFeed = () => {
  return (
    <SkeletonTheme baseColor="#727272 " highlightColor="#A4A3A3">
      {new Array(3).fill(0).map(() => (
        <div className="flex flex-col w-full p-8 bg-dark-2 gap-y-6 border-2 border-dark-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className=" flex gap-3">
              <Skeleton count={1} className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <Skeleton count={1} className=" w-32 h-3 " />
                <Skeleton count={1} className=" w-16 h-3" />
              </div>
            </div>
            <div>
              <Skeleton count={1} className="w-8 h-4" />
            </div>
          </div>
          <div>
            <Skeleton count={1} className="w-32 h-3" />
            <Skeleton count={1} className="w-12 h-3" />
          </div>
          <div>
            <Skeleton count={1} className=" h-[50vh] rounded-xl" />
          </div>
          <div className="flex justify-between">
            <Skeleton count={1} className="w-12 h-3" />
            <Skeleton count={1} className="w-12 h-3" />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export default LoaderHomeFeed;
