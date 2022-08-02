import { ChangeEvent } from "react";
import { useProductCreateContext, VariantFormChangeType } from "../../../contexts/ProductCreateContext";
import CheckInput from "../../form/CheckInput";
import GroupCard from "../../form/GroupCard";
import TextInput from "../../form/TextInput";


export default function ProductCreateVariant() {
  const { hasVariant,
          variants,
          variantHeaders,
          cartesionObjectList,

          togglHasVariant,
          addNewVariant,
          removeVariant,
          handleVariantFormChange,
          handleVariantValuesEnter,
          handleVariantValuesRemove,
        } = useProductCreateContext()
  return (
    <>
      <GroupCard title="Variant" description="This product has multiple options, like different sizes or colors">
        <CheckInput id='has_variant' label='Yes/No' value={hasVariant} onChange={togglHasVariant}/>
        <br />
        {hasVariant && (
          <>
            <button
              type="button"
              className="mt-3 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={addNewVariant}
            >+ Add Variant</button>
            <br />
            <br />
            {variants?.map((item) => (
              <div key={item.uuid}>
                <button
                  type="button"
                  className="float-right px-3 py-1 border border-gray-300 text-red-300 font-medium text-xs leading-tight uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={() => removeVariant(item)}
                >x</button>
                <div className="border border-x-1 mb-4 p-4 pt-6">
                  <TextInput
                    label='Variant name'
                    id={item.name.uuid}
                    value={item.name.val}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleVariantFormChange(e, VariantFormChangeType.NAME, item)}
                    />
                  <TextInput
                    label='Values here'
                    id={item.value.uuid}
                    value={item.value.val}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleVariantFormChange(e, VariantFormChangeType.VALUE, item)}
                    onKeyDown={(e: KeyboardEvent) => handleVariantValuesEnter(e, item)}
                    />
                  <ul className='flex flex-wrap'>
                    {item.value.items.map((value_item) => (
                      <li className='m-1' key={`${item.uuid}_${value_item}`}>
                        <button 
                          className="block rounded-full px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          onClick={(e: any) => handleVariantValuesRemove(e, item)}
                        >
                          {value_item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {variantHeaders.length > 0 &&
              <div className="flex flex-col">
                <span className='flex justify-center text-sm my-4'>
                  Curently has <span className='rounded-full text-xs outline outline-1 p-1 mx-3'>{cartesionObjectList.length}</span> variants
                </span>
              </div>
            }
          </>
          
        )}
      </GroupCard>
    </>
  )
}