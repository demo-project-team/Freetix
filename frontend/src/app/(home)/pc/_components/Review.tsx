/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Vendor } from "@/Types/types";
import { Star, User, } from "lucide-react";
import React, { useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export const Review = ({ vendor }: { vendor: Vendor }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#FFD700" : "none"}
            color={i < rating ? "#FFD700" : "#D1D5DB"}
          />
        ))}
      </div>
    );
  };
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest">("highest");

  const SortReviews = useMemo(() => {
    return [...vendor.reviews].sort((a, b) =>
      sortOrder === "highest" ? b.rating - a.rating : a.rating - b.rating
    );
  }, [vendor.reviews, sortOrder]);

  const handleRatingFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOrder(value === "Highest rated" ? "highest" : "lowest");
  };


  return (
    <Dialog>
      <DialogTrigger className="bg-white px-2 py-3 rounded-xl text-black">
        Open
      </DialogTrigger>

      <DialogContent>
        <div className="grid gap-6">
          <DialogHeader>
            <div className="flex items-center justify-between mb-6">
              <DialogTitle>{vendor.reviews.length} reviews</DialogTitle>

              <select
                className="border rounded-full px-4 py-2"
                onChange={handleRatingFilter}
                value={
                  sortOrder === "highest" ? "Highest rated" : "Lowest rated"
                }
              >
                <option>Lowest rated</option>
                <option>Highest rated</option>
              </select>
            </div>
          </DialogHeader>
          {SortReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
            >
              <div className="flex items-center gap-4 mb-3">
                {review.user.profileImage ? (
                  <img
                    src={review.user.profileImage}
                    className="w-12 h-12 bg-gray-200 rounded-full"
                  />
                ) : (
                  <User stroke="black" />
                )}

                <div>
                  <h3 className="font-medium text-black">{review.user.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-black">{renderStars(review.rating)}</p>
                <p className="text-black text-sm">
                  •
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <p className="line-clamp-3 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
        <DialogClose asChild>
          <button className="absolute top-0 right-0 p-4 " aria-label="close">
            x
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
