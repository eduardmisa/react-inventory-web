import { AuthApi, ILoginRequest, IRegisterRequest } from "../_api/AuthApi";
import { ServiceException } from "./Contracts";

interface ICurrentUser {
    user_id: string;
    name: string;
    email: string;
    mobile: string;
    meta: {
        [key: string]: unknown;
    };
};

export class AuthenticationService {
    private readonly authApi: AuthApi;

    constructor() {
        this.authApi = new AuthApi();
    }

    get userIsLoggedIn(): boolean {
        const access_token = sessionStorage.getItem('access_token');
        return access_token ? true : false;
    }

    get currentUser(): ICurrentUser | undefined {
        if (!this.userIsLoggedIn) return undefined;
        return JSON.parse(sessionStorage.getItem('current_user') || '');
    }

    readonly publicPages = [
      '/login',
      '/register'
    ]

    async loginUser(form: ILoginRequest): Promise<void> {
        const result = await this.authApi.login(form);
        if (result.code !== 200) {
          throw new ServiceException(result.code, result.message);
        }
    
        sessionStorage.setItem('access_token', result?.data?.access_token || '');
        sessionStorage.setItem('refresh_token', result?.data?.refresh_token || '');
        sessionStorage.setItem('current_user', JSON.stringify(result?.data?.user));
    }

    async registerUser(form: IRegisterRequest): Promise<void> {
        const result = await this.authApi.register(form);
        if (result.code !== 200) {
          throw new ServiceException(result.code, result.message);
        }
    }

    async logoutUser(): Promise<void> {   
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('current_user');
    }
}