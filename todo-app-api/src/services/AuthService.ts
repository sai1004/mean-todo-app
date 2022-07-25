import { Profile } from "../entities/Profile";
import { ProfileRepo } from "../repos/ProfileRepo";
import { App } from "../utils/App";
import { ProfileService } from "./ProfileService";

export class AuthService {
    private profileRepo: ProfileRepo;
    private profileService: ProfileService;

    constructor() {
        this.profileRepo = new ProfileRepo();
        this.profileService = new ProfileService();
    }

    async signup(reqData: any) {
        try {
            let data = await this.profileService.saveProfile(reqData);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async signin(reqData: any) {
        try {
            if (reqData.email != "" || reqData.email != undefined || reqData.email != null) {
                let profileObj: Profile = await this.profileRepo.findByAny({ email: reqData.email });

                let isAuthValid: boolean = false;

                if (profileObj == null || reqData.password == null) {
                    return { status: 0, message: "Invalid Credentials" };
                } else {
                    isAuthValid = App.HashCompareSync(reqData.password, profileObj.password);

                    if (isAuthValid) {
                        return this.retervieProfileDetails(profileObj.id);
                    } else {
                        return { status: 0, message: "Invalid Credentials" };
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(inputData: any) {
        try {
            if (!inputData) throw { message: "Invalid Data" };
            var responseData: any = {};
            let jwtData: any = App.DecodeJWT(inputData.jwt);
            if (!jwtData) throw { message: "Invalid JWT" };
            responseData.identity = jwtData.identity;
            responseData.access_token = App.EncodeJWT(responseData);
            return responseData;
        } catch (error) {
            throw error;
        }
    }

    async resetPassword() {
        try {
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword() {
        try {
        } catch (error) {
            throw error;
        }
    }

    async retervieProfileDetails(profielId: any) {
        try {
            let responseData: any = {};

            let profileObj: Profile = await this.profileRepo.findById({ id: profielId });

            if (profileObj != null) {
                responseData.identity = {};
                responseData.identity.id = profileObj.id;
                responseData.identity.name = profileObj.name;
                responseData.identity.email = profileObj.email;
                responseData.identity.active = profileObj.active;
                responseData.identity.id = profileObj.id;

                responseData.access_token = App.EncodeJWT(responseData);
            } else {
                return { status: 0, message: "Profile Does Not Exisit" };
            }
            return responseData;
        } catch (error) {
            throw error;
        }
    }
}
