import React from "react";
import Navbar from "../nav/Navbar";
import { fetchMessagesNumber } from "@/lib/data/messages";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth";

const Header = async () => {
  const session = await getServerSession(authOptions);
  let numberOfUnreadMessages = null;
  if (session && session.user)
    numberOfUnreadMessages = await fetchMessagesNumber(session.user.id);

  return (
    <header>
      <Navbar numberOfMessages={numberOfUnreadMessages} />
    </header>
  );
};

export default Header;
