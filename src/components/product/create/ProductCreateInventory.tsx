import { ChangeEvent } from "react";
import { ISelectItem, useProductCreateContext } from "../../../contexts/ProductCreateContext";
import GroupCard from "../../form/GroupCard";
import SelectInput from "../../form/SelectInput";
import TextInput from "../../form/TextInput";


export default function ProductCreateInventory() {
  const { locations,
          hasVariant,
          variantHeaders,
          cartesionObjectList,
          productQuantity,
          setProductQuantity,
          selectedLocation,
          setSelectedLocation,

          handleInventoryQuantity,
  } = useProductCreateContext();

  const handleProductQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductQuantity(Number(value) || 0)
  }

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLocation(value);
  }

  return (
    <>
      <GroupCard  title="Inventory" description="Stock information for this product on a specific location">
        <SelectInput 
          id='location'
          label='Location'
          value={selectedLocation}
          onChange={handleLocationChange}
          items={locations?.map<ISelectItem>(item => { return { key: item.uuid, value: item.name }})}
        />
        
        {!hasVariant && <TextInput id='quantity' label='Quantity' value={productQuantity} onChange={handleProductQuantityChange}/>}
        
        {(hasVariant && variantHeaders.length > 0) &&
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="border-y-2">
                      <tr>
                        {variantHeaders?.map((column) => (
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={column}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cartesionObjectList?.map((item) => (
                        <tr className="border-b" key={item.name} >
                          {variantHeaders?.map((column) => (
                            <>
                              {column === 'quantity' 
                              ? (<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <TextInput id='quantity' value={item.quantity} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInventoryQuantity(e, item)}/>
                                </td>)
                              : <td key={column} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{(item as any)[column]}</td>
                              }
                            </>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      </GroupCard>
    </>
  )
}