"use client";
import { deleteMessage } from "@/actions";
import { markAsRead } from "@/actions/markAsRead";
import Property from "@/models/Property";
import { Message } from "@/types/user/Message";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

interface MessageCardProps {
  message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [readFormState, markAsReadAction] = useFormState(
    markAsRead.bind(null, message._id),
    {
      isRead: message.read,
      message: null,
      success: false,
    }
  );
  const [deleteFormState, deleteMessageAction] = useFormState(
    deleteMessage.bind(null, message._id),
    {
      message: null,
      success: false,
    }
  );
  useEffect(() => {
    if (readFormState.message === null) return;
    if (readFormState.success) toast.success(readFormState.message);
    if (!readFormState.success) toast.error(readFormState.message);
  }, [readFormState.message, readFormState.success]);
  useEffect(() => {
    if (deleteFormState.message === null) return;
    if (deleteFormState.success) toast.success(deleteFormState.message);
    if (!deleteFormState.success) toast.error(deleteFormState.message);
  }, [deleteFormState.message, deleteFormState.success]);
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!message.read && (
        <div className="absolute right-3 top-3 py-1 px-2 bg-yellow-500 text-white rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleDateString()}
        </li>
      </ul>
      <div className="flex gap-2">
        <form action={markAsReadAction}>
          <button
            className={`mt-4 mr-3 ${
              message.read ? "bg-gray-300" : "bg-blue-500 text-white"
            }  py-1 px-3 rounded-md`}
          >
            {message.read ? "Mark as new" : "Mark As Read"}
          </button>
        </form>
        <form action={deleteMessageAction}>
          <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageCard;
