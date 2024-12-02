import mongoose, { Document, Schema } from "mongoose";
import Type from "./type.model";

interface IDecisionTreeNode extends Document {
  type_id: mongoose.Types.ObjectId;
  id: string;
  text: string;
  parentId: string | null;
  childrenIds: string[];
  isLeaf: boolean;
  webhookUrl?: string;
  validationRequired?: boolean;
}

const decisionTreeNodeSchema = new Schema<IDecisionTreeNode>({
  type_id: { type: Schema.Types.ObjectId, ref: "Type", required: true },
  id: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  parentId: { type: String, default: null },
  childrenIds: [{ type: String }],
  isLeaf: { type: Boolean, default: false },
  webhookUrl: { type: String },
  validationRequired: { type: Boolean, default: false },
});

const DecisionTreeNode = mongoose.model<IDecisionTreeNode>(
  "DecisionTreeNode",
  decisionTreeNodeSchema
);

export default DecisionTreeNode;
