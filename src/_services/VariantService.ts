import { IVariantCreateRequest, IVariantRetrieveResponse, IVariantListResponse, VariantApi, IVariantUpdateRequest } from "../_api/VariantApi";

export class VariantService {
    private readonly variantApi: VariantApi;

    constructor() {
        this.variantApi = new VariantApi();
    }

    async list (): Promise<IVariantListResponse> {
        return await this.variantApi.list();
    }

    async details (uuid: string): Promise<IVariantRetrieveResponse> {
        return await this.variantApi.retrieve(uuid);
    }

    async create (request: IVariantCreateRequest): Promise<void> {
        await this.variantApi.create(request);
    }

    async update (request: IVariantUpdateRequest, uuid: string): Promise<void> {
        await this.variantApi.update(request, uuid);
    }

    async delete (uuid: string): Promise<void> {
        await this.variantApi.delete(uuid);
    }
}