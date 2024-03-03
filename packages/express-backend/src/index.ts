import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import profiles from "./services/profiles";
import { Profile } from "ts-models";
import { generateAccessToken } from "./auth";
import credentials from "./services/credentials";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connect("FoodBracket");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/profiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  profiles
    .get(userid)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

app.get("/api/profiles", (req: Request, res: Response) => {
  profiles
    .index()
    .then((profiles) => res.json(profiles))
    .catch((err) => res.status(404).end());
});

app.post("/api/profiles", (req: Request, res: Response) => {
  const newProfile = req.body;
  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).end());
});

app.put("/api/profiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newProfile = req.body;

  profiles
    .update(userid, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

app.get("/api/users", (req: Request, res: Response) => {
  credentials
    .index()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).end());
});

app.delete("/api/users", (req: Request, res: Response) => {
    credentials
        .deleteCredentials()
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).end());
});

app.post("/api/register", (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;
  if (!username || !password) {
    res.status(400).send("must provide username and password");
    return;
  } else {
    credentials
      .create(username, password)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => res.status(201).send({ token: token }))
      .catch((err) => res.status(401).send("username exists"));
  }
});


app.post("/api/login", (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;
  if (!username || !password) {
    res.status(400).send("must provide username and password");
    return;
  }
  credentials
    .verify(username, password)
    .then((creds: Credential) => generateAccessToken(creds.username))
    .then((token) => res.status(200).send({ token: token }))
    .catch((err) => res.status(401).send("Unauthorized"));
});
