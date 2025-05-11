/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Vendor } from "@/Types/types";
import { User } from "lucide-react";

export const Review = ({ vendor }: { vendor: Vendor }) => {
  //   const renderStars = (ratingAvg) => {
  //     return (
  //       <div className="flex">
  //         {[...Array(5)].map((_, i) => (
  //           <Star
  //             key={i}
  //             size={16}
  //             fill={i < ratingAvg ? "#FFD700" : "none"}
  //             color={i < ratingAvg ? "#FFD700" : "#D1D5DB"}
  //           />
  //         ))}
  //       </div>
  //     );
  //   };
  return (
    <Dialog>
      <DialogTrigger className="bg-white px-2 py-3 rounded-xl">
        Open
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="grid gap-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">11 reviews</h2>
              <select className="border rounded-full px-4 py-2">
                <option>Most recent</option>
                <option>Highest rated</option>
              </select>
            </div>
            {vendor.reviews.map((review) => (
              <Dialog key={review.id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border">
                    <div className="flex items-center gap-4 mb-3">
                      {review.user.profileImage ? (
                        <img
                          src={review.user.profileImage}
                          className="w-12 h-12 bg-gray-200 rounded-full"
                        />
                      ) : (
                        <User stroke="black"/>
                      )}

                      <div>
                        <h3 className="font-medium text-black">
                          {review.user.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-black">{review.rating}</p>
                      <p className="text-black text-sm">
                        • {review.createdAt.toString().split("T")[0]}
                      </p>
                    </div>
                    <p className="line-clamp-3 text-gray-700">
                      {review.comment}
                    </p>
                  </div>
                </DialogTrigger>
              </Dialog>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
