import { compareSync, hashSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as Config from "../config/config";

export class App {
    private static uniqueId: number = 0;
    public static TOKEN_MESSAGE = "Please enter the token.";
    public static SAVED_SUCCESSFULLY = "Saved Successfully.";
    public static REMOVED_SUCCESSFULLY = "Removed Successfully.";
    public static INVALID_DATA = "Please enter valid data.";
    public static NON_ALPHA_NUMARIC = /[^\w\s]/g;

    public static UniqueCode(): string {
        var time: number = new Date().getTime();
        if (this.uniqueId == time) {
            while (new Date().getTime() < 1 + time) {}
            time = new Date().getTime();
        }
        this.uniqueId = time;
        return time.toString(36).toUpperCase();
    }

    public static UniqueNumber(): number {
        var time: number = new Date().getTime();
        if (this.uniqueId == time) {
            while (new Date().getTime() < 1 + time) {}
            time = new Date().getTime();
        }
        this.uniqueId = time;
        return time;
    }

    public static UniqueID(name: string, type: string): string {
        var str: string = "";

        if (type) {
            str = type + "_" + name;
        } else {
            str = name + "_" + App.UniqueCode();
        }
        str = str.replace(App.NON_ALPHA_NUMARIC, "_");
        str = str.replace(/\s/g, "_");
        str = str.substr(0, 128);
        return str.toUpperCase();
    }

    public static HashSync(data: string) {
        return hashSync(data, 8);
    }

    public static HashCompareSync(param1: string, param2: string) {
        return compareSync(param1, param2);
    }

    public static EncodeJWT(data: any) {
        return jwt.sign(data, Config.token, { expiresIn: "24h" });
    }

    public static RefreshJWT(data: any) {
        return jwt.sign(data, Config.token, { expiresIn: "24h" });
    }

    public static DecodeJWT(token: any) {
        if (token) {
            try {
                let baseAuth: any = new Buffer(token, "base64");

                if (baseAuth && baseAuth < 100) {
                    baseAuth = baseAuth.toString();
                    let [user, password] = baseAuth.split(":");
                    if (user && password && user == Config.baseAuth.user && password == Config.baseAuth.password) {
                        return { identity: { id: Config.baseAuth.user, baseAuth: true } };
                    } else {
                        return { status: 0, message: "Auth Token is Not Valid" };
                    }
                } else {
                    token = token.replace("jwt ", "").replace("JWT ", "");
                    return jwt.verify(token, Config.token);
                }
            } catch (error) {
                return { status: 0, messagee: "Auth Token is Not Valid" };
            }
        } else {
            return { status: 0, message: "Auth Token is not supplied" };
        }
    }

    public static verifyToken(req: any, res: any, next: any) {
        let token = req.headers.authorization;

        let isValidId: any = App.DecodeJWT(token);

        if (isValidId.identity) {
            next();
        } else {
            res.status(403).send({ status: 0, message: "Auth Token is Not Valid" });
        }
    }
}
