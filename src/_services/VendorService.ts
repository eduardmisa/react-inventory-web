import { IVendorCreateRequest, IVendorRetrieveResponse, IVendorListResponse, VendorApi, IVendorUpdateRequest } from "../_api/VendorApi";

export class VendorService {
    private readonly vendorApi: VendorApi;

    constructor() {
        this.vendorApi = new VendorApi();
    }

    async list (): Promise<IVendorListResponse> {
        return await this.vendorApi.list();
    }

    async details (uuid: string): Promise<IVendorRetrieveResponse> {
        return await this.vendorApi.retrieve(uuid);
    }

    async create (request: IVendorCreateRequest): Promise<void> {
        await this.vendorApi.create(request);
    }

    async update (request: IVendorUpdateRequest, uuid: string): Promise<void> {
        await this.vendorApi.update(request, uuid);
    }

    async delete (uuid: string): Promise<void> {
        await this.vendorApi.delete(uuid);
    }
}