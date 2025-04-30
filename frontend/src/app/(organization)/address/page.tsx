"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addressInput, addressSchema } from "@/schemas/schemas";
import { getCity, getDistrict, postAddress } from "@/utils/request/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export default function Address() {
  const router = useRouter()
  const form = useForm<addressInput>({
    resolver: zodResolver(addressSchema),
    values: {
      SumOrKhoroo: "",
      cityId: "",
      districtId: "",
      street: "",
    },
  });
  const { data: cities = [] } = useQuery({
    queryKey: ["city"],
    queryFn: getCity,
  });
  const { data: district = [] , refetch} = useQuery({
    queryKey: ["district"],
    queryFn: () => getDistrict(form.watch("cityId")),
    enabled: !!(form.getValues("cityId").length !== 0),
  });
  console.log(district);
  
  const [loading, setLoading] = useState(false);

  const addressUp = async (values: addressInput) => {
    setLoading(true);
    const response = await postAddress(values);
    if (response) {
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(()=>{
    refetch()
  },[cities])
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(addressUp)}
          className="w-[500px] space-y-4"
        >
          <FormField
            control={form.control}
            name="SumOrKhoroo"
            render={({ field }) => (
              <FormItem>
                <Label>SumOrKhoroo</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <Label>street</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem>
                <Label>City</Label>
                <FormControl>
                  <Select
                    name="cityId"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
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
            name="districtId"
            render={({ field }) => (
              <FormItem>
                <Label>City</Label>
                <FormControl>
                  <Select
                    name="cityId"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="district" />
                    </SelectTrigger>
                    <SelectContent>
                      {district.map((dis) => (
                        <SelectItem key={dis.id} value={dis.id}>
                          {dis.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
  

          <Button type="submit" onClick={()=>router.push('/vendor')}>
            {loading && <Loader2 />}
            submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
