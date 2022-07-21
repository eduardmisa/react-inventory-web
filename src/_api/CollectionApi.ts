import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export interface ICollectionCreateRequest {
    name: string;
    image: string;
    parent_collection_id: any;
}
export interface ICollectionUpdateRequest {
    name?: string;
    image?: string;
    parent_collection_id?: any;
}

export interface ICollectionInfo {
    uuid: string;
    name: string;
    image: string;
    parent_collection_id: any;
}

export interface ICollectionListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: ICollectionInfo[]
}
export interface ICollectionRetrieveResponse extends IAPIBaseResponse {
    data: ICollectionInfo
}

export class CollectionApi extends AuthenticatedApi {
    async list(): Promise<ICollectionListResponse> {
        return this.getRequest(`${baseUrl}/collection`);
    }

    async retrieve(uuid: string): Promise<ICollectionRetrieveResponse> {
        return this.getRequest(`${baseUrl}/collection/${uuid}`);
    }

    async create(request: ICollectionCreateRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/collection`, request);
    }

    async update(request: ICollectionUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
        return this.putRequest(`${baseUrl}/collection/${uuid}`, request);
    }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/collection/${uuid}`);
    }
}