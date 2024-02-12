import ProfileModel from "./models/mongo/profile";
import { Profile } from "./models/profile";

function index(): Promise<Profile[]> {
    return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
    return ProfileModel.findOne({ userid })
    .then((list) => list[0]) // Added type assertion and fixed list index
    .catch((error) => {
        throw `${userid} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
    const p = new ProfileModel(profile);
    return p.save();
}

export default { index, get, create };