"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TileCard from "@/components/TileCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import tilesData from "@/data/tiles.json";
import { FiSearch, FiX } from "react-icons/fi";

const MATERIALS = [
  "All",
  "Natural Marble",
  "Natural Slate",
  "Ceramic",
  "Terracotta",
  "Porcelain",
  "Limestone",
  "Travertine",
  "Handmade Ceramic",
  "Cement",
  "Glass",
];

const STOCK_FILTERS = ["All", "In Stock", "Out of Stock"];

import { Suspense } from "react";

function TilesContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [material, setMaterial] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [loading] = useState(false);

  // Sync when URL param changes (e.g. navigating from a tag link)
  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return tilesData.filter((tile) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        tile.title.toLowerCase().includes(q) ||
        tile.material.toLowerCase().includes(q) ||
        tile.tags.some((t) => t.toLowerCase().includes(q));

      const matchMaterial = material === "All" || tile.material === material;

      const matchStock =
        stockFilter === "All" ||
        (stockFilter === "In Stock" && tile.inStock) ||
        (stockFilter === "Out of Stock" && !tile.inStock);

      return matchSearch && matchMaterial && matchStock;
    });
  }, [search, material, stockFilter]);

  const clearSearch = () => setSearch("");

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            Full Collection
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold section-title">
            All Tiles
          </h1>
          <p className="text-base-content/50 mt-4 max-w-xl">
            Browse our complete collection of{" "}
            <span className="text-primary font-semibold">{tilesData.length} premium tiles</span>{" "}
            — use search and filters to find your perfect match.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="glass-card rounded-2xl p-5 mb-8 flex flex-col gap-5">
          {/* Search bar */}
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
            />
            <input
              id="tile-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tiles by name, material, or tag…"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-base-300 border border-white/10 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all custom-input"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Filter pills row */}
          <div className="flex flex-wrap gap-3">
            {/* Stock */}
            <div className="flex gap-2 flex-wrap">
              {STOCK_FILTERS.map((f) => (
                <button
                  key={f}
                  id={`stock-filter-${f.replace(/\s/g, "-").toLowerCase()}`}
                  onClick={() => setStockFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    stockFilter === f
                      ? "bg-primary border-primary text-white"
                      : "border-white/10 text-base-content/60 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="w-px bg-white/10 self-stretch hidden sm:block" />

            {/* Material */}
            <div className="flex gap-2 flex-wrap">
              {MATERIALS.map((m) => (
                <button
                  key={m}
                  id={`material-filter-${m.replace(/\s/g, "-").toLowerCase()}`}
                  onClick={() => setMaterial(m)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    material === m
                      ? "bg-accent/20 border-accent text-accent"
                      : "border-white/10 text-base-content/60 hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-base-content/40 mb-6">
          {filtered.length === tilesData.length
            ? `Showing all ${tilesData.length} tiles`
            : `${filtered.length} tile${filtered.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Grid */}
        {loading ? (
          <LoadingSkeleton count={8} />
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-card rounded-3xl">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl font-bold mb-2">No tiles found</h3>
            <p className="text-base-content/50 mb-6">
              Try adjusting your search or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setMaterial("All");
                setStockFilter("All");
              }}
              className="btn btn-primary rounded-full px-8"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TilesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton count={8} />
        </div>
      </div>
    }>
      <TilesContent />
    </Suspense>
  );
}
