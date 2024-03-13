import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "sender is required"],
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "receiver is required"],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "property is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    body: {
      type: String,
      required: [true, "message body is required"],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    read: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models?.Message || model("Message", MessageSchema);

export default Message;
