import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hoocks/useAxiosSecure";
import LoadingId from "../../Loading/Loading";
import useAuth from "../../../hoocks/useAuth";
import Swal from "sweetalert2";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const [paymentSuccess, setPaymentSuccess] = useState(false);  // ✅ Added this state
  const { parchelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { isPending, data: parcelInfo = {}, refetch } = useQuery({
    queryKey: ["parcels", parchelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parchelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingId />;
  }

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  const isAlreadyPaid = parcelInfo.payment_status === 'paid' || paymentSuccess;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    console.log(paymentMethod)
    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
    }

    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parchelId,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(`Payment failed: ${result.error.message}`);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          parchelId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.paymentId) {
          setPaymentSuccess(true);     // ✅ Mark as Paid
          refetch();                   // ✅ Refetch Parcel Info
          Swal.fire(
            "✅ Payment Successful",
            "Thank you! Your parcel has been paid.",
            "success"
          );
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg text-white mt-10"
      >
        <div className="mb-4 text-sm">
          Payment Status:{" "}
          <span className={`font-bold ${isAlreadyPaid ? "text-green-400" : "text-red-400"}`}>
            {isAlreadyPaid ? "Paid" : "Unpaid"}
          </span>
        </div>

        <CardElement className="space-y-4 text-white border p-3 rounded-lg" />

        <button
          type="submit"
          className="w-full bg-blue-500 mt-5 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
          disabled={!stripe || isAlreadyPaid}
        >
          {isAlreadyPaid ? "Paid" : `Pay ৳${amount}`}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default PaymentForm;
