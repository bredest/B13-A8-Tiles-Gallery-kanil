import Link from "next/link";
import TileCard from "@/components/TileCard";
import FeaturedSlider from "@/components/FeaturedSlider";
import MarqueeText from "@/components/MarqueeText";
import tilesData from "@/data/tiles.json";
import { FiArrowRight, FiStar, FiShield, FiLayers } from "react-icons/fi";

export const metadata = {
  title: "Tiles Gallery — Discover Beautiful Tiles",
  description:
    "Explore our curated collection of premium tiles — from Italian marble to Moroccan zellige. Find the perfect tile for your space.",
};

const marqueeItems = [
  "Italian Marble",
  "Moroccan Zellige",
  "Porcelain",
  "Ceramic",
  "Natural Slate",
  "Terracotta",
  "Glass Mosaic",
  "Travertine",
  "Encaustic Cement",
  "Limestone",
];

const features = [
  {
    icon: FiStar,
    title: "Premium Quality",
    desc: "Every tile is hand-selected by our experts for exceptional quality, durability, and aesthetic appeal.",
  },
  {
    icon: FiLayers,
    title: "Curated Collection",
    desc: "12 unique tile varieties from world-renowned artisans — marble, ceramic, glass mosaic, and more.",
  },
  {
    icon: FiShield,
    title: "Expert Guidance",
    desc: "Our specialists help you find the perfect tile for every space, style, and budget.",
  },
];

const stats = [
  { value: "12+", label: "Unique Tiles" },
  { value: "8+", label: "Materials" },
  { value: "6+", label: "Artisan Studios" },
  { value: "100%", label: "Quality Checked" },
];

export default function Home() {
  const featuredTiles = tilesData.filter((t) => t.featured).slice(0, 4);

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1600&q=80')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block tag-pill mb-6 text-sm px-5 py-1.5 animate-fade-in">
            ✦ Premium Tile Collection
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Discover{" "}
            <span className="gradient-text">Beautiful</span>
            <br />
            Tiles for Every Space
          </h1>

          <p
            className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            From Italian marble to Moroccan zellige — explore our hand-curated
            collection of the world&apos;s finest tiles. Find your perfect match.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/tiles"
              id="hero-browse-btn"
              className="btn btn-primary btn-lg rounded-full px-8 gap-2 glow"
            >
              Browse Gallery <FiArrowRight />
            </Link>
            <a
              href="#featured"
              id="hero-featured-btn"
              className="btn btn-outline btn-lg rounded-full px-8 border-white/20 text-base-content hover:bg-white/10 hover:border-white/30"
            >
              Featured Tiles
            </a>
          </div>

          {/* Stats strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-2xl py-4 px-3 text-center"
              >
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-base-content/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeText items={marqueeItems} />

      {/* ── Featured Tiles ── */}
      <section id="featured" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              Handpicked For You
            </p>
            <h2 className="font-display text-4xl font-bold section-title">
              Featured Tiles
            </h2>
          </div>
          <Link
            href="/tiles"
            id="featured-view-all"
            className="btn btn-outline btn-sm rounded-full gap-2 self-start sm:self-auto"
          >
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        <FeaturedSlider tiles={featuredTiles} />
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-4 bg-base-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              Why Choose Us
            </p>
            <h2 className="font-display text-4xl font-bold section-title inline-block">
              The Tiles Gallery Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="glass-card rounded-2xl p-8 text-center group hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={26} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{f.title}</h3>
                  <p className="text-base-content/60 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-16 relative overflow-hidden">
          {/* background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Ready to transform your space?
          </p>
          <h2 className="font-display text-4xl font-bold mb-5">
            Explore the Full Collection
          </h2>
          <p className="text-base-content/60 mb-8 max-w-xl mx-auto">
            Browse all 12 premium tiles, filter by material and availability, and find your perfect match today.
          </p>
          <Link
            href="/tiles"
            id="cta-browse-all"
            className="btn btn-primary btn-lg rounded-full px-10 gap-2 glow"
          >
            Browse All Tiles <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
