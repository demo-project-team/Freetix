"use client";

import { OrganizationLoginInput, organizationSchemaLogin } from "@/schemas/userSchema";
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
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";
import { loginOrg } from "@/utils/request/authRequest";

const LoginForm = () => {
  const router = useRouter()
  const form = useForm<OrganizationLoginInput>({
    resolver: zodResolver(organizationSchemaLogin),
    values: {
      phoneOrOrganizationRegister: "",
      password: "",
    },
  });
  const login = async (values:OrganizationLoginInput) => {
    const response =await loginOrg(values)
    if (response) {
      router.push(`/vendor`)
    }
  };
  return (
    <div className="w-full  bg-black p-10 rounded-xl border border-neutral-800 shadow-lg">
      <motion.div
        className="w-[300px]  bg-black p-10 rounded-xl border border-neutral-800 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(login)} >
          <FormField
            control={form.control}
            name="phoneOrOrganizationRegister"
            render={({ field }) => (    
              <FormItem >
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
            type="submit"
            className="mt-[20px] h-9 px-4 px-3 w-full py-2 cursor-bot-allowed"
          >
            Continue
          </Button>
        </form>
      </FormProvider>
      </motion.div>
    </div>
  );
};
export default LoginForm
