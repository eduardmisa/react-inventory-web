import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface IInventoryCreateRequest {
    location_id: string;
    product_id: string;
    variant_id?: string;
    image: string;
    sku: string;
    serial_number: string;
    quantity: number;
}
export interface IInventoryUpdateRequest {
    location_id?: string;
    product_id?: string;
    variant_id?: string;
    image?: string;
    sku?: string;
    serial_number?: string;
    quantity?: number;
}

export interface IInventoryInfo {
    uuid: string;
    location_id: string;
    product_id: string;
    variant_id?: string;
    image: string;
    sku: string;
    serial_number: string;
    quantity: number;
}

export interface IInventoryListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: IInventoryInfo[]
}
export interface IInventoryRetrieveResponse extends IAPIBaseResponse {
    data: IInventoryInfo
}

export class InventoryApi extends AuthenticatedApi {
    async list(): Promise<IInventoryListResponse> {
        return this.getRequest(`${baseUrl}/inventory`);
    }

    async retrieve(uuid: string): Promise<IInventoryRetrieveResponse> {
        return this.getRequest(`${baseUrl}/inventory/${uuid}`);
    }

    async create(request: IInventoryCreateRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/inventory`, request);
    }

    async update(request: IInventoryUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
        return this.putRequest(`${baseUrl}/inventory/${uuid}`, request);
    }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/inventory/${uuid}`);
    }
}