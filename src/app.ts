import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modules/products/product.route";

const app: Application = express();

// all parsers
app.use(express.json());
app.use(cors());

// APPLICATION ROUTES

// ---------- Product Routes -----------
app.use("/api/products", ProductRouter);

app.get("/", (req: Request, res: Response) => {
  const a = "hello world";

  res.send(a);
});

export default app;
