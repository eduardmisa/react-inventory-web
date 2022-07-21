import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface ICategoryCreateRequest {
    name: string;
    description: string;
    sub_categories: any;
}
export interface ICategoryUpdateRequest {
    name?: string;
    description?: string;
    sub_categories?: any;
}

export interface ICategoryInfo {
    uuid: string;
    name: string;
    description: string;
    sub_categories: any;
}

export interface ICategoryListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: ICategoryInfo[]
}
export interface ICategoryRetrieveResponse extends IAPIBaseResponse {
    data: ICategoryInfo
}

export class CategoryApi extends AuthenticatedApi {
    async list(): Promise<ICategoryListResponse> {
        return this.getRequest(`${baseUrl}/category`);
    }

    async retrieve(uuid: string): Promise<ICategoryRetrieveResponse> {
        return this.getRequest(`${baseUrl}/category/${uuid}`);
    }

    async create(request: ICategoryCreateRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/category`, request);
    }

    async update(request: ICategoryUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
        return this.putRequest(`${baseUrl}/category/${uuid}`, request);
    }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/category/${uuid}`);
    }
}