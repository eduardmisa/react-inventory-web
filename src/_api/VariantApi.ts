import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface IVariantCreateRequest {
    product_id: string;
    name: string;
    description: string;
    image: string;
    variant_price: number;
}
export interface IVariantUpdateRequest {
    product_id?: string;
    name?: string;
    description?: string;
    image?: string;
    variant_price?: number;
}

export interface IVariantInfo {
    uuid: string;
    product_id: string;
    name: string;
    description: string;
    image: string;
    variant_price: number;
}

export interface IVariantListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: IVariantInfo[]
}
export interface IVariantRetrieveResponse extends IAPIBaseResponse {
    data: IVariantInfo
}

export class VariantApi extends AuthenticatedApi {
    async list(): Promise<IVariantListResponse> {
        return this.getRequest(`${baseUrl}/variant`);
    }

    async retrieve(uuid: string): Promise<IVariantRetrieveResponse> {
        return this.getRequest(`${baseUrl}/variant/${uuid}`);
    }

    async create(request: IVariantCreateRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/variant`, request);
    }

    async update(request: IVariantUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
        return this.putRequest(`${baseUrl}/variant/${uuid}`, request);
    }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/variant/${uuid}`);
    }
}