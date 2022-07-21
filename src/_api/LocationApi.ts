import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface ILocationCreateRequest {
    name: string;
    address: string;
    contact_person: string;
    contact: string;
}
export interface ILocationUpdateRequest {
    name?: string;
    address?: string;
    contact_person?: string;
    contact?: string;
}

export interface ILocationInfo {
    uuid: string;
    name: string;
    address: string;
    contact_person: string;
    contact: string;
}

export interface ILocationListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: ILocationInfo[]
}
export interface ILocationRetrieveResponse extends IAPIBaseResponse {
    data: ILocationInfo
}

export class LocationApi extends AuthenticatedApi {
    async list(): Promise<ILocationListResponse> {
        return this.getRequest(`${baseUrl}/location`);
    }

    async retrieve(uuid: string): Promise<ILocationRetrieveResponse> {
        return this.getRequest(`${baseUrl}/location/${uuid}`);
    }

    async create(request: ILocationCreateRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/location`, request);
    }

    async update(request: ILocationUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
        return this.putRequest(`${baseUrl}/location/${uuid}`, request);
    }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/location/${uuid}`);
    }
}