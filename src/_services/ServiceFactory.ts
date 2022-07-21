import { AuthenticationService } from "./AuthenticationService";
import { CategoryService } from "./CategoryService";
import { CollectionService } from "./CollectionService";
import { InventoryService } from "./InventoryService";
import { LocationService } from "./LocationService";
import { ProductService } from "./ProductService";
import { VariantService } from "./VariantService";
import { VendorService } from "./VendorService";

export class ServiceFactory {

    private _authService?: AuthenticationService;
    get authService(): AuthenticationService {
        if (this._authService) return this._authService;
        this._authService = new AuthenticationService();
        return this._authService;
    }

    private _categoryService?: CategoryService;
    get categoryService(): CategoryService {
        if (this._categoryService) return this._categoryService;
        this._categoryService = new CategoryService();
        return this._categoryService;
    }

    private _collectionService?: CollectionService;
    get collectionService(): CollectionService {
        if (this._collectionService) return this._collectionService;
        this._collectionService = new CollectionService();
        return this._collectionService;
    }

    // private _inventoryService?: InventoryService;
    // get inventoryService(): InventoryService {
    //     if (this._inventoryService) return this._inventoryService;
    //     this._inventoryService = new InventoryService();
    //     return this._inventoryService;
    // }

    private _locationService?: LocationService;
    get locationService(): LocationService {
        if (this._locationService) return this._locationService;
        this._locationService = new LocationService();
        return this._locationService;
    }

    private _vendorService?: VendorService;
    get vendorService(): VendorService {
        if (this._vendorService) return this._vendorService;
        this._vendorService = new VendorService();
        return this._vendorService;
    }

    private _productService?: ProductService;
    get productService(): ProductService {
        if (this._productService) return this._productService;
        this._productService = new ProductService();
        return this._productService;
    }

    private _variantService?: VariantService;
    get variantService(): VariantService {
        if (this._variantService) return this._variantService;
        this._variantService = new VariantService();
        return this._variantService;
    }

    private _inventoryService?: InventoryService;
    get inventoryService(): InventoryService {
        if (this._inventoryService) return this._inventoryService;
        this._inventoryService = new InventoryService();
        return this._inventoryService;
    }
}