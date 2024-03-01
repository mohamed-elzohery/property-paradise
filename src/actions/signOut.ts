"use server";
import { signOut } from "@/lib/utils/auth";

export const signout = async () => {
  return signOut();
};
