import mongoose, { Document, Schema } from "mongoose";

interface IHeader {
  key: string;
  value: string;
}

interface IBasicAuth {
  username: string;
  password: string;
}

interface IWebhook extends Document {
  decision_tree_id: string;
  name: string;
  url: string;
  verification_token: string;
  basic_auth?: IBasicAuth;
  headers: IHeader[];
}

const headerSchema = new Schema<IHeader>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const basicAuthSchema = new Schema<IBasicAuth>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const webhookSchema = new Schema<IWebhook>({
  decision_tree_id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  verification_token: { type: String },
  basic_auth: basicAuthSchema,
  headers: { type: [headerSchema], required: true },
});

const Webhook = mongoose.model<IWebhook>("Webhook", webhookSchema);

export default Webhook;
