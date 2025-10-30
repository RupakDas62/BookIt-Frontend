import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center sm:items-center px-4 sm:px-8 py-4 bg-white shadow-sm sticky top-0 z-10 gap-4 sm:gap-0">
      {/* Logo Section */}
      <div className="flex items-center justify-center sm:justify-start sm:ml-10">
        <img
          src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ff/bc/ce/ffbcceb4-e459-07d2-6a1c-30f8cdd6d8c1/AppIcon-0-0-1x_U007emarketing-0-8-0-0-sRGB-85-220.png/434x0w.webp"
          alt="Logo"
          className="h-10"
        />
        <h1 className="font-semibold text-lg ml-[-5px]">highway delite</h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end sm:mr-10">
        <input
          type="text"
          placeholder="Search experiences"
          className="bg-gray-100 text-gray-700 placeholder-gray-500 text-base px-4 py-2 outline-none w-full sm:w-80 md:w-96 rounded-md focus:ring-2 focus:ring-yellow-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="ml-3 bg-[#FFD439] hover:bg-[#FFCC00] text-gray-900 font-semibold px-4 py-2 rounded-md transition-all"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
