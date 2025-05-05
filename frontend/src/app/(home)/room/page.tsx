"use client";

import { useTable } from "@/provider/TableProvider";
import { ComputerPc } from "./_components/ComputerPc";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { pcInput, pcSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Room() {
  const { table } = useTable();
  const [selectedPcs, setSelectedPcs] = useState<string[]>([]);
  const form = useForm<pcInput>({
    resolver: zodResolver(pcSchema),
    values: {
      endTime: "",
      startTime: "",
    },
  });
  return (
    <div className="flex">
      {table.map((table, index) => (
        <div key={index} className="flex items-center justify-center">
          <ComputerPc
            pcs={table.pcs}
            setSelectedPcs={setSelectedPcs}
            selectedPcs={selectedPcs}
          />
        </div>
      ))}
      {selectedPcs.length >= 1 && (
        <FormProvider {...form}>
          <form>
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <Label>Start time</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <Label>End time</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
}
