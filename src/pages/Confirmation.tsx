import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No booking data found.
      </p>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Booking Confirmed
        </h1>
        <p className="text-gray-600 mb-6">
          Ref ID: {booking._id.toUpperCase()}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default Confirmation;
