// "use client";
// import { Organization } from "@/Types/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, useForm } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { FormField, FormItem } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { statusInput, statusSchema } from "@/schemas/userSchema";
// import { putOrgReq } from "@/utils/request/authRequest";
// import { useState } from "react";

// // PostCategory Component
// const PostCategory = () => {
//   const [category, setCategory] = useState("");

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCategory(event.target.value);
//   };

//   const handlePostClick = () => {
//     if (category) {
//       console.log(`Post category: ${category}`);
//       // Энд post хийж болох кодыг нэмнэ
//     } else {
//       alert("Please enter a category.");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={category}
//         onChange={handleInputChange}
//         placeholder="Enter category"
//       />
//       <button onClick={handlePostClick}>Post</button>
//     </div>
//   );
// };

// // TableCont Component
// const TableCont = ({ org }: { org: Organization }) => {
//   const form = useForm<statusInput>({
//     resolver: zodResolver(statusSchema),
//     values: {
//       request: org.request,
//     },
//   });

//   const putOrg = async (value: statusInput) => {
//     await putOrgReq(value, org.id);
//   };

//   return (
//     <div className="w-full max-w-md mt-10 p-6 bg-white rounded-2xl shadow-xl">
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(putOrg)}
//           className="flex flex-col gap-6"
//         >
//           <div className="space-y-2 text-sm text-gray-700">
//             <div className="flex justify-between">
//               <span className="font-medium">User Email:</span>
//               <span>{org.email}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Phone Number:</span>
//               <span>{org.phone}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">User Name:</span>
//               <span>{org.name}</span>
//             </div>
//           </div>

//           <FormField
//             control={form.control}
//             name="request"
//             render={({ field }) => (
//               <FormItem>
//                 <Select
//                   defaultValue={field.value}
//                   onValueChange={field.onChange}
//                 >
//                   <SelectTrigger
//                     className={`w-full ${
//                       field.value === "APPROVED"
//                         ? "bg-green-100 text-green-700"
//                         : field.value === "CANCELLED"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     <SelectValue placeholder="Select Status" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem
//                       value="PENDING"
//                       className="text-yellow-600 hover:bg-yellow-100 focus:bg-yellow-100"
//                     >
//                       PENDING
//                     </SelectItem>
//                     <SelectItem
//                       value="CANCELLED"
//                       className="text-red-600 hover:bg-red-100 focus:bg-red-100"
//                     >
//                       CANCELLED
//                     </SelectItem>
//                     <SelectItem
//                       value="APPROVED"
//                       className="text-green-600 hover:bg-green-100 focus:bg-green-100"
//                     >
//                       APPROVED
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full">
//             Save Changes
//           </Button>
//         </form>
//       </FormProvider>
//     </div>
//   );
// };

// export default TableCont;
"use client";
import { Organization } from "@/Types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { statusInput, statusSchema } from "@/schemas/userSchema";
import { putOrgReq } from "@/utils/request/authRequest";
import { useState } from "react";

// PostCategory Component

// TableCont Component
const TableCont = ({ org }: { org: Organization }) => {
  const form = useForm<statusInput>({
    resolver: zodResolver(statusSchema),
    values: {
      request: org.request,
    },
  });

  const [category, setCategory] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const putOrg = async (value: statusInput) => {
    await putOrgReq(value, org.id);
    console.log(`Category selected: ${category}`);
  };

  return (
    <div className="w-full max-w-md mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(putOrg)}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">User Email:</span>
              <span>{org.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{org.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">User Name:</span>
              <span>{org.name}</span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="request"
            render={({ field }) => (
              <FormItem>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className={`w-full ${
                      field.value === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : field.value === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem
                      value="PENDING"
                      className="text-yellow-600 hover:bg-yellow-100 focus:bg-yellow-100"
                    >
                      PENDING
                    </SelectItem>
                    <SelectItem
                      value="CANCELLED"
                      className="text-red-600 hover:bg-red-100 focus:bg-red-100"
                    >
                      CANCELLED
                    </SelectItem>
                    <SelectItem
                      value="APPROVED"
                      className="text-green-600 hover:bg-green-100 focus:bg-green-100"
                    >
                      APPROVED
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TableCont;
