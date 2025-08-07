import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
  const { token } = useContext(AuthContext);

  const payNow = async () => {
    // Example amount
    const amount = 500; // ₹500

    // Create order on backend
    const res = await fetch("http://localhost:5000/api/payment/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: "INR",
      name: "Sandar Store",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        // Verify payment
        const verifyRes = await fetch(
          "http://localhost:5000/api/payment/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: order.id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        alert(verifyData.message);

        if (verifyData.success) {
          // Save order in DB
          await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: "demoUser", // TODO: Replace with decoded ID
              items: [{ productId: "dummy", quantity: 1 }],
              total: amount,
              paymentId: response.razorpay_payment_id,
            }),
          });
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl mb-4 font-bold">Checkout</h2>
      <button
        onClick={payNow}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
