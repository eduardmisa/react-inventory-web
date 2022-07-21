import { ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { CartesianProduct } from 'ts-combinatorics';
import { v4 } from 'uuid';
import { ICategoryInfo } from '../../_api/CategoryApi';
import { IAPIBaseResponse } from '../../_api/Contracts';
import { ILocationInfo } from '../../_api/LocationApi';
import { IInventoryCreationRequest, IProductCreationRequest, IVariantCreationRequest, ProductCreateRequestType } from '../../_api/ProductApi';
import { IVendorInfo } from '../../_api/VendorApi';
import { useServiceFactoryContext } from '../ServiceFactoryContext';

export interface IVariantItem {
    uuid: string;
    name: {
        uuid: string;
        val: string;
    },
    value: {
        uuid: string;
        val: string;
        items: string[];
    }
}

export enum VariantFormChangeType {
    NAME = 'NAME',
    VALUE = 'VALUE'
}

export interface ICartesianVariant {
    quantity: number;
    [key: string]: string | number
}

export interface ISelectItem {
    key: string;
    value: string
}

export interface IImageItem {
    name: string;
    base64: string
}

export interface IProductCreateContext {
    locations: ILocationInfo[],
    fetchLocations: () => Promise<void>;
    selectedLocation: string;
    setSelectedLocation: Dispatch<SetStateAction<string>>;

    vendors: IVendorInfo[],
    fetchVendors: () => Promise<void>;
    selectedVendor: string;
    setSelectedVendor: Dispatch<SetStateAction<string>>;

    categories: ICategoryInfo[],
    fetchCategories: () => Promise<void>;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;

    images: IImageItem[];
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;

    productName: string
    setProductName: Dispatch<SetStateAction<string>>;
    productDescription: string
    setDescription: Dispatch<SetStateAction<string>>;

    price: number
    setPrice: Dispatch<SetStateAction<number>>;

    hasVariant: boolean;
    togglHasVariant: () => void;

    variants: IVariantItem[];
    addNewVariant: () => void;
    removeVariant: (tem: IVariantItem) => void;
    handleVariantFormChange: (event: ChangeEvent<HTMLInputElement>, field: VariantFormChangeType, item: IVariantItem) => void;
    handleVariantValuesEnter: (e: KeyboardEvent, item: IVariantItem) => void;
    handleVariantValuesRemove: (e: any, item: IVariantItem) => void;

    cartesionObjectList: ICartesianVariant[];
    computeCartesianProduct: (variants: IVariantItem[]) => void;

    variantHeaders: string[];

    productQuantity: number
    setProductQuantity: Dispatch<SetStateAction<number>>;

    handleInventoryQuantity: (event: ChangeEvent<HTMLInputElement>, item: ICartesianVariant) => void;

    SUBMIT: () => Promise<IAPIBaseResponse>;
}

const AppContext = createContext<IProductCreateContext>({} as IProductCreateContext);

export function ProductCreateContextProvider({ children }: any) {
    const { serviceFactory } = useServiceFactoryContext();
    const locationService = serviceFactory.locationService;
    const vendorService = serviceFactory.vendorService;
    const categoryService = serviceFactory.categoryService;
    const productService = serviceFactory.productService;

    const [locations, setLocations] = useState<ILocationInfo[]>([])
    const fetchLocations = async () => {
        try {
            const result = await locationService.list();
            setLocations(result.data)
        } catch (error) {
            console.log('failed to fetch', error)
        }
    }
    const [selectedLocation, setSelectedLocation] = useState<string>('')

    const [vendors, setVendors] = useState<IVendorInfo[]>([])
    const fetchVendors = async () => {
        try {
            const result = await vendorService.list();
            setVendors(result.data)
        } catch (error) {
            console.log('failed to fetch', error)
        }
    }
    const [selectedVendor, setSelectedVendor] = useState<string>('')

    const [categories, setCategories] = useState<ICategoryInfo[]>([])
    const fetchCategories = async () => {
        try {
            const result = await categoryService.list();
            setCategories(result.data)
        } catch (error) {
            console.log('failed to fetch', error)
        }
    }
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const [images, setImages] = useState<IImageItem[]>([]);
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let files: IImageItem[] = []
        const promises = Array.from(e.target.files || []).map(async (file) => {
            const base64 = await fileToBase64(file) as string;
            const item = {
                name: file.name,
                base64
            }
            files.push(item);
        })
        await Promise.all(promises);
        setImages(files);
    }

    const [productName, setProductName] = useState<string>('')
    const [productDescription, setDescription] = useState<string>('')

    const [price, setPrice] = useState<number>(0);

    const [hasVariant, setHasVariant] = useState<boolean>(false)
    const togglHasVariant = () => {
        setHasVariant(!hasVariant);
    }

    const [variants, setVariants] = useState<IVariantItem[]>([])
    const addNewVariant = () => {
        const newVariant: IVariantItem = {
            uuid: v4(),
            name: {
                uuid: v4(),
                val: ''
            },
            value: {
                uuid: v4(),
                val: '',
                items: []
            }
        }
        setVariants([...variants, newVariant]);
    }
    const removeVariant = (item: IVariantItem) => {
        const newList = [...variants]
        newList.splice(variants.indexOf(item), 1);
        setVariants(newList);
        computeCartesianProduct(newList);
    }
    const handleVariantFormChange = (event: ChangeEvent<HTMLInputElement>, field: VariantFormChangeType, item: IVariantItem) => {
        const val = event.target.value;

        let newList: IVariantItem[] = [];

        switch (field) {
            case VariantFormChangeType.NAME:
                newList = variants.map((variant) => {
                    if (variant.uuid === item.uuid) {
                        variant.name.val = val;
                    }
                    return variant;
                })
                break;

            case VariantFormChangeType.VALUE:
                newList = variants.map((variant) => {
                    if (variant.uuid === item.uuid) {
                        variant.value.val = val;
                    }
                    return variant;
                })
                break;

            default:
                break;
        }

        setVariants(newList);
        computeCartesianProduct(newList);
    }
    const handleVariantValuesEnter = (e: KeyboardEvent, item: IVariantItem) => {
        if (e.code === 'Enter') {
            const value = (e.target as HTMLInputElement).value;

            const newList = variants.map((variant) => {
                if (variant.uuid === item.uuid) {
                    variant.value.val = '';

                    const exists = variant.value.items.find(f => f.toLowerCase() === value.toLowerCase())
                    if (!exists)
                        variant.value.items.push(value)
                }
                return variant;
            })
            setVariants(newList);
            computeCartesianProduct(newList);
        }
    }
    const handleVariantValuesRemove = (e: any, item: IVariantItem) => {
        const value = e.target.innerHTML;
        const newList = variants.map((variant) => {
            if (variant.uuid === item.uuid) {
                variant.value.items.splice(variant.value.items.indexOf(value), 1);
            }
            return variant;
        })
        setVariants(newList);
        computeCartesianProduct(newList);
    }

    const [cartesionObjectList, setCartesionObjectList] = useState<ICartesianVariant[]>([])
    const computeCartesianProduct = (variants: IVariantItem[]) => {
        const two_d_variants = variants.map(item => item.value.items)

        // Should not continue if
        // atleast 1 array has no items
        const allowed = (variantArray: string[][]) => {
            if (variantArray.length === 0) return false
            let yes = true;
            variantArray.forEach(element => {
                if (element.length === 0) {
                    yes = false;
                    return;
                }
            });
            return yes
        }
        if (!allowed(two_d_variants)) {
            setCartesionObjectList([])
            return [];
        }

        const result = CartesianProduct.from(two_d_variants).toArray();

        const mappedResult = result.map((variant: any) => {
            let mapObject: ICartesianVariant = {
                quantity: 1
            }

            variant.forEach((variantTextValue: any) => {
                let variantValueObject = variants.find(a => a.value.items.includes(variantTextValue))
                if (variantValueObject)
                    Object.assign(mapObject, { [variantValueObject.name.val]: variantTextValue })
            })

            return mapObject
        }) || []

        setCartesionObjectList(mappedResult)
    }

    const [variantHeaders, setVariantHeaders] = useState<string[]>([])
    useEffect(() => {
        if (cartesionObjectList.length === 0) {
            setVariantHeaders([]);
            return;
        }
        const first = cartesionObjectList[0];
        setVariantHeaders(Object.keys(first));
    }, [cartesionObjectList])

    const [productQuantity, setProductQuantity] = useState<number>(0)

    const handleInventoryQuantity = (event: ChangeEvent<HTMLInputElement>, item: ICartesianVariant) => {
        const val = event.target.value;

        const newList = cartesionObjectList.map((row) => {
            if (row === item) {
                row.quantity = Number(val);
            }
            return row;
        })

        setCartesionObjectList(newList)
    }

    const fileToBase64 =  (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    const SUBMIT = async () => {

        let image = '';
        try {
            const name = (images && images.length > 0) ? images[0].name : '';
            const base64 = (images && images.length > 0) ? images[0].base64 : '';

            if (name && base64.length > 0) {
                const response = await productService.uploadPicture({
                    pictures: [{
                        name: (images && images.length > 0) ? images[0].name : '',
                        base64: base64,
                    }]
                })
                image = (response as any).pictures[0];
            }
        } catch (error) {
            console.log('failed to upload')
        }

        const product_details: IProductCreationRequest = {
            product_id: v4(),
            name: productName,
            description: productDescription,
            image,
            base_price: price,
            has_variant: hasVariant,
            expires_at: undefined,
            critical_level: undefined,
            tags: undefined,
        }

        let variant_details: IVariantCreationRequest[] | undefined = [];
        let inventory_details: IInventoryCreationRequest[] | undefined = [];

        if (hasVariant) {
            cartesionObjectList.forEach(item => {
                const variant_id = v4();
                const product_id = product_details.product_id;
                const quantity = item.quantity;

                let newItem = item as any;
                delete newItem.quantity;

                const name = Object.values(newItem).filter(f => f !== 'quantity').join(' | ')
                const description = JSON.stringify(item);
                const image = 'image';
                const variant_price = 1;
    
                variant_details?.push({
                    variant_id,
                    product_id,
                    name,
                    description,
                    image,
                    variant_price,
                })
    
                const inventory_id = v4();
                const location_id = selectedLocation;
                const sku = `vrnt-${variant_id}-sku-${inventory_id}`
                const serial_number = v4();
    
                inventory_details?.push({
                    inventory_id,
                    location_id,
                    product_id,
                    variant_id,
                    image,
                    sku,
                    serial_number,
                    quantity,
                })
            })
        }
        else {
            const product_id = product_details.product_id;

            const inventory_id = v4();
            const location_id = selectedLocation;
            const sku = `sku-${inventory_id}`
            const serial_number = v4();

            variant_details = undefined;

            inventory_details.push({
                inventory_id,
                location_id,
                product_id,
                variant_id: undefined,
                image,
                sku,
                serial_number,
                quantity: productQuantity,
            })
        }

        return await productService.create({
            product_details,
            variant_details,
            inventory_details,
            type: ProductCreateRequestType.SUBMIT
        })
    }

    return (
        <AppContext.Provider value={{
            locations,
            fetchLocations,
            selectedLocation,
            setSelectedLocation,

            vendors,
            fetchVendors,
            selectedVendor,
            setSelectedVendor,

            categories,
            fetchCategories,
            selectedCategory,
            setSelectedCategory,

            images,
            handleFileChange,

            productName,
            setProductName,
            productDescription,
            setDescription,

            price,
            setPrice,

            hasVariant,
            togglHasVariant,
            variants,
            addNewVariant,
            removeVariant,
            handleVariantFormChange,
            handleVariantValuesEnter,
            handleVariantValuesRemove,
            cartesionObjectList,
            variantHeaders,
            computeCartesianProduct,
            handleInventoryQuantity,

            productQuantity,
            setProductQuantity,

            SUBMIT,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useProductCreateContext(): IProductCreateContext {
    const context = useContext<IProductCreateContext>(AppContext);
    if (context === undefined) {
        throw new Error("useProductCreateContext must be within ProductCreateContextProvider")
    }
    return context;
}
