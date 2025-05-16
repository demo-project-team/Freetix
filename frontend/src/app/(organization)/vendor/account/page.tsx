/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { PcProfile } from "./_features/pcProfile";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/request/uploadImage";
import { addImage, editImage, getImage } from "@/utils/request/vendor";
import { useVendor } from "@/provider/VendorProvider";
import { useQuery } from "@tanstack/react-query";

export default function Account() {
  const [url, setUrl] = useState<File | null>(null);
  const { vendor } = useVendor();
  const {data : image =[], refetch:refetchImage} = useQuery({
    queryKey : ['images'],
    queryFn : getImage
  })
  const upload = async () => {
    if (!url) {
      return;
    }
    const image = await uploadImage(url);
    await addImage({ url: image });
    refetchImage()
  };
  if (!vendor) {
    return;
  }
const setBakcgroundImage = async (id : string) => {
    await editImage(id)
    refetchImage()
}
  return (
    <div>
      <PcProfile />
      <FormItem>
        <Label className="w-30 h-30 flex items-center justify-center">
          <Input
            type="file"
            className="hidden"
            onChange={(e) => setUrl(e.target.files ? e.target.files[0] : null)}
          />
          <div>
            <ImageIcon />
          </div>
           зураг нэмэх
        </Label>
      </FormItem>
      <Button onClick={upload}>Upload</Button>
      <div className="flex gap-2">   {image?.map((img) => (
        <div

          onClick={()=>setBakcgroundImage(img.id)}
          className={`w-40 h-40 overflow-hidden rounded-md ${img.status ==='BACKGROUND' && "border-2 "}`}
          key={img.id}
        >
          <img src={img.url} alt="img" className="h-full" />
        </div>
      ))}</div>
   
      <p>Background image</p>
         {image?.filter((img)=>img.status === "BACKGROUND").map((img) => (
        <div
          onClick={()=>setBakcgroundImage(img.id)}
          className={`w-40 h-40 `}
          key={img.id}
        >
          <img src={img.url} alt="img" />
        </div>
      ))}
    </div>
  );
}
