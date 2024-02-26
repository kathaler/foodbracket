import {Schema, model} from "mongoose";
import {Credential} from "ts-models";


const credentialSchema = new Schema<Credential>(
    {
        username : {type: String, require: true, trim: true},
        hashedPassword : {type: String, require: true}
    },
    {collection: "user-credentials"}
);

const CredentialModel = model<Credential>("Credential", credentialSchema);

export default CredentialModel;