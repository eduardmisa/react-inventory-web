import { ICollectionCreateRequest, ICollectionRetrieveResponse, ICollectionListResponse, CollectionApi, ICollectionUpdateRequest } from "../_api/CollectionApi";

export class CollectionService {
    private readonly collectionApi: CollectionApi;

    constructor() {
        this.collectionApi = new CollectionApi();
    }

    async list (): Promise<ICollectionListResponse> {
        return await this.collectionApi.list();
    }

    async details (uuid: string): Promise<ICollectionRetrieveResponse> {
        return await this.collectionApi.retrieve(uuid);
    }

    async create (request: ICollectionCreateRequest): Promise<void> {
        await this.collectionApi.create(request);
    }

    async update (request: ICollectionUpdateRequest, uuid: string): Promise<void> {
        await this.collectionApi.update(request, uuid);
    }

    async delete (uuid: string): Promise<void> {
        await this.collectionApi.delete(uuid);
    }
}