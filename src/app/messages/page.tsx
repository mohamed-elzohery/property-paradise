import fetchMessages from "@/lib/data/messages";
import { authOptions } from "@/lib/utils/auth";
import MessageCard from "@/ui/messages/MessageCard";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

const MessagesPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return notFound();
  const messages = await fetchMessages(session.user.id);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="mt-4">You don not have any messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard
                  key={message._id.toString()}
                  message={{
                    _id: message._id.toString(),
                    body: message.body,
                    createdAt: message.createdAt,
                    email: message.email,
                    phone: message.phone,
                    property: message.property.name,
                    read: message.read,
                    username: message.sender.username,
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
