import { ChangeEvent } from "react";
import { ISelectItem, useProductCreateContext } from "../../../contexts/ProductCreateContext";
import GroupCard from "../../form/GroupCard";
import SelectInput from "../../form/SelectInput";


export default function ProductCreateOrganization() {
  const {
    vendors,
    selectedVendor,
    setSelectedVendor,

    categories,
    selectedCategory,
    setSelectedCategory
  } = useProductCreateContext()

  const handleVendorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedVendor(value);
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
  }

  return (
    <>
      <GroupCard title="Organization" description="Product category and vendor information">
        <SelectInput
          id='vendor'
          label='Vendor'
          value={selectedVendor}
          onChange={handleVendorChange}
          items={vendors?.map<ISelectItem>(item => { return { key: item.uuid, value: item.name }})}/>
        <br />
        <SelectInput 
          id='category'
          label='Category'
          value={selectedCategory}
          onChange={handleCategoryChange}
          items={categories?.map<ISelectItem>(item => { return { key: item.uuid, value: item.name }})}/>
      </GroupCard>
    </>
  )
}