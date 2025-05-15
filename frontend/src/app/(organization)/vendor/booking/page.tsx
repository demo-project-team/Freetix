"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBookingVendor } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vendorBooking"],
    queryFn: getBookingVendor,
  });

  if (error) return <p>Алдаа гарлаа: {error.message}</p>;

  return (
    <Table>
      <TableCaption>Захиалгууд.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ordered Time</TableHead>
          <TableHead>PC Count</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
          : data?.map((booking, index) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">INV{index + 1}</TableCell>
                <TableCell>{booking.user.email}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  {booking.orderedTime.length > 0
                    ? `${new Date(
                        booking.orderedTime[0].start
                      ).toLocaleString()} - ${new Date(
                        booking.orderedTime[0].end
                      ).toLocaleString()}`
                    : "Not Scheduled"}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {booking.pcs.length} PC(s)
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>PC ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {booking.pcs.map((pc) => (
                            <TableRow key={pc.id}>
                              <TableCell>{pc.id}</TableCell>
                              <TableCell>{pc.name}</TableCell>
                              <TableCell>{pc.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="text-right">
                  ₮{booking.payment.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
