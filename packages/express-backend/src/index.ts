import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import profiles from "./services/profiles";
import { Profile } from "./models/profile";
import { generateAccessToken } from "./auth";
import credentials from "./services/credentials";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connect("FoodBracket")

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send('<h1>Hello World!</h1>');
});

app.get("/api/profiles/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    profiles
        .get(userid)
        .then((profile: Profile) => res.json(profile))
        .catch((err) => res.status(404).end());
});

app.post("/api/profiles", (req: Request, res: Response) => {
    const newProfile = req.body;
    profiles
        .create(newProfile)
        .then((profile: Profile) => res.status(201).send(profile))
        .catch((err) => res.status(500).end());
})

app.put("/api/profiles/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    const newProfile = req.body;

    profiles
        .update(userid, newProfile)
        .then((profile: Profile) => res.json(profile))
        .catch((err) => res.status(404).end());
});

app.post("/api/register", (req: Request, res: Response) => {
    const { username, password }: { username: string, password: string } = req.body;
    console.log("heeeere", username, password);
    credentials
        .create(username, password)
        .then((creds) => generateAccessToken(creds.username))
        .then((token: any) => { 
            res.status(201).send({ token: token });
    })
})

