import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connect("FoodBracket")

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});