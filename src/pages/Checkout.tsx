import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface CheckoutState {
  experienceId: string;
  experienceName: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
//   const { id: experienceId } = useParams<{ id: string }>();
  const checkoutData = state as CheckoutState;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(checkoutData.total);
  const [promoValid, setPromoValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormComplete = fullName && email && agreed;
    // console.log(checkoutData)
    console.log(checkoutData);
  // Validate promo code
  const handlePromo = async () => {
    if (!promo.trim()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/promo/validate`, {
        code: promo,
      });
      if (res.data.valid) {
        const promoData = res.data.promo;
        let newTotal = checkoutData.total;
        if (promoData.discountType === "percent") {
          newTotal = Math.round(newTotal * (1 - promoData.value / 100));
        } else {
          newTotal = Math.max(0, newTotal - promoData.value);
        }
        setDiscountedTotal(newTotal);
        setPromoValid(true);
        alert(`Promo applied: ${promoData.value}% off`);
      } else {
        setPromoValid(false);
        alert("Invalid promo code");
      }
    } catch (err) {
      console.error("Promo validation failed", err);
      alert("Error validating promo code");
    }
  };

  // Submit booking
  const handleConfirm = async () => {
    if (!isFormComplete) {
      alert("Please fill all required fields and agree to terms.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, {
        name: fullName,
        email,
        experienceId: checkoutData.experienceId, 
        slot: {
          date: checkoutData.date,
          time: checkoutData.time,
        },
      });
      console.log(res)

      if (res.data.booking) {
        navigate("/confirmation", { state: { booking: res.data.booking } });
      } else {
        alert("Booking failed, please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Error during booking process");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Back + Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900"
        >
          ←
        </button>
        <span className="text-gray-700 font-medium">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 bg-gray-50 p-4 rounded-xl shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Full name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="grow border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button
              onClick={handlePromo}
              className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer"
            >
              Apply
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              I agree to the terms and safety policy
            </span>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm h-fit">
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Experience</span>
              <span className="font-medium">{checkoutData.experienceName}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{checkoutData.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{checkoutData.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{checkoutData.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{checkoutData.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{checkoutData.taxes}</span>
            </div>

            {promoValid && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Promo Applied</span>
                <span>-₹{checkoutData.total - discountedTotal}</span>
              </div>
            )}

            <hr className="my-2" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{discountedTotal}</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!isFormComplete || loading}
              className={`w-full py-2 rounded-md mt-3 font-semibold transition-all ${
                isFormComplete
                  ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                  : "bg-gray-200 text-gray-600 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
