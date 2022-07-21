import { Env } from "../_env";
import { IAPIBaseResponse, PublicApi } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface IRegisterRequest {
    email_mobile: string;
    password: string;
    name: string;
    meta: {
        [key: string]: unknown;
    };
}
export interface ILoginRequest {
    username: string;
    password: string;
}
export interface ILoginSucessResponse extends IAPIBaseResponse {
    data?: {
        access_token: string;
        refresh_token: string;
        user: {
            user_id: string;
            name: string;
            email: string;
            mobile: string;
            meta: {
                [key: string]: unknown;
            };
        }
    }
}

export class AuthApi extends PublicApi {
    async login(request: ILoginRequest): Promise<ILoginSucessResponse> {
        return this.postRequest(`${baseUrl}/login`, request);
    }

    async register(request: IRegisterRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/register`, request);
    }
}