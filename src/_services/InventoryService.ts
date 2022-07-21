import { IInventoryCreateRequest, IInventoryRetrieveResponse, IInventoryListResponse, InventoryApi, IInventoryUpdateRequest } from "../_api/InventoryApi";

export class InventoryService {
    private readonly inventoryApi: InventoryApi;

    constructor() {
        this.inventoryApi = new InventoryApi();
    }

    async list (): Promise<IInventoryListResponse> {
        return await this.inventoryApi.list();
    }

    async details (uuid: string): Promise<IInventoryRetrieveResponse> {
        return await this.inventoryApi.retrieve(uuid);
    }

    async create (request: IInventoryCreateRequest): Promise<void> {
        await this.inventoryApi.create(request);
    }

    async update (request: IInventoryUpdateRequest, uuid: string): Promise<void> {
        await this.inventoryApi.update(request, uuid);
    }

    async delete (uuid: string): Promise<void> {
        await this.inventoryApi.delete(uuid);
    }
}