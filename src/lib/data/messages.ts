import Message from "@/models/Message";

const fetchMessages = async (userID: string) => {
  const messages = await Message.find({ receiver: userID })
    .populate("sender", "username")
    .populate("property", "name");

  return messages;
};

export default fetchMessages;
