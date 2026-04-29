import Link from "next/link";
import { FiGrid, FiInstagram, FiTwitter, FiGithub, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <FiGrid className="text-white text-lg" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                Tiles Gallery
              </span>
            </Link>
            <p className="text-base-content/50 text-sm leading-relaxed">
              Curating the world's most beautiful tiles for architects, designers, and homeowners.
            </p>
            <div className="flex gap-4 mt-5">
              {[FiInstagram, FiTwitter, FiGithub, FiMail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-base-content/50 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-base-content/50">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/all-tiles", label: "All Tiles" },
                { href: "/my-profile", label: "My Profile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-base-content/50">
              Categories
            </h4>
            <ul className="space-y-3">
              {["Marble", "Ceramic", "Porcelain", "Mosaic", "Travertine", "Terracotta"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/all-tiles?search=${cat.toLowerCase()}`}
                      className="text-sm text-base-content/60 hover:text-primary transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-base-content/50">
              Newsletter
            </h4>
            <p className="text-sm text-base-content/50 mb-4">
              Get notified about new arrivals and exclusive collections.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered input-sm rounded-full flex-1 bg-base-300 border-white/10 text-sm custom-input"
              />
              <button className="btn btn-primary btn-sm rounded-full">→</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/30">
          <p>© {new Date().getFullYear()} Tiles Gallery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
