import { useEffect, useState } from "react";
import axios from "axios";
import ExperienceCard from "../components/ExperienceCard";
import Header from "../components/Header"; // ← added

interface Experience {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  image: string;
  slots: any[];
}

const Home = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/experiences`);
        setExperiences(res.data);
      } catch (err) {
        console.error("Error fetching experiences", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // Filter experiences by search term (case-insensitive)
  const filteredExperiences = experiences.filter((exp) =>
    exp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-[#f9f9f9] min-h-screen">
      {/* Header with search input */}
      <Header onSearch={setSearchTerm} />

      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">
            Loading experiences...
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredExperiences.length > 0 ? (
              filteredExperiences.map((exp) => (
                <ExperienceCard key={exp._id} experience={exp} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full mt-10">
                No experiences found.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
