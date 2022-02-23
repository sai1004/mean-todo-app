import { Profile } from "../entities/Profile";
import { ProfileRepo } from "../repos/ProfileRepo";
import { App } from "../utils/App";

export class ProfileService {
    private profileRepo: ProfileRepo;

    constructor() {
        this.profileRepo = new ProfileRepo();
    }

    async saveProfile(profile: Profile) {
        try {
            let isValid = await this.validate(profile);

            if (isValid == true) {
                profile.password = App.HashSync(profile.password);

                let newProfile = await this.profileRepo.save(profile);

                let returnData = {
                    status: 1,
                    id: newProfile.id,
                    message: "Saved Successfully",
                };

                return returnData;
            } else if (isValid == false) {
                return { status: 0, message: "User Already Exists" };
            } else {
                throw { status: 0, message: "INVALID DATA" };
            }
        } catch (error) {
            throw error;
        }
    }

    async validate(profile: Profile) {
        profile.id = null;

        if (profile.email != "" && profile.email != undefined && profile.email != null) {
            let oldProfile = await this.profileRepo.search({ email: profile.email });

            if (oldProfile.length >= 1) {
                return false;
            } else {
                let uid = App;
                profile.id = uid.UniqueCode();
                let date = new Date().toISOString();
                profile.updatedOn = new Date(date);
                return true;
            }
        } else {
            return false;
        }
    }
}
