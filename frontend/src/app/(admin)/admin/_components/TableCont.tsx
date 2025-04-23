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
const TableCont = ({ org }: { org: Organization }) => {
  const form = useForm<statusInput>({
    resolver: zodResolver(statusSchema),
    values: {
      request: org.request,
    },
  });
  const putOrg = async (value:statusInput) => {
    await putOrgReq(value, org.id)
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex gap-4 items-center"
        onSubmit={form.handleSubmit(putOrg)}
      >
        <div>{org.email}</div>
        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                  <SelectItem value="APPROVED">APPROVED</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button>save changes</Button>
      </form>
    </FormProvider>
  );
};
export default TableCont;
