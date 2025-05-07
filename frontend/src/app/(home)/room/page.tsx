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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { putPc } from "@/utils/request/pcRequest";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PcLoadingAnimation from "../pc/pcLoadingAnimation";

export default function Room() {
  const { table , isLoading} = useTable();
  const [roomId] = useQueryState('roomid')
  const router = useRouter()
  function generateNext24HoursEvery30Min() {
    const result = [];
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = minutes < 30 ? 30 : 0;
    if (roundedMinutes === 0) now.setHours(now.getHours() + 1);
    now.setMinutes(roundedMinutes, 0, 0);
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + i * 30 * 60000);
      const year = time.getFullYear();
      const month = String(time.getMonth() + 1).padStart(2, "0");
      const day = String(time.getDate()).padStart(2, "0");
      const hours = String(time.getHours()).padStart(2, "0");
      const mins = String(time.getMinutes()).padStart(2, "0");
      const secs = String(time.getSeconds()).padStart(2, "0");
      const ms = String(Math.floor(time.getMilliseconds() / 10)).padStart(
        2,
        "0"
      );
      result.push({
        fulldate: `${year}-${month}-${day} ${hours}:${mins}:${secs}.${ms}`,
        hour: `${hours}:${mins}`,
      });
    }

    return result;
  }
  const hours = generateNext24HoursEvery30Min();
  const [selectedPcs, setSelectedPcs] = useState<string[]>([]);
  const form = useForm<pcInput>({
    resolver: zodResolver(pcSchema),
    values: {
      duration: null,
      startTime :"",
    },
  });
  const minutes = [30, 60, 90, 120, 180, 240];
  const createBooking = async (values : pcInput)=>{
    if (!roomId) {
      return 
    }
    const response = await putPc(values, selectedPcs, roomId)
    console.log(response);
    
    if (response) {
      router.push(`/payment?payid=${response.pay.id}`)
    }
  }
  if (isLoading) {
    return <PcLoadingAnimation/>
  }
return(
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
          <form onSubmit={form.handleSubmit(createBooking)}>
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <Label>Start time</Label>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((time) => (
                          <SelectItem value={time.fulldate} key={time.hour}>
                            {time.hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <Label>Dutation (min)</Label>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={(val) => field.onChange(val ? Number(val) : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map((time) => (
                          <SelectItem value={String(time)} key={time}>
                            {time} min
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Төлөх</Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
