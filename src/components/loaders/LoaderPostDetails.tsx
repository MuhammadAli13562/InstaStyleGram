import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoaderPostDetails = () => {
  return (
    <div className=" w-full max-w-5xl p-4 border-2 border-dark-3 rounded-2xl bg-dark-2">
      <SkeletonTheme baseColor="#727272 " highlightColor="#A4A3A3">
        <div className=" flex gap-12 ">
          <div className="">
            <Skeleton count={1} className="h-[37vh] w-[450px] rounded-lg" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex ">
                {/* Profile */}
                <div className="mt-6 flex items-center justify-between w-[450px]">
                  <div className="flex items-center gap-3">
                    <Skeleton count={1} className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col">
                      <Skeleton count={1} className="w-32 h-3" />
                      <Skeleton count={1} className=" w-44 h-3" />
                    </div>
                  </div>
                  <Skeleton count={1} className="w-12" />
                </div>
              </div>
              <span className="w-full border-t-2 border-dark-4"></span>
              <div>
                <Skeleton count={1} className="w-32 h-3" />
                <Skeleton count={1} className="w-24 h-3" />
              </div>
            </div>
            <div className="flex justify-between">
              <Skeleton count={1} className="w-12 h-3" />
              <Skeleton count={1} className="w-12 h-3" />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default LoaderPostDetails;
