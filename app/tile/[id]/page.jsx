import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import TileCard from "@/components/TileCard";
import tilesData from "@/data/tiles.json";
import { FiArrowLeft, FiPackage, FiMaximize2, FiDroplet, FiUser, FiTag } from "react-icons/fi";

export async function generateStaticParams() {
  return tilesData.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tile = tilesData.find((t) => t.id === id);
  if (!tile) return {};
  return { title: tile.title, description: tile.style };
}

export default async function TileDetailPage({ params }) {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Auth session error:", error);
  }
  const { id } = await params;
  const tile = tilesData.find((t) => t.id === id);
  if (!tile) notFound();

  const { title, image, price, material, inStock, tags, style, creator, size, finish } = tile;

  const related = tilesData
    .filter((t) => t.id !== tile.id && (t.material === material || t.tags.some((tag) => tags.includes(tag))))
    .slice(0, 3);

  const details = [
    { icon: FiPackage, label: "Material", value: material },
    { icon: FiMaximize2, label: "Size", value: size },
    { icon: FiDroplet, label: "Finish", value: finish },
    { icon: FiUser, label: "Creator", value: creator },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter">
      <div className="max-w-7xl mx-auto">
        <Link href="/all-tiles" id="tile-back-btn" className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-primary transition-colors mb-8">
          <FiArrowLeft size={16} /> Back to Gallery
        </Link>

        <div className="glass-card rounded-3xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative overflow-hidden h-72 lg:h-auto min-h-[400px] group">
              <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={`badge badge-sm font-semibold ${inStock ? "badge-success" : "badge-error"}`}>
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
                <span className="badge badge-sm bg-black/60 text-white border-0 backdrop-blur-sm">{material}</span>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">{title}</h1>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold gradient-text">${price.toFixed(2)}</span>
                <span className="text-base-content/40 text-sm">/m²</span>
              </div>
              <p className="text-base-content/60 leading-relaxed mb-8 text-sm">{style}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-base-300/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Icon size={14} />
                      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
                    </div>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-8">
                <FiTag size={14} className="text-base-content/30" />
                {tags.map((tag) => (
                  <Link key={tag} href={`/all-tiles?search=${tag}`} className="tag-pill">#{tag}</Link>
                ))}
              </div>

              <div className="flex gap-3">
                <button id="tile-enquire-btn" className="btn btn-primary rounded-full flex-1 glow" disabled={!inStock}>
                  {inStock ? "Enquire Now" : "Out of Stock"}
                </button>
                <Link href="/all-tiles" className="btn btn-outline rounded-full px-6 border-white/20 hover:border-primary/40">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold mb-8 section-title">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (<TileCard key={t.id} tile={t} />))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
