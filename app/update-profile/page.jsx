"use client";
import dynamic from "next/dynamic";

const UpdateProfileClient = dynamic(() => import("./UpdateProfileClient"), { ssr: false });

export default function UpdateProfilePage() {
  return <UpdateProfileClient />;
}
