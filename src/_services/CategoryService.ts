import { ICategoryCreateRequest, ICategoryRetrieveResponse, ICategoryListResponse, CategoryApi, ICategoryUpdateRequest } from "../_api/CategoryApi";

export class CategoryService {
    private readonly categoryApi: CategoryApi;

    constructor() {
        this.categoryApi = new CategoryApi();
    }

    async list (): Promise<ICategoryListResponse> {
        return await this.categoryApi.list();
    }

    async details (uuid: string): Promise<ICategoryRetrieveResponse> {
        return await this.categoryApi.retrieve(uuid);
    }

    async create (request: ICategoryCreateRequest): Promise<void> {
        await this.categoryApi.create(request);
    }

    async update (request: ICategoryUpdateRequest, uuid: string): Promise<void> {
        await this.categoryApi.update(request, uuid);
    }

    async delete (uuid: string): Promise<void> {
        await this.categoryApi.delete(uuid);
    }
}