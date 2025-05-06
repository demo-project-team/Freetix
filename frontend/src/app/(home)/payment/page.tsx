"use client";

import { getPayment, paymentSucces } from "@/utils/request/payment";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PayPage() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentId] = useQueryState("payid");
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
    setIsLoading(false);
    if (result.error) {
      toast(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      const payment = await paymentSucces(paymentId);
      if (payment) {
        toast("Payment successful!");
        router.push("/");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col justify-center h-screen"
    >
      <CardElement className="p-3 border rounded w-[500px]" />
      <Button disabled={!stripe || isLoading} className="w-[500px]">
        {isLoading ? "Processing…" : "Pay Now"}
      </Button>
    </form>
  );
}
