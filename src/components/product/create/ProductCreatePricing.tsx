import { ChangeEvent } from "react";
import { useProductCreateContext } from "../../../contexts/ProductCreateContext";
import GroupCard from "../../form/GroupCard";
import TextInput from "../../form/TextInput";

export default function ProductCreatePricing() {
  const { price,
          setPrice,
  } = useProductCreateContext()
  
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(Number(value) || 0)
  }

  return (
    <>
      <GroupCard  title="Pricing" description="Price details for this product">
        <TextInput id='price' label='Base Price' onChange={handlePriceChange} value={price}/>
      </GroupCard>
    </>
  )
}