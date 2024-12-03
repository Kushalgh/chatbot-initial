import { RequestHandler } from "express";
import Type from "../models/type.model";

export const createType: RequestHandler = async (req, res) => {
  try {
    const { id, type_name } = req.body;

    const newType = new Type({ id, type_name });
    await newType.save();

    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: "Error creating Type", error });
  }
};

export const getAllTypes: RequestHandler = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Types", error });
  }
};

export const getTypeById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await Type.findOne({ id });
    if (!type) {
      res.status(404).json({ message: "Type not found" });
      return;
    }

    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Type", error });
  }
};

export const updateType: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_name } = req.body;

    const updatedType = await Type.findOneAndUpdate(
      { id },
      { type_name },
      { new: true }
    );

    if (!updatedType) {
      res.status(404).json({ message: "Type not found" });
      return;
    }

    res.status(200).json(updatedType);
  } catch (error) {
    res.status(500).json({ message: "Error updating Type", error });
  }
};

export const deleteType: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedType = await Type.findOneAndDelete({ id });

    if (!deletedType) {
      res.status(404).json({ message: "Type not found" });
      return;
    }

    res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Type", error });
  }
};
