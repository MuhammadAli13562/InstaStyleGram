import PostForm from "@/components/forms/PostForm";
import { useGetPostbyId } from "@/lib/react-query/queriesandMutations";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostbyId(id || "");

  if (isLoading)
    return (
      <div className="flex-center w-full">
        <Loader />
      </div>
    );
  console.log("Post :", post);

  return (
    <div className="flex flex-1 ">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-2 justify-start w-full">
          <img src="/assets/icons/add-post.svg" />
          <h2 className="h3-bold md:h2-bold">Edit Post</h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
