"use client";

import {
  OrganizationLoginInput,
  organizationSchemaLogin,
} from "@/schemas/userSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginOrg } from "@/utils/request/authRequest";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<OrganizationLoginInput>({
    resolver: zodResolver(organizationSchemaLogin),
    values: {
      phoneOrOrganizationRegister: "",
      password: "",
    },
  });
  const login = async (values: OrganizationLoginInput) => {
    setLoading(true);
    const response = await loginOrg(values);
    if (response) {
      setLoading(false);
      router.push(`/vendor`);
    }
    setLoading(false);
    if (!loading) {
         form.setError('password', {message:"wrong password or email"})
    }
  };
   const demo = ()=> {
    form.setValue('phoneOrOrganizationRegister', "exampleorg@gmail.com")
    form.setValue('password', '12345678')
  }
  return (
    <TabsContent value="НЭВТРЭХ" className="flex flex-col gap-3">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(login)}
          className="mt-[20px] flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="phoneOrOrganizationRegister"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
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
              <FormItem className="mt-[10px]">
                <Label>Password</Label>
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
            {loading && <Loader2 className="animate-spin" />}
            Continue
          </Button>
        </form>
        <Button onClick={demo} className="mt-5 w-20">for demo</Button>
      </FormProvider>
    </TabsContent>
  );
};
export default LoginForm;
