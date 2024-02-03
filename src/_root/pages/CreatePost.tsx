import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1 ">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-2 justify-start w-full">
          <img src="/assets/icons/add-post.svg" />
          <h2 className="h3-bold md:h2-bold">Create Post</h2>
        </div>
        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
