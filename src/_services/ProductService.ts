import { IAPIBaseResponse } from "../_api/Contracts";
import { IProductRetrieveResponse, IProductListResponse, ProductApi, INewProductCreationRequest, IProductImageUploadRequest } from "../_api/ProductApi";

export class ProductService {
    private readonly productApi: ProductApi;

    constructor() {
        this.productApi = new ProductApi();
    }

    async list (): Promise<IProductListResponse> {
        return await this.productApi.list();
    }

    async details (uuid: string): Promise<IProductRetrieveResponse> {
        return await this.productApi.retrieve(uuid);
    }

    async create (request: INewProductCreationRequest): Promise<IAPIBaseResponse> {
        return await this.productApi.create(request);
    }

    async uploadPicture (request: IProductImageUploadRequest): Promise<IAPIBaseResponse> {
        return await this.productApi.uploadPicture(request);
    }

    // async update (request: IProductUpdateRequest, uuid: string): Promise<void> {
    //     await this.productApi.update(request, uuid);
    // }

    async delete (uuid: string): Promise<void> {
        await this.productApi.delete(uuid);
    }
}