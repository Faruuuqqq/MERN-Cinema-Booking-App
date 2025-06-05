import type { Request, Response } from 'express';
import User from '../models/User';
import walletTransaction from '../models/walletTransaction';

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: "cutomer"}).select(
      "name email",
    );

    return res.json({
      data: customers,
      message: "Success get data",
      status: "success",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get data",
      data: null,
      status: "failed",
    });
  }
}

export const getWalletTransactions = async (req: Request, res: Response) => {
try {
  const transactions = await walletTransaction.find().populate({
    path: "wallet",
    select: "user -_id",
    populate: {
      path: "user",
      select: "name",
    }
  })
    return res.json({
      data: transactions,
      message: "Success get data",
      status: "success",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get data",
      data: null,
      status: "failed",
    })
  }};


export const getTransactions = async (req: Request, res: Response) => {
try {
  const transactions = await walletTransaction.find().populate({
      path: "user",
      select: "name -_id",
    }).populate({
      path: "movie",
      select: "title -_id"
    }).populate({
      path: "theater",
      select: "name -_id"
    });

    return res.json({
      data: transactions,
      message: "Success get data",
      status: "success",
    });
} catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Failed to get data",
    data: null,
    status: "failed",
  });
  }
};