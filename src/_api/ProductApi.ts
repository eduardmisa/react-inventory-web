import { Env } from "../_env";
import { AuthenticatedApi, IAPIBaseResponse } from "./Contracts";

const baseUrl = Env.API_HOST;

export enum ProductCreateRequestType {
    SUBMIT = 'SUBMIT',
    SAVE = 'SAVE',
}

export interface IProductImageUploadRequest {
    pictures: {
        name: string;
        base64: string;
    }[]

}

export interface IProductCreationRequest {
    product_id: string;
    name: string;
    description?: string;
    image?: string;
    base_price: number;
    has_variant: boolean;
    expires_at?: number;
    critical_level?: number;
    tags?: string[];
}
export interface IVariantCreationRequest {
    variant_id: string;
    product_id: string;
    name: string;
    description: string;
    image: string;
    variant_price: number;
}
export interface IInventoryCreationRequest {
    inventory_id: string;
    location_id: string;
    product_id: string;
    variant_id?: string;
    image: string;
    sku: string;
    serial_number: string;
    quantity: number;
}

export interface INewProductCreationRequest {
    product_details: IProductCreationRequest;
    variant_details: IVariantCreationRequest[] | undefined;
    inventory_details: IInventoryCreationRequest[] | undefined;
    type: ProductCreateRequestType
}

export interface IProductInfo {
    uuid: string;
    name: string;
    description: string;
    image: string;
    base_price: number;
    has_variant: boolean;
    expires_at: number;
    critical_level: number;
    tags: string[];
}

export interface IProductListResponse extends IAPIBaseResponse {
    pagination: {
        key: string,
        limit: string,
        forward: string,
    }
    data: IProductInfo[]
}
export interface IProductRetrieveResponse extends IAPIBaseResponse {
    data: IProductInfo
}

export class ProductApi extends AuthenticatedApi {
    async list(): Promise<IProductListResponse> {
        return this.getRequest(`${baseUrl}/product`);
    }

    async retrieve(uuid: string): Promise<IProductRetrieveResponse> {
        return this.getRequest(`${baseUrl}/product/${uuid}`);
    }

    async create(request: INewProductCreationRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/product`, request);
    }

    async uploadPicture(request: IProductImageUploadRequest): Promise<IAPIBaseResponse> {
        return this.postRequest(`${baseUrl}/product/upload_pictures`, request);
    }

    // async update(request: IProductUpdateRequest, uuid: string): Promise<IAPIBaseResponse> {
    //     return this.putRequest(`${baseUrl}/product/${uuid}`, request);
    // }

    async delete(uuid: string): Promise<IAPIBaseResponse> {
        return this.deleteRequest(`${baseUrl}/product/${uuid}`);
    }
}