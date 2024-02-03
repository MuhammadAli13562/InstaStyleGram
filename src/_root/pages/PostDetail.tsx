import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useDeletePost,
  useGetCurrentUser,
  useGetPostbyId,
} from "@/lib/react-query/queriesandMutations";
import { formatDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isPending: isLoadingPost } = useGetPostbyId(id || "");
  const { data: user } = useGetCurrentUser();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  //  console.log("postdetails:", post?.creator.imageURL);

  const navigate = useNavigate();

  const onDelete = async () => {
    const status = await deletePost({
      postId: post?.$id || "",
      imageID: post?.imageID,
    });

    if (!status) toast({ title: "Failed to delete post! Please try again." });
    else navigate("/");
  };

  return (
    <div className="post_details-container">
      {isLoadingPost ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageURL} className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageURL ||
                    "assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-10 lg:w-12 "
                />
                <div className="flex flex-col">
                  <p className="small-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post?.$createdAt || "")}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              {user?.$id === post?.creator.$id ? (
                isDeletingPost ? (
                  <>Deleting Post....</>
                ) : (
                  <div className="flex-center gap-4">
                    <Link to={`/update-post/${post?.$id}`}>
                      <img
                        src="/assets/icons/edit.svg"
                        height={24}
                        width={24}
                      />
                    </Link>
                    <Button className="" onClick={onDelete}>
                      <img
                        src="/assets/icons/delete.svg"
                        height={24}
                        width={24}
                      />
                    </Button>
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user?.$id || ""} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
