'use client'

import { TabsContent } from "@radix-ui/react-tabs"
import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { signUpSchema } from "@/schemas/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { singUpRequest } from "@/utils/request/authRequest"
import { z } from "zod"

export const Sign = () => {
      const [loading, setLoading] = useState(false);
      const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        values: {
          email: "",
          password: "",
          username: "",
          phone: "",
          profileImage: "",
        },
      });
      const signUp = async (values: z.infer<typeof signUpSchema>) => {
        setLoading(true);
        const response = await singUpRequest(values);
        if (response) {
          setLoading(false);
        }
        setLoading(false);
    }
    return(
        <TabsContent value="password">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(signUp)}
                className="mt-[20px] flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <p>UserName</p>
                      <FormControl>
                        <Input {...field} />
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
                      <p>Phone</p>
                      <FormControl>
                        <Input {...field} />
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
                  {loading && <Loader2 />}
                  Continue
                </Button>
              </form>
            </FormProvider>
        </TabsContent>
    )
}