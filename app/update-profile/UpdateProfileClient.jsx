"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiUser, FiImage, FiArrowLeft } from "react-icons/fi";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [updating, setUpdating] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    } else if (session?.user) {
      if (!editName) setEditName(session.user.name || "");
      if (!editImage) setEditImage(session.user.image || "");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const { error } = await updateUser({ name: editName, image: editImage });
      if (error) throw error;
      toast.success("Profile updated successfully!");
      router.push("/my-profile");
    } catch (err) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 page-enter">
      <div className="max-w-md w-full">
        <Link href="/my-profile" className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-primary transition-colors mb-6">
          <FiArrowLeft size={16} /> Back to Profile
        </Link>
        <div className="glass-card rounded-3xl p-8">
          <h1 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <FiUser className="text-primary" /> Update Information
          </h1>

          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-base-content/40 block mb-2">
                Full Name
              </label>
              <div className="flex items-center gap-3 bg-base-300/50 rounded-xl px-4 py-2 border border-white/5 focus-within:border-primary/50 transition-colors">
                <FiUser size={15} className="text-base-content/40" />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full py-2 custom-input"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-base-content/40 block mb-2">
                Image URL
              </label>
              <div className="flex items-center gap-3 bg-base-300/50 rounded-xl px-4 py-2 border border-white/5 focus-within:border-primary/50 transition-colors">
                <FiImage size={15} className="text-base-content/40" />
                <input
                  type="url"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full py-2 custom-input"
                  placeholder="Avatar image URL"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="btn btn-primary rounded-full w-full gap-2 mt-4 glow"
            >
              {updating ? <span className="loading loading-spinner loading-xs" /> : null}
              Update Information
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
