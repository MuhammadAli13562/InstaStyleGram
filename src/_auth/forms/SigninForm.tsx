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
import { SigninValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/queriesandMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const SigninForm = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: signInAccount,
    isSuccess: isSignedIn,
    isLoading: isSigningIn,
    isError: isSignInError,
  } = useSignInAccount();
  const { checkAuthUser } = useUserContext();
  const toastId = "SigningInToast";

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSigningIn) toast.loading("Signing In", { toastId });
    if (isSignedIn)
      toast.update(toastId, { render: "Sign In Successful", type: "success", isLoading: false });
    if (isSignInError)
      toast.update(toastId, { render: "Sign In Error", type: "error", isLoading: false });
  }, [isSigningIn, isSignedIn, isSignInError]);

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await toast.promise(
      signInAccount({
        email: values.email,
        password: values.password,
      }),
      {
        pending: "Signing In",
      },
      {
        toastId,
      }
    );
    if (!session) return;

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else toast.error("User not logged In ! Try Again");
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.png" />
        <h2 className="font-bold my-2 mb-6">Log In to your Account</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-center space-y-4"
        >
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
          <Button disabled={isSigningIn} className="shad-button_primary w-full" type="submit">
            Sign In
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account ?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
