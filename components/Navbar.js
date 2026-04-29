"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-tiles", label: "All Tiles" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow">
              <FiGrid className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              Tiles Gallery
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-base-content/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isPending ? (
              <div className="skeleton w-20 h-8 rounded-full"></div>
            ) : session?.user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className="avatar">
                    <div className="w-9 h-9 rounded-full ring-2 ring-primary/50 group-hover:ring-primary transition-all">
                      <img
                        src={
                          session.user.image ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${session.user.name}`
                        }
                        alt={session.user.name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl glass-card rounded-2xl w-52 mt-2 border border-white/10"
                >
                  <li>
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <FiUser /> My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-sm text-error hover:bg-error/10"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-base-content/70 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary btn-sm rounded-full px-5 text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-card border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-base-content/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session?.user ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-2 flex items-center gap-2 hover:text-primary"
              >
                <FiUser /> My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium py-2 flex items-center gap-2 text-error"
              >
                <FiLogOut /> Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-3 mt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="btn btn-outline btn-sm rounded-full flex-1"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary btn-sm rounded-full flex-1"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
