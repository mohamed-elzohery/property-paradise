import { User } from "@/types/user/User";

export const fetchUserByID = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/${id}`
    );
    if (!response.ok) throw new Error("failed to fetch user");

    return (await response.json()) as User;
  } catch (error) {
    console.log(error);
  }
};
