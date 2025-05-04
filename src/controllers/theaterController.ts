import type { Request, Response } from "express";
import Theater from "../models/Theater";
import { theaterSchema } from "../utils/zodSchema";

export const getTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await Theater.find();

    return res.json({
      data: theaters,
      message: "Success get data",
      status: "success",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get data",
      data: null,
      status: "failed",
    })
  }
}

export const postTheater = async (req: Request, res: Response) => {
  try {
    const body = theaterSchema.parse(req.body);

    const theater = new Theater({
      name: body.name,
      city: body.city,
    });

    const newData = await theater.save();

    return res.json({
      data: newData,
      message: "Success create data",
      status: "success",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create data",
      data: null,
      status: "failed",
    });
  }
}

export const putTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = theaterSchema.parse(req.body);

    await Theater.findByIdAndUpdate(id, {
      name: body.name,
      city: body.city,
    });

    const updatedData = await Theater.findById(id);

    return res.json({
      data: updatedData, 
      message: "Success Updated data",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Updated data",
      data: null,
      status: "failed",
    });
  }
}

export const deleteTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedData = await Theater.findById(id);

    await Theater.findByIdAndDelete(id);

    return res.json({
      data: deletedData,
      message: "Success delete data",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete data",
      data: null,
      status: "failed",
    });
  }
}

export const getDetailTheater = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const theater = await Theater.findById(id);

    return res.json({
      data: theater,
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
}