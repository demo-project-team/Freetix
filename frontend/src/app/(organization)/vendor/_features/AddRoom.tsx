import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoom } from "@/provider/RoomProvider";
import { useVendor } from "@/provider/VendorProvider";
import { roomInput, roomschema } from "@/schemas/schemas";
import { createRoom } from "@/utils/request/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function AddRoom() {
  const { vendor } = useVendor();
  const { refetchRoom } = useRoom();
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<roomInput>({
    resolver: zodResolver(roomschema),
    values: {
      type: "LOBBY",
      name: "",
      pcPricePerHour: 0,
    },
  });
  const addRoom = async (value: roomInput) => {
    setLoading(true);
    const res = await createRoom(value, vendor.id);
    if (res) {
      await refetchRoom();
      setOpen(false);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="w-40"
          variant="outline"
        >
          Add room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-fit">
        <DialogHeader>
          <DialogTitle className="flex justify-between">
            Add room{" "}
            <DialogClose onClick={() => setOpen(false)}>
              <X />
            </DialogClose>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(addRoom)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Room name</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOBBY">LOBBY</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                      <SelectItem value="VVIP">VVIP</SelectItem>
                      <SelectItem value="STREAMER">STREAMER</SelectItem>
                      <SelectItem value="STAGE">STAGE</SelectItem>
                      <SelectItem value="FPS">FPS</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pcPricePerHour"
              render={({ field }) => (
                <FormItem>
                  <Label>Room name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin" />}Add room
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
