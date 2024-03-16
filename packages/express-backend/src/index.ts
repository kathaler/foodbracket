import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";

import { generateAccessToken, loginUser, registerUser } from "./auth";

import { PathLike } from "node:fs";
import path from "node:path";
import fs from "node:fs/promises";

import credentials from "./services/credentials";
import searchYelp from "./services/yelp";
import profiles from "./services/profiles";

import { Profile } from "ts-models";
import { Restaurants } from "ts-models";

connect("FoodBracket");

const app = express();
const port = process.env.PORT || 3000;

const frontend = "lit-frontend";
let cwd = process.cwd();
let dist: PathLike | undefined;
let indexHtml: PathLike | undefined;

app.use(cors());
app.use(express.json());

try {
  indexHtml = require.resolve(frontend);
  dist = path.dirname(indexHtml.toString());
} catch (error: any) {
  console.log(`Could not resolve ${frontend}:`, error.code);
  dist = path.resolve(cwd, "..", frontend, "dist");
  indexHtml = path.resolve(dist, "index.html");
}

console.log(`Serving ${frontend} from`, dist);

if (dist) app.use(express.static(dist.toString()));

app.post("/login", loginUser);
app.post("/signup", registerUser);

// Serve index.html for all non-API requests (Client-Side Routing)
app.get(/^(?!\/api).*/, (req, res) => {
  if (!indexHtml) {
    res
      .status(404)
      .send(`Not found; ${frontend} not available, running in ${cwd}`);
  } else {
    fs.readFile(indexHtml, { encoding: "utf8" })
      .then((html) => res.send(html))
      .catch((err) => res.status(500).send("Error serving the application"));
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
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

app.delete("/api/profiles", (req: Request, res: Response) => {
  profiles
  .deleteProfiles()
  .then(() => res.status(204).end())
  .catch((err) => res.status(404).end());
});

app.get("/api/profiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .get(userid)
    .then((profile: Profile | undefined) => {
      if (!profile) throw "Not found";
      else res.json(profile);
    })
    .catch((err) => res.status(404).end());
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

app.get("/api/restaurants", (req: Request, res: Response) => {
  const { location } = req.query;
  searchYelp(location as string)
    .then((restaurants: Restaurants) => res.json(restaurants))
    .catch((err) => res.status(404).end());
})
