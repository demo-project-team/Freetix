"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = ({
  setImage,
}: {
  setImage: (image: File | null) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const generatePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      const file = e.target.files[0];
      const objecturl = URL.createObjectURL(file);
      setPreview(objecturl);
      setImage(file);
    }
  };

  return (
    <>
      {!preview ? (
        <Label className="flex h-[200px] rounded-lg items-center cursor-pointer bg-[#18181B] px-4 py-2 rounded-lg gap-2 text-[#FAFAFA] justify-center">
          <CameraIcon />
          Add image
          <input type="file" onChange={generatePreview} className="hidden" />
        </Label>
      ) : (
        <div className="w-full h-[200px] overflow-hidden  rounded-lg relative flex items-center">
          <Image
            className="w-full h-auto"
            alt="background"
            width={1000}
            height={100}
            src={preview}
          />
          <div className="absolute top-5 right-10">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setPreview(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default ImageUpload;
