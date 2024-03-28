import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoaderExplore = () => {
  return (
    <SkeletonTheme baseColor="#727272 " highlightColor="#A4A3A3">
      <div className=" w-full  h-screen bg-dark-3 opacity-50 absolute explore-container">
        <div className="  explore-inner_container w-full ">
          <div className="w-full">
            <Skeleton count={1} className="w-44 h-8 rounded-lg" />
          </div>
          <div className="w-full">
            <Skeleton count={1} className=" h-12 rounded-lg" />
          </div>
        </div>
        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <Skeleton count={1} className="w-40 h-10" />
        </div>
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          <ul className="grid-container">
            {new Array(8).fill(0).map(() => {
              return (
                <div className="relative min-w-80 h-80">
                  <Skeleton count={1} className="h-80 rounded-2xl" />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoaderExplore;
