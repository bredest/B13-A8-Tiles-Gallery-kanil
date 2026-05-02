"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { FiSearch, FiUser, FiShoppingBag, FiMapPin } from "react-icons/fi";

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-tiles?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Bathroom", href: "/all-tiles?search=bathroom" },
    { name: "Kitchen", href: "/all-tiles?search=kitchen" },
    { name: "Wall Tiles", href: "/all-tiles?search=wall" },
    { name: "Floor Tiles", href: "/all-tiles?search=floor" },
    { name: "Tiles By Colour", href: "/all-tiles" },
    { name: "All Tiles", href: "/all-tiles" },
    { name: "Tile Accessories", href: "/all-tiles" },
    { name: "Pallet Deals", href: "/all-tiles" },
    { name: "On Sale", href: "/all-tiles" },
  ];

  return (
    <div className="w-full bg-[#f4f1ea] border-b border-[#e2dfd8]">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        {/* Left: Search */}
        <form onSubmit={handleSearch} className="flex-1 hidden md:flex items-center gap-2 group">
          <FiSearch className="text-[#5c564b] group-hover:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search our tiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-[#5c564b] placeholder-[#5c564b]/50 text-sm font-medium w-full"
          />
        </form>

        {/* Center: Branding */}
        <Link href="/" className="flex flex-col items-center text-center shrink-0 mx-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#5c564b] font-medium mb-1">EST. 1966</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#5c564b] leading-none tracking-tight">
            TILE & STONE
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5c564b] leading-tight mb-1">
            GALLERY
          </h2>
          <span className="text-[9px] tracking-[0.1em] uppercase text-[#5c564b] font-medium border-t border-[#5c564b]/20 pt-1">
            PERFECTLY DESIGNED FOR BEAUTIFUL LIVING
          </span>
        </Link>

        {/* Right: Icons */}
        <div className="flex-1 flex items-center justify-end gap-6 text-[#5c564b]">
          <div className="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors">
            <span className="text-xs font-bold tracking-tight">Showrooms</span>
            <FiMapPin size={20} />
          </div>

          {isPending ? (
            <div className="skeleton w-8 h-8 rounded-full bg-[#e2dfd8]"></div>
          ) : session?.user ? (
            <div className="flex items-center gap-4">
              <Link href="/my-profile" title="Profile">
                <img
                  src={session.user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session.user.name}`}
                  alt={session.user.name}
                  className="w-7 h-7 rounded-full border border-[#e2dfd8] object-cover"
                />
              </Link>
              <button onClick={() => signOut()} className="text-[10px] uppercase font-bold tracking-wider hover:text-error">
                SignOut
              </button>
            </div>
          ) : (
            <Link href="/login" className="hover:text-primary transition-colors" title="Login">
              <FiUser size={22} />
            </Link>
          )}

          <div className="relative cursor-pointer hover:text-primary transition-colors group">
            <FiShoppingBag size={22} />
            <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#f4f1ea]">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-t border-[#e2dfd8]">
        <ul className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar flex items-center justify-between gap-4 md:gap-8 py-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-1.5 transition-colors whitespace-nowrap
                  ${pathname === link.href ? "text-primary border-b-2 border-primary" : "text-[#5c564b] hover:text-primary"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
