import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoaderStats = () => {
  return (
    <SkeletonTheme baseColor="#727272 " highlightColor="#A4A3A3">
      <Skeleton count={1} className=" w-8 h-3 " />
    </SkeletonTheme>
  );
};

export default LoaderStats;
