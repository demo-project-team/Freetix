"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTable } from "@/provider/TableProvider";
import { tableInput, tableSchema } from "@/schemas/schemas";
import { postTable } from "@/utils/request/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryState } from "nuqs";
import { FormProvider, useForm } from "react-hook-form";
const AddTable = () => {
  const [roomId] = useQueryState("roomid");
  const { refetchTable } = useTable();
  const form = useForm<tableInput>({
    resolver: zodResolver(tableSchema),
    values: {
      name: "",
      row: 1,
      col: 1,
    },
  });
  const createTable = async (value: tableInput) => {
    const res = await postTable(value, roomId);
    if (res) {
      refetchTable();
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(createTable)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="enter table name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="col"
              render={() => (
                <FormItem>
                  <Label>col</Label>
                  <FormControl>
                    <Input onChange={(e)=>form.setValue('col', Number(e.target.value))} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="row"
              render={() => (
                <FormItem>
                  <Label>row</Label>
                  <FormControl>
                    <Input onChange={(e)=>form.setValue('row', Number(e.target.value))} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"></Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
export default AddTable;
