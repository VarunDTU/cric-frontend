"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const handleSignOut = async () => {
    await signOut();
  };
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="h-10 w-full">
      <div className="flex justify-between items-center bg-slate-900 p-2 px-10">
        <div
          className="text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          CricApp
        </div>
        <div className="flex cursor-pointer">
          {session ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <div
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
