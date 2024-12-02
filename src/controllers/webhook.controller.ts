import { Request, Response } from "express";
import * as accountService from "../services/account.service";

export const handleAccountValidation = async (req: Request, res: Response) => {
  try {
    const { sessionId, message, context } = req.body;
    const { accountNumber, accountName } = context.tempData;

    const isValid = await accountService.validateAccount(
      accountNumber,
      accountName
    );

    if (isValid) {
      const balance = await accountService.getBalance(accountNumber);
      res.status(200).json({
        message: `Account validated. Your balance is $${balance}.`,
        context: { accountValidated: true, balance },
        nextNodeId: "account_validated",
      });
    } else {
      res.status(200).json({
        message: "Invalid account details. Please try again.",
        context: { accountValidated: false },
        nextNodeId: "account_validation_failed",
      });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
