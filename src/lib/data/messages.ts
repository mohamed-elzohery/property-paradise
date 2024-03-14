import Message from "@/models/Message";

const fetchMessages = async (userID: string) => {
  const unreadMessages = await Message.find({ receiver: userID, read: false })
    .sort({ createdAt: -1 })
    .populate("property", "name")
    .populate("sender", "username");
  const readMessages = await Message.find({ receiver: userID, read: true })
    .sort({ createdAt: -1 })
    .populate("property", "name")
    .populate("sender", "username");

  return [...unreadMessages, ...readMessages];
};

export const fetchMessagesNumber = async (userID: string) => {
  const unreadMessages = await Message.countDocuments({
    receiver: userID,
    read: false,
  });
  return unreadMessages;
};
export default fetchMessages;
