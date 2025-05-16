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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const LoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      router.push("/admin");
    }
    setLoading(false);
    if (!loading) {
      form.setError("email", { message: "Админ эрх алга" });
    }
  };
  const demo = () => {
    form.setValue("email", "uskhuunymdavaa@gmail.com");
    form.setValue("password", "12345678");
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(login)} className="flex flex-col gap-3">
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
                <Input {...field} type="password" />
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
      <Button onClick={demo} className="mt-10">
        Demo
      </Button>
    </FormProvider>
  );
};
