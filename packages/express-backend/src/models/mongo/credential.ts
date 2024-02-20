import {Schema, model} from "mongoose";


const credentialSchema = new Schema(
    {
        username : {type: String, require: true, trim: true},
        hashedPassword : {type: String, require: true}
    },
    {collection: "user-credentials"}
);

const CredentialModel = model<Credential>("Credential", credentialSchema);

export default CredentialModel;