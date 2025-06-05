import type { Request, Response } from 'express';
import User from '../models/User';
import { authSchema } from '../utils/zodSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const parse = authSchema.omit({
      name: true,
    }).parse(req.body);

    const checkUser = await User.findOne({
      email: parse.email,
      role: parse.role,
    })

    if (!checkUser) {
      return res.status(404).json({
        message: "Email not registered",
        data: null,
        status: "failed",
      });
    }

    const comparePassword = await bcrypt.compareSync(parse.password, checkUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Wrong password",
        data: null,
        status: "failed",
      });
    }

    const secretKey = process.env.SECRET_KEY ?? "";
    const token = jwt.sign({
      data : {
        id: checkUser._id,
      }
    }, secretKey, { expiresIn: "1d" });

    return res.json({
      data: {
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
        photoUrl: checkUser.photoUrl,
        token: token,
      },
      message: "Login success",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to login",
      data: null,
      status: "failed",
    });
  }
}