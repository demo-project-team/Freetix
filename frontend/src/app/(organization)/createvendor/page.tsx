"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { vendorInput, vendorScema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import ImageUpload from "./_components/UploadImage";
import { useState } from "react";
import { uploadImage } from "@/utils/request/uploadImage";
import { postVendor } from "@/utils/request/vendor";
import SelectCategory from "./_components/SelectCategory";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type VendorMapSelectorProps = {
  onLatLngChange: (latLng: { lat: number; lng: number }) => void;
};
const VendorMapSelector = dynamic<VendorMapSelectorProps>(
  () => import("./_components/LocationPicker"),
  { ssr: false }
);

const CreateVendor = () => {
  const [loading, setLoading] = useState(false)
    const router = useRouter()
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string[]>([]);
  const form = useForm<vendorInput>({
    resolver: zodResolver(vendorScema),
    values: {
      email: "",
      phone: "",
      description: "",
      mapLat: null,
      mapLng: null,
      imageUrl: "",
      name: "",
    },
  });
  const uploadImg = async (values: vendorInput) => {
    try {
      if (!image) {
        return;
      }
      setLoading(true)
      const url = await uploadImage(image);
      form.setValue("imageUrl", url);
    } catch (error) {
      console.log(error);
      setLoading(false)
    } finally {
      createVendor(values);
    }
  };
  const createVendor = async (values: vendorInput) => {
    if (!form.getValues("mapLat") || !form.getValues("mapLng")) {
      form.setError("mapLat", { message: "choose location" });
      setLoading(false)
      return;
    }
    if (!form.watch("imageUrl")) {
      setLoading(false)
      return;
    }
    console.log(category);
    if (form.getValues("imageUrl")?.length !== 0) {
      const res = await postVendor(values, category);
      console.log(res);
      
    if (res) {
        router.push(`/address?vendorid=${res.data}`)
        setLoading(false)
    }
    setLoading(false)
    }
  };
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <FormProvider {...form}>
        <form
          className="w-[500px] space-y-4"
          onSubmit={form.handleSubmit(uploadImg)}
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label>Phone</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <Label>Description</Label>
            <SelectCategory
              onValueChange={setCategory}
              defaultvalue={category}
            />
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>Description</Label>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => <ImageUpload setImage={setImage} />}
          />
          <VendorMapSelector
            onLatLngChange={(latLng) => {
              form.setValue("mapLat", latLng.lat);
              form.setValue("mapLng", latLng.lng);
            }}
          />
          <Button type="submit">
          {loading && <Loader2 className="animate-spin"/>}
            submit
            </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateVendor;
