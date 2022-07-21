import { ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { CartesianProduct } from 'ts-combinatorics';
import { v4 } from 'uuid';
import { ICategoryInfo } from '../../_api/CategoryApi';
import { IAPIBaseResponse } from '../../_api/Contracts';
import { ILocationInfo } from '../../_api/LocationApi';
import {
    IInventoryCreationRequest,
    IProductCreationRequest,
    IProductListResponse,
    IVariantCreationRequest,
    ProductCreateRequestType
} from '../../_api/ProductApi';
import { IVendorInfo } from '../../_api/VendorApi';
import { useServiceFactoryContext } from '../ServiceFactoryContext';
import {DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd";

export interface IContent {
    english: string | undefined;
    chinese: string | undefined;
    malay: string | undefined;
    tamil: string | undefined;
}

export interface IComponent {
    uuid: string;
    name: string;
    content: IContent;
}

export interface IComponentActions {
    grabbing: boolean;
    toggleDragging: () => void;
}

interface IDraggableComponent extends IComponent, IComponentActions { }

export class DraggableComponent implements IDraggableComponent {
    uuid: string;
    grabbing: boolean;
    name: string;
    content: IContent;

    constructor(
      name: string,
      uuid: string | undefined = undefined,
      content: IContent | undefined = undefined)
    {
        this.uuid = uuid ||v4();
        this.grabbing = false;
        this.name = name;
        this.content = content || this.defaultContent;
    }

    get defaultContent(): IContent {
        return {
            english: "Insert content here",
            chinese: "Insert content here",
            malay: "Insert content here",
            tamil: "Insert content here"
        }
    }

    toggleDragging () {
        this.grabbing = true;
    }
}

export enum ComponentOrigin {
    source = 'droppable-source',
    destination = 'droppable-destination'
}



export interface ISiteContext {
    showDetails: boolean;
    toggleDetails: () => void;

    listData?: IProductListResponse
    fetchListData: () => void;

    stagedComponent?: IDraggableComponent;

    componentList: IDraggableComponent[]
    setComponentList: Dispatch<SetStateAction<IDraggableComponent[]>>;

    destinationList: IDraggableComponent[];

    getDraggedComponent: (draggableId: string, from: ComponentOrigin) => IDraggableComponent

    reorder: (list: IDraggableComponent[], startIndex: number, endIndex: number) => IDraggableComponent[];
    copyToDestination: (draggableId: string, destinationIndex: number) => IDraggableComponent[];

    getItemStyle: (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined, isClone: boolean) => any;
    getListStyle: (isDraggingOver: boolean) => any;

    onDragStart: (result: any) => void
    onDragEnd: (result: any) => void

    onComponentClick: (item: IDraggableComponent) => void;
}


const AppContext = createContext<ISiteContext>({} as ISiteContext);

export function SiteContextProvider({ children }: any) {
    const { serviceFactory } = useServiceFactoryContext();
    const productService = serviceFactory.productService;

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    const [listData, setListData] = useState<IProductListResponse>();
    const fetchListData = async () => {
        try {
            const data = await productService.list();
            setListData(data);

        } catch (error) {
            alert('failed to get list data');
        }
    }

    const [stagedComponent, setStagedComponent] = useState<IDraggableComponent>();
    const [componentList, setComponentList] = useState<IDraggableComponent[]>([]);

    const [destinationList, setDestinationList] = useState<IDraggableComponent[]>([]);

    const getDraggedComponent = (draggableId: string, from: ComponentOrigin) => {
        switch (from) {
            case ComponentOrigin.source:
                return componentList.find(f => f.uuid === draggableId)!;
            case ComponentOrigin.destination:
                return destinationList.find(f => f.uuid === draggableId)!;
            default:
                throw { message: 'Invalid site_component origin' }
        }
    }

    const reorder = (list: IDraggableComponent[], startIndex: number, endIndex: number): IDraggableComponent[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const copyToDestination = (draggableId: string, destinationIndex: number) => {
        const draggedComponent = getDraggedComponent(draggableId, ComponentOrigin.source);
        const newComponent = new DraggableComponent(
          draggedComponent.name,
          v4(),
          draggedComponent.content
        );

        destinationList.splice(destinationIndex, 0, newComponent);

        return destinationList;
    };

    const grid = 8;

    const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined, isClone: boolean): any => ({
        // display: isClone ? "none" : "block",

        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    const onDragStart = (result: any) => {
        /*
          draggableId: "c19feb3b-a627-4fb0-b8b2-46d033265703"
          mode: "FLUID"
          source: {droppableId: 'droppable-components', index: 0}
          type: "DEFAULT"
        */
        const { draggableId, source } = result;

        const draggedComponent = getDraggedComponent(draggableId, source.droppableId as ComponentOrigin);
        setStagedComponent(draggedComponent);
    }

    const onDragEnd = (result: any) => {
        /*
          combine: null
          destination: {droppableId: 'droppable-view', index: 1}
          draggableId: "5071f40d-fa82-4928-9574-6f31b88786bf"
          mode: "FLUID"
          reason: "DROP"
          source: {index: 0, droppableId: 'droppable-view'}
          type: "DEFAULT"
        */
        const { source, destination, draggableId } = result;

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        let items: IDraggableComponent[] = [];

        if (source.droppableId !== destination.droppableId) {
            items = copyToDestination(draggableId, destination.index);
        }
        else
            items = reorder(
              destinationList,
              result.source.index,
              result.destination.index
            );

        setDestinationList(items);
    }

    const onComponentClick = (item: IDraggableComponent) => {
        setStagedComponent(item);
        toggleDetails();
    }

    return (
        <AppContext.Provider value={{

            showDetails,
            toggleDetails,

            listData,
            fetchListData,

            stagedComponent,

            componentList,
            setComponentList,

            destinationList,

            getDraggedComponent,

            reorder,
            copyToDestination,

            getItemStyle,
            getListStyle,

            onDragStart,
            onDragEnd,

            onComponentClick
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useSiteContext(): ISiteContext {
    const context = useContext<ISiteContext>(AppContext);
    if (context === undefined) {
        throw new Error("useSiteContext must be within SiteContextProvider")
    }
    return context;
}
