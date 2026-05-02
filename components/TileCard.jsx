import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function TileCard({ tile }) {
  const { id, title, image, price } = tile;

  return (
    <div className="flex flex-col group bg-white border border-[#e2dfd8] transition-all hover:shadow-xl hover:shadow-[#5c564b]/5 overflow-hidden">
      {/* Image Container */}
      <Link href={`/tile/${id}`} className="relative block aspect-square overflow-hidden bg-[#f4f1ea]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-[#5c564b]/0 group-hover:bg-[#5c564b]/5 transition-colors duration-300" />
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <Link 
          href={`/tile/${id}`}
          className="text-lg font-serif font-bold text-[#5c564b] mb-2 hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]"
        >
          {title}
        </Link>

        <div className="mt-auto pt-4 border-t border-[#f4f1ea] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#5c564b]/50 font-bold mb-0.5">Price from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#5c564b]">£{price.toFixed(2)}</span>
              <span className="text-[10px] text-[#5c564b]/60 uppercase tracking-wider">per m²</span>
            </div>
          </div>

          <Link
            href={`/tile/${id}`}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5c564b] hover:text-primary transition-colors group/link"
          >
            View Product
            <FiArrowRight
              size={12}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
