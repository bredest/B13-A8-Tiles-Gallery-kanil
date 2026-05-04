"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import TileCard from "@/components/TileCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import tilesData from "@/data/tiles.json";
import { FiChevronRight, FiFilter, FiX, FiSearch } from "react-icons/fi";

const CATEGORIES = {
  Room: ["Bathroom", "Kitchen", "Living Room", "Outside"],
  Type: ["Ceramic", "Porcelain", "Natural Stone", "Glass"],
  Style: ["Marble Effect", "Stone Effect", "Wood Effect", "Patterned", "Metro"],
  Finish: ["Matt", "Gloss", "Polished"],
  Colour: ["White", "Grey", "Black", "Beige", "Blue", "Green"]
};

function TilesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeFilters, setActiveFilters] = useState({
    Room: "All",
    Type: "All",
    Style: "All",
    Finish: "All",
    Colour: "All"
  });
  const [sortBy, setSortBy] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = tilesData.filter((tile) => {
      const q = search.toLowerCase();
      const matchSearch = !q || 
        tile.title.toLowerCase().includes(q) || 
        tile.material.toLowerCase().includes(q) ||
        tile.tags.some(t => t.toLowerCase().includes(q));

      const matchRoom = activeFilters.Room === "All" || tile.tags.includes(activeFilters.Room);
      const matchType = activeFilters.Type === "All" || tile.material.includes(activeFilters.Type);
      const matchStyle = activeFilters.Style === "All" || tile.tags.includes(activeFilters.Style);
      const matchFinish = activeFilters.Finish === "All" || tile.tags.includes(activeFilters.Finish);
      const matchColour = activeFilters.Colour === "All" || tile.tags.includes(activeFilters.Colour);

      return matchSearch && matchRoom && matchType && matchStyle && matchFinish && matchColour;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [search, activeFilters, sortBy]);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? "All" : value
    }));
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#5c564b]/60 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <FiChevronRight size={10} />
          <span className="text-primary font-bold">All Tiles</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <h2 className="text-xl font-serif font-bold text-[#5c564b] mb-8 border-b border-[#e2dfd8] pb-4">Filters</h2>
            
            <div className="space-y-8">
              {Object.entries(CATEGORIES).map(([category, options]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#5c564b] mb-4">{category}</h3>
                  <ul className="space-y-2">
                    {options.map(option => (
                      <li key={option}>
                        <button
                          onClick={() => toggleFilter(category, option)}
                          className={`text-sm transition-colors flex items-center gap-2 group
                            ${activeFilters[category] === option ? "text-primary font-bold" : "text-[#5c564b]/70 hover:text-primary"}`}
                        >
                          <div className={`w-3 h-3 rounded-sm border transition-colors 
                            ${activeFilters[category] === option ? "bg-primary border-primary" : "border-[#e2dfd8] group-hover:border-primary/50"}`} 
                          />
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Clear All */}
            <button 
              onClick={() => setActiveFilters({ Room: "All", Type: "All", Style: "All", Finish: "All", Colour: "All" })}
              className="mt-10 text-[10px] uppercase font-bold tracking-widest text-error hover:underline"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header & Sort */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#e2dfd8]">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5c564b] mb-2">All Tiles</h1>
                <p className="text-sm text-[#5c564b]/60">Showing {filtered.length} of {tilesData.length} results</p>
              </div>

              <div className="flex items-center gap-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border border-[#e2dfd8] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded focus:outline-none focus:border-primary"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Sort by Price: Low to High</option>
                  <option value="price-high">Sort by Price: High to Low</option>
                  <option value="name">Sort by Name</option>
                </select>
                
                <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#e2dfd8] rounded text-xs font-bold uppercase tracking-widest"
                >
                  <FiFilter /> Filter
                </button>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filtered.map((tile) => (
                  <TileCard key={tile.id} tile={tile} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white border border-[#e2dfd8] rounded-xl">
                <FiSearch size={48} className="mx-auto text-[#e2dfd8] mb-4" />
                <h3 className="text-xl font-serif font-bold text-[#5c564b] mb-2">No tiles matched your selection</h3>
                <p className="text-sm text-[#5c564b]/60 mb-8">Try adjusting your filters or search term.</p>
                <button 
                  onClick={() => {
                    setSearch("");
                    setActiveFilters({ Room: "All", Type: "All", Style: "All", Finish: "All", Colour: "All" });
                  }}
                  className="btn btn-primary btn-md rounded-none px-10 uppercase tracking-widest text-xs"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-80 bg-[#f4f1ea] h-full overflow-y-auto p-8 animate-slide-left">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif font-bold text-[#5c564b]">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="text-[#5c564b]"><FiX size={24} /></button>
            </div>
            
            <div className="space-y-8">
              {Object.entries(CATEGORIES).map(([category, options]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#5c564b] mb-4">{category}</h3>
                  <ul className="space-y-3">
                    {options.map(option => (
                      <li key={option}>
                        <button
                          onClick={() => toggleFilter(category, option)}
                          className={`text-sm transition-colors flex items-center gap-3
                            ${activeFilters[category] === option ? "text-primary font-bold" : "text-[#5c564b]/70"}`}
                        >
                          <div className={`w-4 h-4 rounded-sm border 
                            ${activeFilters[category] === option ? "bg-primary border-primary" : "border-[#e2dfd8]"}`} 
                          />
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-12 py-4 bg-[#5c564b] text-white font-bold uppercase tracking-widest text-xs"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TilesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 px-4 bg-[#fcfbf9]">
        <div className="max-w-7xl mx-auto flex gap-12">
          <div className="hidden lg:block w-64 skeleton h-[80vh]"></div>
          <div className="flex-1">
            <LoadingSkeleton count={6} />
          </div>
        </div>
      </div>
    }>
      <TilesContent />
    </Suspense>
  );
}
