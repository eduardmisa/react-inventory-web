import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import ProductCreateProfile from '../../components/product/create/ProductCreateProfile';
import ProductCreateOrganization from '../../components/product/create/ProductCreateOrganization';
import ProductCreatePricing from '../../components/product/create/ProductCreatePricing';
import ProductCreateVariant from '../../components/product/create/ProductCreateVariant';
import ProductCreateInventory from '../../components/product/create/ProductCreateInventory';
import { useProductCreateContext } from '../../contexts/product/ProductCreateContext';
import { useEffect } from "react";
import GroupCard from "../../components/form/GroupCard";
import { useNavigate } from "react-router-dom";

function ProductCreate() {

  const navigate = useNavigate()

  const { 
    fetchVendors,
    fetchCategories,
    fetchLocations,
    SUBMIT
  } = useProductCreateContext();

  const handleSubmit = async () => {
    const response = await SUBMIT();
    if (response.code !== 201 && response.code !== 200) {
      alert(response.message)
      return;
    }
    else {
      alert('Successfully created!')
      navigate('/products')
    }
  }

  useEffect(() => {
    fetchVendors();
    fetchCategories();
    fetchLocations();
  }, [])

  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-5 m-auto">
          <span className="text-5xl text-indigo-100 font-bold">Create Product</span>
        </div>
      </div>

      <div className="flex flex-col justify-center md:flex-row">
        <div className="flex flex-col items-stretch">
          <div className="m-5">
            <ProductCreateProfile/>
          </div>
          <div className="m-5">
            <ProductCreateVariant/>
          </div>
          <div className="m-5">
            <ProductCreateInventory/>
          </div>
        </div>

        <div className="flex flex-col items-stretch">
          <div className="m-5">
            <ProductCreateOrganization/>
          </div>
          <div className="m-5">
            <ProductCreatePricing/>
          </div>
        </div>
      </div>

      <br />
      <br />
      <GroupCard title="Submit form" description="Will create new product">
        <button onClick={handleSubmit} className="m-auto border-2 border-green-700 text-green-700 p-3 rounded-full">
          Submit
        </button>
      </GroupCard>
      <br />
      <br />
    </>
  )
}

export default AuthorizedLayout(ProductCreate)
