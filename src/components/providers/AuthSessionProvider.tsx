"use client";

import { IUserDetails } from "@/interfaces";
import { getSession } from "@/lib";
import React from "react";

type Session = Awaited<ReturnType<typeof getSession>>;

const AuthSessionContext = React.createContext<Session | null>(null);

export default function AuthSessionProvider({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <AuthSessionContext.Provider value={session}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useSession() {
  const session = React.useContext(AuthSessionContext);
  // if (session === null) {
  //   throw new Error("useSession hook must be used within AuthSessionProvider2");
  // }

  return session as IUserDetails;
}
