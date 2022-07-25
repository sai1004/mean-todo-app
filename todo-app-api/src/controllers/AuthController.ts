import { Router } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    private router: Router = Router();
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    getRouter(): Router {
        this.router.post("/signup", async (req: any, res: any) => {
            try {
                let reqData: any = req.body;
                let result: any = null;

                if (reqData.data) {
                    result = await this.authService.signup(reqData.data);
                    if (result) {
                        res.status(200).send(result);
                    } else {
                        res.status(401).send({ status: 0, message: "Invalid Credentials" });
                    }
                } else {
                    throw { status: 0, message: "Invalid Data" };
                }
            } catch (error) {}
        });

        this.router.post("/signin", async (req: any, res: any) => {
            try {
                let reqData: any = req.body;
                let result: any = null;

                if (reqData) {
                    result = await this.authService.signin(reqData.data);

                    if (result.access_token) {
                        res.status(200).send(result);
                    } else {
                        res.status(401).send(result);
                    }
                } else {
                }
            } catch (error) {}
        });

        this.router.post("/token", async (request: any, response: any) => {
            try {
                let reqData: any = request.body;
                let result: any = null;
                if (reqData) {
                    result = await this.authService.refreshToken(reqData);
                } else {
                    throw { message: "Invalid Data" };
                }
                response.send({ status: 1, data: result });
            } catch (error) {
                response.send({ status: 0, error: error });
            }
        });

        return this.router;
    }
}
