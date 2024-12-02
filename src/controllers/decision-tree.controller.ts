import { Request, Response } from "express";
import DecisionTreeNode from "../models/decision-tree.model";
import * as accountService from "../services/account.service";

export const addNode = async (req: Request, res: Response) => {
  try {
    const { id, text, parentId, isLeaf, webhookUrl, validationRequired } =
      req.body;
    const newNode = new DecisionTreeNode({
      id,
      text,
      parentId,
      isLeaf,
      webhookUrl,
      validationRequired,
    });
    await newNode.save();

    if (parentId) {
      await DecisionTreeNode.findOneAndUpdate(
        { id: parentId },
        { $push: { childrenIds: id } }
      );
    }

    res.status(201).json(newNode);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedNode = await DecisionTreeNode.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );
    if (!updatedNode) {
      res.status(404).json({ error: "Node not found" });
      return;
    }
    res.status(200).json(updatedNode);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNode = await DecisionTreeNode.findOneAndDelete({ id });
    if (!deletedNode) {
      res.status(404).json({ error: "Node not found" });
      return;
    }

    if (deletedNode.parentId) {
      await DecisionTreeNode.findOneAndUpdate(
        { id: deletedNode.parentId },
        { $pull: { childrenIds: id } }
      );
    }

    await DecisionTreeNode.deleteMany({ parentId: id });

    res
      .status(200)
      .json({ message: "Node and its children deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const handleAccountValidation = async (req: Request, res: Response) => {
  try {
    const { accountNumber, accountName } = req.body;
    const isValid = await accountService.validateAccount(
      accountNumber,
      accountName
    );

    if (isValid) {
      const balance = await accountService.getBalance(accountNumber);
      res.status(200).json({
        isValid: true,
        message: `Account validated. Your balance is $${balance}.`,
        nextNodeId: "account_balance",
      });
    } else {
      res.status(200).json({
        isValid: false,
        message: "Invalid account details. Please try again.",
        nextNodeId: "balance_inquiry",
      });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
