import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Models } from "appwrite";
import {
  useCreatePost,
  useEditPost,
} from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: editPost } = useEditPost();

  const { user } = useUserContext();
  const navigate = useNavigate();

  const formSchema = z.object({
    caption: z.string().max(2200, {
      message: "Username must not exceed 2200 characters.",
    }),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (post && action === "Update") {
      const updatedPost = await editPost({
        ...values,
        postId: post.$id,
        imageID: post.imageID,
        imageURL: post.imageURL,
      });
      if (!updatedPost) toast({ title: "Post not updated! Please try again." });
      else navigate("/");
    } else {
      const newPost = await createPost({
        ...values,
        userId: user.id,
      });
      if (!newPost) toast({ title: "Post not created! Please try again." });
      else navigate("/");
    }

    console.log(values);
  }

  console.log("post form : ", post?.imageURL);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  placeholder="Type a Caption for your post."
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaURL={post?.imageURL}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (seperated by comma ',')
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Tech , Art , Politics"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => navigate("/")}
            type="button"
            className="shad-button_dark_4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            {action === "Update" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
