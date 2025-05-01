'use client'

import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { FacebookIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { loginSchema, UserLoginInput } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import GoogleLogo from "./icons/googleLogo";
import { signInRequest } from "@/utils/request/authRequest";
import { useUser } from "@/provider/UserProvider";
import { toast } from "sonner";

export const Loginup = () => {
  const {refetchUser} =useUser()
  const [loading, setLoading] = useState(false);
  const form = useForm<UserLoginInput>({
    resolver: zodResolver(loginSchema),
    values: {
      emailOrPhone: "",
      password: "",
    },
  });
  const signUp = async (values:UserLoginInput) => {
    setLoading(true);
    const response = await signInRequest(values);
    if (response) {
      setLoading(false);
      toast('Login succesful')
      refetchUser()
    }
    setLoading(false);
  };
  const handleGoogleLogin = () => {
    window.location.href = 'https://freetix-d0gf.onrender.com/auth/google'
  }
  const handleFacebookLogin = () => {
    window.location.href = 'https://freetix-d0gf.onrender.com/auth/facebook'
  }
  return (
    <TabsContent value="НЭВТРЭХ" className="flex flex-col gap-3">
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(signUp)}
        className="mt-[20px] flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <p>Email</p>
              <FormControl>
                <Input {...field} />
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
              <p>Password</p>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type="submit"
          className="mt-[20px] h-9 px-4 px-3 w-full py-2 cursor-bot-allowed"
        >
          {loading && <Loader2 className="animate-spin"/>}
          Continue
        </Button>
      </form>
    </FormProvider>
    <Button onClick={handleGoogleLogin} className="flex w-full"> <GoogleLogo/> sign in with google</Button>
    <Button onClick={handleFacebookLogin} className="flex w-full"><FacebookIcon/> sign in with facebook</Button>
    </TabsContent>
  );
};
