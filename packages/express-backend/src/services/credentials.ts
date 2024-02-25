import { Credential } from "../models/credential";
import CredentialModel from "../models/mongo/credential";
import bcrypt from "bcrypt";

export function create(username: string, password: string) {
  return new Promise<Credential>((resolve, reject) => {
    if (!username || !password) {
      reject("must provide username and password");
    }
    CredentialModel
      .find({ username })
      .then((found: Credential[]) => {
        if (found.length) reject("username exists");
      })
      .then(() =>
        bcrypt
          .genSalt(10)
          .then((salt: string) => bcrypt.hash(password, salt))
          .then((hashedPassword: string) => {
            const creds = new CredentialModel({
              username,
              hashedPassword
            });
            creds.save().then((created: Credential) => {
              if (created) resolve(created);
            });
          })
      );
  });
}

export function verify(username: string, password: string): Promise<String> {
  return new Promise<String>((resolve, reject) => {
    CredentialModel
      .find({ username })
      .then((found) => {
        if (found && found.length == 1) return found[0];
        else return reject("Invalid username or password");
      })
      .then((credsOnFile) => {
        if (credsOnFile)
          return bcrypt.compare(password, credsOnFile.hashedPassword);
        else reject("Invalid username or password");
      })
      .then((match) => {
        if (match) resolve(username);
        else reject("Invalid username or password");
      });
  });
}

function index(): Promise<Credential[]> {
  return CredentialModel.find();
}

function deleteCredentials(): Promise<any> {
  return CredentialModel.deleteMany();
}

export default { create, verify, index, deleteCredentials };