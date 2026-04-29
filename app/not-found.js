"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 page-enter">
      <div className="relative mb-8">
        <div className="text-[10rem] font-black leading-none gradient-text opacity-20 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl">🧱</div>
        </div>
      </div>
      <h1 className="text-4xl font-bold font-display mb-4">Page Not Found</h1>
      <p className="text-base-content/60 text-lg max-w-md mb-8">
        Looks like this tile has gone missing from our gallery. Let's get you back on solid ground.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="btn btn-primary rounded-full px-8">
          Back Home
        </Link>
        <Link href="/tiles" className="btn btn-outline rounded-full px-8">
          Browse Tiles
        </Link>
      </div>
    </div>
  );
}
