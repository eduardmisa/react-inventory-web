import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface IVendorCreateRequest {
    name: string;
    address: string;
    contact_person: string;
    contact: string;
}
export interface IVendorUpdateRequest {
    name?: string;
    address?: string;
    contact_person?: string;
    contact?: string;
}

export interface IVendorInfo {
    uuid: string;
    name: string;
    address: string;
    contact_person: string;
    contact: string;
}

export interface IVendorListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: IVendorInfo[]
}
export interface IVendorRetrieveResponse extends IAPIBaseResponse {
    data: IVendorInfo
}

export class VendorApi extends AuthenticatedApi {
    async list(): Promise<IVendorListResponse> {
        return this.getRequest(`${baseUrl}/vendor`);
    }

    async retrieve(uuid: string): Promise<IVendorRetrieveResponse> {
        return this.getRequest(`${baseUrl}/vendor/${uuid}`);
    }

    async create(request: IVendorCreateRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/vendor`, request);
    }

    async update(request: IVendorUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
        return this.putRequest(`${baseUrl}/vendor/${uuid}`, request);
    }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/vendor/${uuid}`);
    }
}