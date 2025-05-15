import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { adminInput, adminSchema } from "@/schemas/userSchema";
import { adminLogin } from "@/utils/request/authRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const LoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<adminInput>({
    resolver: zodResolver(adminSchema),
    values: {
      email: "",
      password: "",
    },
  });
  const login = async (values: adminInput) => {
    setLoading(true);
    const response = await adminLogin(values);
    if (response) {
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <TabsContent value="НЭВТРЭХ" className="flex flex-col gap-3">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(login)}
          className="mt-[20px] flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
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
      </FormProvider>
    </TabsContent>
  );
};
