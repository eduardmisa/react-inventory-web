import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceFactoryContext } from "../../contexts/ServiceFactoryContext";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import { IProductListResponse } from "../../_api/ProductApi";

function ProductBoard() {
  const { serviceFactory } = useServiceFactoryContext();
  const productService = serviceFactory.productService;

  const navigate = useNavigate();

  const createNewProduct = () => {
    navigate('create')
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

  useEffect(() => {
    fetchListData().then();
  }, [])

  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
        <div className="content-center mb-5">
          <span className="text-5xl text-indigo-100 font-bold">Products | </span>
          <button className="text-5xl text-indigo-100 font-medium hover:underline" onClick={createNewProduct}>+new</button>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                          Image
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Name
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Description
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Has variant
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData?.data.map((item) => (
                      <tr className="border-b" key={item.name} >
                        <td className="text-sm text-gray-900 font-light whitespace-nowrap py-2">
                          <img
                            className="h-15 w-auto sm:h-10 m-auto"
                            src={item.image}
                            alt=""
                          />
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.description}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.has_variant ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthorizedLayout(ProductBoard)
