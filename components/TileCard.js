import Link from "next/link";
import { FiPackage, FiArrowRight } from "react-icons/fi";

export default function TileCard({ tile }) {
  const { id, title, image, price, material, inStock, tags } = tile;

  return (
    <div className="tile-card glass-card rounded-2xl overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Stock badge */}
        <div
          className={`absolute top-3 right-3 badge badge-sm font-semibold ${
            inStock ? "badge-success" : "badge-error"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>

        {/* Material badge */}
        <div className="absolute top-3 left-3 badge badge-sm bg-black/60 text-white border-0 backdrop-blur-sm">
          <FiPackage size={10} className="mr-1" /> {material}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-pill">
              #{tag}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-base-content/40 block">From</span>
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            <span className="text-xs text-base-content/40 ml-1">/m²</span>
          </div>
          <Link
            href={`/tile/${id}`}
            className="btn btn-primary btn-sm rounded-full gap-1 group/btn"
          >
            Details
            <FiArrowRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
