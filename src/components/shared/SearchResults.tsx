import { Models } from "appwrite";
import { Loader } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  searchedPosts?: Models.DocumentList<Models.Document>;
  isSearchFetching: boolean;
};

const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultsProps) => {
  if (isSearchFetching)
    return (
      <div className="flex-center w-full">
        <Loader />
      </div>
    );

  if (searchedPosts?.documents?.length)
    return <GridPostList posts={searchedPosts.documents} />;

  return (
    <div className="text-light-4 text-xl mt-10 text-center w-full">
      No results!
    </div>
  );
};

export default SearchResults;
