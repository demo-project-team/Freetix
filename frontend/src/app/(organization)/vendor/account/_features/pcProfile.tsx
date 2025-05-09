"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useVendor } from "@/provider/VendorProvider";
import { vendorInput, vendorScema } from "@/schemas/schemas";
import { putVendor } from "@/utils/request/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const PcProfile = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState("");
  console.log(avatarImage);
  const [preview, setPreview] = useState<string | null>(null);
  const { vendor } = useVendor();
  console.log(vendor);

  const form = useForm<vendorInput>({
    resolver: zodResolver(vendorScema),
    values: {
      name: vendor?.name,
      email: vendor?.email,
      imageUrl: vendor?.imageUrl ? vendor.imageUrl : "",
      phone: vendor?.phone,
      description: vendor?.description ? vendor.description : "",
      mapLat: vendor?.mapLat,
      mapLng: vendor?.mapLng,
    },
  });
  const img = form.getValues("imageUrl")
  const [image, setImage] =useState<string | undefined>(img) ;
  const updatedAccount = async (value: vendorInput) => {
    setLoading(true);
    try {
      const response = await putVendor(value);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const ProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const file = e.target.files[0];

      try {
        setUploadImage(true);
        const objecturl = URL?.createObjectURL(file);
        setImage(undefined)
        setPreview(objecturl);


        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "coffee");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dovchxnto/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const result = await response.json();
        setAvatarImage(result.secure_url);
      } catch (error) {
        console.error(error);
      } finally {
        setUploadImage(false);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(updatedAccount)}
        className="flex w-[510px] h-auto flex-col gap-[24px] "
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormControl>
                <Label className="flex flex-col gap-[12px] items-center">
                  <p className="font-semibold text-sm">Address image</p>
                  <div className="flex w-[390px] h-[200px] justify-center items-center bg-[#E4E4E7] border-dashed border ">
                    {image ? (
                      <Image
                        className="w-full h-full"
                        src={image}
                        alt="img"
                        width={390}
                        height={200}
                      />
                    ) : (
                      <>
                        {" "}
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile preview"
                            className="w-full h-full object-cover "
                          />
                        ) : (
                          <Camera type="file" />
                        )}
                      </>
                    )}
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    onChange={ProfileImage}
                    disabled={uploadImage}
                  />
                </Label>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-[12px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your name here"
                    className="py-2 px-3"
                  />
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
                <Label>Email</Label>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your name here"
                    className="py-2 px-3"
                  />
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
                  <Input
                    {...field}
                    placeholder="Enter your name here"
                    className="py-2 px-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>Description</Label>
                <FormControl>
                  <Textarea
                    className="resize-none h-[131px] py-2 px-3"
                    {...field}
                    placeholder="Write about yourself here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex  gap-[10px] w-[510px] justify-end">
          <Button type="submit" className="px-20 py-2 " disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
