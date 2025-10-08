"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export function ButtonGoogle() {
  return (
    <div className="autenticacao">
      <div
        onClick={() => signIn("google", { callbackUrl: "/produtos" })}
        className="iconLogin flex items-center gap-2 cursor-pointer transform transition-transform duration-200 hover:scale-105"
      >
        <FcGoogle size={40} />
        Login com Google
      </div>
    </div>
  );
}
