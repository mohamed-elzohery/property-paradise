"use server";
import { signIn } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export const signin = async () => {
  return signIn("google");
};
