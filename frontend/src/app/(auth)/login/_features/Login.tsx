// "use client";

// import { signUpSchema } from "@/schemas/userSchema";
// import { FormProvider, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { singUpRequest } from "@/utils/request/authRequest";

// export const LoginForm = () => {
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     values: {
//       email: "",
//       password: "",
//       username: "",
//       phone: "",
//       profileImage: "",
//     },
//   });
//   const signUp = async (values: z.infer<typeof signUpSchema>) => {
//     singUpRequest(values);
//   };
//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(signUp)} className="mt-[20px]">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <Label>Email</Label>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <Label>Password</Label>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           type="submit"
//           className="mt-[20px] h-9 px-4 px-3 w-full py-2 cursor-bot-allowed"
//         >
//           Continue
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };
