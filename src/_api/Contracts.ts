export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export interface IAPIBaseResponse {
    code: number;
    message: string;
}

interface IHeader {
    [key: string]: string
}
class BaseApi {
    constructor(headers: IHeader) {
        this.headers = headers
    }

    private headers: IHeader

    async getRequest<T>(url: string): Promise<T> {
        const result = await fetch(url, {
            method: Methods.GET,
            headers: this.headers
        });
        return result.json();
    }

    async postRequest<TResponse>(url: string, body?: any): Promise<TResponse> {
        const result = await fetch(url, {
            method: Methods.POST,
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return result.json();
    }

    async putRequest<TResponse>(url: string, body?: any): Promise<TResponse> {
        const result = await fetch(url, {
            method: Methods.PUT,
            headers: this.headers,
            body: JSON.stringify(body),
        });
        return result.json();
    }

    async deleteRequest<TResponse>(url: string): Promise<TResponse> {
        const result = await fetch(url, {
            method: Methods.DELETE,
            headers: this.headers,
        });
        if (result.status === 204) return {} as TResponse;
        return result.json();
    }
}

export class AuthenticatedApi extends BaseApi {
    constructor() {
        super({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        });   
    }
}
export class PublicApi extends BaseApi {
    constructor() {
        super({
            'Content-Type': 'application/json',
        });
    }
}