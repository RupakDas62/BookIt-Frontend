import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface Slot {
    date: string;
    time: string;
    capacity: number;
    booked: number;
}

interface Experience {
    _id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    image: string;
    slots: Slot[];
}

const ExperienceDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [experience, setExperience] = useState<Experience | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experiences/${id}`);
                setExperience(res.data);
            } catch (err) {
                console.error("Error fetching experience:", err);
            }
        };
        fetchData();
    }, [id]);

    if (!experience) {
        return <p className="text-center mt-10 text-gray-500">Loading details...</p>;
    }

    const tax = Math.round(experience.price * 0.06);
    const total = experience.price * quantity + tax;

    // Disable confirm until both date and time selected
    const canConfirm = selectedDate && selectedTime;

    // Extract unique dates from slots
    const availableDates = Array.from(new Set(experience.slots.map((slot) => slot.date)));

    // Filter times based on selected date
    const availableTimes = experience.slots.filter((slot) => slot.date === selectedDate);

    // console.log(experience._id)

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
                <span className="text-gray-700 font-medium">Details</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Image + Info */}
                <div className="lg:col-span-2">
                    <img
                        src={experience.image}
                        alt={experience.name}
                        className="w-full h-80 object-cover rounded-xl mb-4"
                    />

                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        {experience.name}
                    </h1>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {experience.description}
                    </p>

                    {/* Date selection */}
                    <h2 className="font-medium mb-2 text-gray-800">Choose date</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {availableDates.map((date) => {
                            const formatted = new Date(date).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                            });
                            return (
                                <button
                                    key={date}
                                    onClick={() => {
                                        setSelectedDate(date);
                                        setSelectedTime(""); // reset time when changing date
                                    }}
                                    className={`px-3 py-1 rounded-md border text-sm ${selectedDate === date
                                            ? "bg-yellow-400 text-gray-900 font-semibold"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {formatted}
                                </button>
                            );
                        })}
                    </div>

                    {/* Time selection */}
                    <h2 className="font-medium mb-2 text-gray-800">Choose time</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {availableTimes.length > 0 ? (
                            availableTimes.map((slot) => {
                                const remaining = slot.capacity - slot.booked;
                                return (
                                    <button
                                        key={slot.time}
                                        disabled={remaining <= 0}
                                        onClick={() => setSelectedTime(slot.time)}
                                        className={`px-3 py-1.5 rounded-md border text-sm relative ${selectedTime === slot.time
                                                ? "bg-yellow-400 text-gray-900 font-semibold"
                                                : remaining <= 0
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        {slot.time}
                                        {remaining > 0 && (
                                            <span className="ml-2 text-xs text-red-500">{remaining} left</span>
                                        )}
                                        {remaining <= 0 && (
                                            <span className="ml-2 text-xs text-gray-400">Sold out</span>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-500">Select a date to view times</p>
                        )}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        All times are in IST (GMT +5:30)
                    </p>

                    {/* About */}
                    <h2 className="font-medium mt-6 mb-2 text-gray-800">About</h2>
                    <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                        Scenic routes, trained guides, and safety briefing. Minimum age 10.
                    </p>
                </div>

                {/* Right: Booking summary */}
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm h-fit">
                    <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                            <span>Starts at</span>
                            <span className="font-medium">₹{experience.price}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Quantity</span>
                            <div className="flex items-center gap-3">
                                <button
                                    className="text-lg font-bold"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    –
                                </button>
                                <span>{quantity}</span>
                                <button
                                    className="text-lg font-bold"
                                    onClick={() => setQuantity((q) => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{experience.price * quantity}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>₹{tax}</span>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <Link
                            to="/checkout"
                            state={{
                                experienceName: experience.name,
                                experienceId: experience._id,
                                date: selectedDate,
                                time: selectedTime,
                                quantity,
                                subtotal: experience.price * quantity,
                                taxes: tax,
                                total,
                            }}
                            className={`block text-center w-full py-2 rounded-md mt-3 font-semibold transition-all ${canConfirm
                                    ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900 cursor-pointer"
                                    : "bg-gray-200 text-gray-600 cursor-not-allowed pointer-events-none"
                                }`}
                        >
                            {canConfirm ? "Pay & Confirm" : "Select Date & Time"}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ExperienceDetails;
