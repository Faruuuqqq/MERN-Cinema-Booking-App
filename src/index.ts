import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";

import connectDB from "./utils/database";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
