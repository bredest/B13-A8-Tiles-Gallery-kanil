"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import tilesData from "@/data/tiles.json";
import {
  FiUser, FiMail, FiLogOut, FiGrid, FiCalendar, FiLayers,
} from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data: session, isPending } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    toast.success("Signed out successfully.");
    router.push("/login");
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-base-content/50 text-sm">Loading your profile…</p>
        </div>
      </div>
    );
  }

  const user = session.user;
  const avatarSrc =
    user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Recently joined";

  const stats = [
    { icon: FiLayers, label: "Tiles Available", value: tilesData.length },
    { icon: FiGrid, label: "Featured Tiles", value: tilesData.filter((t) => t.featured).length },
    { icon: FiCalendar, label: "Member Since", value: joinDate },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 page-enter">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">My Account</p>
          <h1 className="font-display text-4xl font-bold section-title">Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Avatar card ── */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-8 text-center flex flex-col items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full ring-4 ring-primary/40 overflow-hidden">
                  <img
                    src={avatarSrc}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center border-2 border-base-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-success-content" />
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-xl">{user.name}</h2>
                <p className="text-base-content/50 text-sm mt-1">{user.email}</p>
              </div>

              <div className="w-full h-px bg-white/10" />

              <button
                id="signout-btn"
                onClick={handleSignOut}
                disabled={signingOut}
                className="btn btn-outline btn-error btn-sm rounded-full w-full gap-2"
              >
                {signingOut ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <FiLogOut size={14} />
                )}
                Sign Out
              </button>

              <Link href="/all-tiles" className="btn btn-primary btn-sm rounded-full w-full gap-2">
                <FiGrid size={14} /> Browse Tiles
              </Link>
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Account details */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <FiUser className="text-primary" /> Account Details
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-base-content/40 block mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 bg-base-300/50 rounded-xl px-4 py-3">
                    <FiUser size={15} className="text-base-content/40" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-base-content/40 block mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 bg-base-300/50 rounded-xl px-4 py-3">
                    <FiMail size={15} className="text-base-content/40" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-base-content/40 block mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center gap-3 bg-base-300/50 rounded-xl px-4 py-3">
                    <FiCalendar size={15} className="text-base-content/40" />
                    <span className="text-sm">{joinDate}</span>
                  </div>
                </div>

                <Link
                  href="/update-profile"
                  className="btn btn-primary btn-sm rounded-full w-full sm:w-auto self-start gap-2 mt-4 glow"
                >
                  Update Information
                </Link>
              </div>
            </div>            </div>
            </div>

            {/* Gallery stats */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <FiGrid className="text-primary" /> Gallery Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-base-300/50 rounded-2xl p-5 text-center">
                    <Icon size={22} className="text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold gradient-text">{value}</div>
                    <div className="text-xs text-base-content/40 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="font-semibold text-lg mb-5">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/all-tiles" className="btn btn-outline btn-sm rounded-full border-white/15 hover:border-primary/40 hover:text-primary gap-2">
                  <FiGrid size={14} /> All Tiles
                </Link>
                <Link href="/all-tiles?search=marble" className="tag-pill cursor-pointer px-4 py-2 text-sm">
                  #marble
                </Link>
                <Link href="/all-tiles?search=ceramic" className="tag-pill cursor-pointer px-4 py-2 text-sm">
                  #ceramic
                </Link>
                <Link href="/all-tiles?search=luxury" className="tag-pill cursor-pointer px-4 py-2 text-sm">
                  #luxury
                </Link>
                <Link href="/all-tiles?search=mosaic" className="tag-pill cursor-pointer px-4 py-2 text-sm">
                  #mosaic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
