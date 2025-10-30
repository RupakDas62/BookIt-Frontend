import { Link } from "react-router-dom";

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

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col border border-gray-100 min-h-96">
      <img
        src={experience.image}
        alt={experience.name}
        className="h-52 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 flex flex-col grow bg-[#f0f0f0]">
        {/* Name + Location Tag */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-semibold text-gray-900">
            {experience.name}
          </h3>
          <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-md text-gray-700 font-medium">
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-snug mt-1 grow">
          {experience.description}
        </p>

        {/* Price + Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            From{" "}
            <span className="font-bold text-lg text-gray-900">
              ₹{experience.price}
            </span>
          </span>
          <Link to={`/experience/${experience._id}`} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold px-4 py-2 rounded-md transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
