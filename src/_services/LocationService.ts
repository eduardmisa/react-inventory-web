import { ILocationCreateRequest, ILocationRetrieveResponse, ILocationListResponse, LocationApi, ILocationUpdateRequest } from "../_api/LocationApi";

export class LocationService {
    private readonly locationApi: LocationApi;

    constructor() {
        this.locationApi = new LocationApi();
    }

    async list (): Promise<ILocationListResponse> {
        return await this.locationApi.list();
    }

    async details (uuid: string): Promise<ILocationRetrieveResponse> {
        return await this.locationApi.retrieve(uuid);
    }

    async create (request: ILocationCreateRequest): Promise<void> {
        await this.locationApi.create(request);
    }

    async update (request: ILocationUpdateRequest, uuid: string): Promise<void> {
        await this.locationApi.update(request, uuid);
    }

    async delete (uuid: string): Promise<void> {
        await this.locationApi.delete(uuid);
    }
}