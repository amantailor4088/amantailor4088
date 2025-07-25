"use client";

import React, { useState } from "react";
import Script from "next/script";
import { createOrderId } from "@/utils/createOrderId";
import { useAddPurchasedCourse } from "@/hooks/courses/useAddPurchasedCourse";
import { useAuth } from "@/context/auth/AuthContext";
import AuthModal from "../login/Auth";

type PurchaseButtonProps = {
  price: number;
  discount:number;
  courseId: string;
};

export default function PurchaseButton({
  price,
  discount,
  courseId,
}: PurchaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addPurchasedCourse } = useAddPurchasedCourse();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const netPrice = discount > 0  && discount < price ? price - discount : price;

  const handlePayment = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setIsLoading(true);

    try {
      const orderId: string = await createOrderId(courseId);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: netPrice * 100,
        currency: "INR",
        name: "Aman Tailors",
        description: `Purchase of Course: ${courseId}`,
        order_id: orderId,

        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("/api/course/verifyOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse
                .json()
                .catch(() => ({ message: "Verification failed on server." }));
              throw new Error(
                errorData.message ||
                  `Server verification error: ${verifyResponse.statusText}`
              );
            }

            const verificationData = await verifyResponse.json();
            alert("Payment successful! Thank you for your purchase.");
            await addPurchasedCourse(courseId);
          } catch (error: any) {
            alert("Payment verification failed. Please contact support.");
            console.error("Payment verification error:", error);
          }
        },

        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.on("payment.failed", function (response: any) {
        alert(
          `Payment failed: ${response.error.description || "Unknown reason"}`
        );
        console.error("Payment failed response:", response.error);
      });

      razorpay.open();
    } catch (error: any) {
      alert(
        `Payment initiation failed: ${error.message || "Please try again."}`
      );
      console.error("Payment initiation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out text-lg"
        onClick={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : `Buy Now – ₹ ${netPrice}`}
      </button>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {showLoginModal && (
        <AuthModal isOpen={showLoginModal} setShowLogin={setShowLoginModal} />
      )}
    </>
  );
}
