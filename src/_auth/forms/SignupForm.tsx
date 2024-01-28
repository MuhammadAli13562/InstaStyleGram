import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const { checkAuthUser } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "User Not Created!",
        description: "Error Occured while creating user",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return toast({
        title: "Sign in failed . Please try again",
      });

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) navigate("/");
    else toast({ title: "User not logged In. Try Again" });
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" />
        <h2 className="font-bold my-2">Create a new Account</h2>
        <p className="text-light-3 small-medium md:base-regular mb-2">
          To use InstaStyleGram enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-center space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input  "
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input 
         "
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input 
         "
                    placeholder="john1234"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input 
         "
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary w-full" type="submit">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                Loading
                <Loader />
              </div>
            ) : (
              <div>Sign up</div>
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account ?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
