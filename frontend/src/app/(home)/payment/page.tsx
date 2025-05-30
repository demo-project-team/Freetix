"use client";

import { getPayment, paymentSucces } from "@/utils/request/payment";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useBooking } from "@/provider/BookingProvider";

export default function PayPage() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentId] = useQueryState("payid");
  const {refetchBooking} = useBooking()
  const { data: payment } = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPayment(paymentId),
    enabled: !!paymentId,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !payment) return;
    setIsLoading(true);
    const result = await stripe.confirmCardPayment(payment, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });
    if (result.error) {
      setIsLoading(false)
      toast(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      const payment = await paymentSucces(paymentId);
      if (payment) {
        refetchBooking()
        setIsLoading(false)
        toast("Payment successful!");
        router.push("/");
      }
      setIsLoading(false)
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col bg-white justify-center h-screen"
    >
      <CardElement className="p-3 border rounded w-[500px] text-white" />
      <Button disabled={!stripe || isLoading} className="w-[500px]">
        {isLoading ? "Processing…" : "Pay Now"}
      </Button>
    </form>
  );
}
