"use client";

import { organizationSchema } from "@/schemas/userSchema";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signUpOrg } from "@/utils/request/authRequest";
import { toast } from "sonner";
import { TabsContent } from "@radix-ui/react-tabs";

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    values: {
      email: "",
      password: "",
      phone: "",
      OrganizationRegister: "",
      name: "",
    },
  });
  const signUp = async (values: z.infer<typeof organizationSchema>) => {
    setLoading(true);
    const response = await signUpOrg(values);
    if (response) {
      toast(<div>Request sent succesful</div>);
      setLoading(false);
    } else {
      toast(<div>failed</div>);
    }
    setLoading(false);
  };
  return (
    <TabsContent value="БҮРТГҮҮЛЭХ">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(signUp)}
          className="mt-[20px] flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>UserName</Label>
                <FormControl>
                  <Input {...field} placeholder="Enter organization name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label>Phone</Label>
                <FormControl>
                  <Input {...field} placeholder="enter phone number" />
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
                <Label>Email</Label>
                <FormControl>
                  <Input {...field} placeholder="enter email" />
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
                <Label>Password</Label>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="OrganizationRegister"
            render={({ field }) => (
              <FormItem>
                <Label>Байгууллагын регистэр</Label>
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
      </FormProvider>
    </TabsContent>
  );
};
