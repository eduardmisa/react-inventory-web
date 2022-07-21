import { ChangeEvent } from "react";
import { useProductCreateContext } from "../../../contexts/product/ProductCreateContext";
import FileInput from "../../form/FileInput";
import GroupCard from "../../form/GroupCard";
import TextArea from "../../form/TextArea";
import TextInput from "../../form/TextInput";

export default function ProductCreateProfile() {
  const { 
          images,
          handleFileChange,
          productName,
          setProductName,
          productDescription,
          setDescription,
  } = useProductCreateContext()

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value)
  }

  const getImageBase64 = () => {
    return (images && images.length > 0) ? images[0].base64 : ''
  }

  return (
    <>
      <GroupCard title="Product profile" description="Basic information about this product">
        <img className="m-auto w-full h-96 md:h-auto object-cover md:w-48 rounded-t-sm md:rounded-none md:rounded-l-sm" src={getImageBase64()} alt="" />
        <div className="p-6 flex flex-col justify-start">
          <FileInput id='image' label='Product picture' onChange={handleFileChange} />
          <br />
          <TextInput id='name' label='Product name' value={productName} onChange={handleNameChange}/>
          <br />
          <TextArea id='description' label='Product description' value={productDescription} onChange={handleDescriptionChange}/>
        </div>
      </GroupCard>
    </>
  )
}