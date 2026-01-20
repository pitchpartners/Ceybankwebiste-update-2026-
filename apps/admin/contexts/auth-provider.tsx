"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "../lib/auth-client";
import { User } from "better-auth";
import Image from "next/image";

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending: isLoading } = useSession();

  if (isLoading) {
    return(
      <div className="flex justify-center items-center w-screen h-screen flex-col gap-y-5">
        <Image width={40} height={40} src={"/images/logo-icon.svg"} alt="Ceybank"/>
        <p className="text-2xl font-bold">Ceybank Admin Portal</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user:data?.user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
