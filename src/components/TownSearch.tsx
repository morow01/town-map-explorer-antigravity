
import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface TownSearchProps {
  onSelectTown: (town: any) => void;
  onSearchQueryChange?: (query: string) => void;
}

const TownSearch = ({ onSelectTown, onSearchQueryChange }: TownSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: filteredTowns = [], isLoading } = useQuery({
    queryKey: ['search', searchQuery, 'exchange'],
    queryFn: async () => {
      if (searchQuery.trim().length < 2) return [];
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=exchange`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: searchQuery.trim().length >= 2,
    staleTime: 60000,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
          placeholder="Search for an exchange name or code..."
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value;
            setSearchQuery(val);
            onSearchQueryChange?.(val);
          }}
          onFocus={() => setIsFocused(true)}
        />
      </div>

      {(isFocused && filteredTowns.length > 0) && (
        <div className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
          <ul className="max-h-80 overflow-y-auto py-1">
            {filteredTowns.map((town: any) => (
              <li
                key={town.id}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                onClick={() => {
                  onSelectTown(town);
                  setSearchQuery("");
                  onSearchQueryChange?.("");
                  setIsFocused(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{town.name}</span>
                  <span className="text-xs text-gray-500">{town.code}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TownSearch;
