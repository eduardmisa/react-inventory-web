import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceFactoryContext } from "../../contexts/ServiceFactoryContext";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import { IInventoryInfo, IInventoryListResponse } from "../../_api/InventoryApi";

function InventoryBoard() {
  const { serviceFactory } = useServiceFactoryContext();
  const inventoryService = serviceFactory.inventoryService;

  const navigate = useNavigate();

  const createNewPreoduct = () => {
    navigate('create')
  }

  const [listData, setListData] = useState<IInventoryListResponse>();
  const fetchListData = async () => {
    try {
      const data = await inventoryService.list();
      setListData(data);
      
    } catch (error) {
      alert('failed to get list data');
    }
  }

  const getHeaders = (): string[] => {
    const obj: IInventoryInfo = {
      uuid: '',
      location_id: '',
      product_id: '',
      variant_id: '',
      image: '',
      sku: '',
      serial_number: '',
      quantity: 0,
    }
    return Object.keys(obj)
  }

  const [inventoryUuid, setInventoryUuid] = useState<string>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const toggleDetails = (selectedInventoryUuid?: string) => {
    setInventoryUuid(selectedInventoryUuid);
    setShowDetails(!showDetails);
  }

  useEffect(() => {
    fetchListData();
  }, [])

  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
        <div className="content-center mb-5">
          <span className="text-5xl text-indigo-100 font-bold">Inventories | </span>
          <button className="text-5xl text-indigo-100 font-medium hover:underline" onClick={createNewPreoduct}>+new</button>
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
                          SKU
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Serial
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Quantity
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData?.data.map((item) => (
                      <tr className="border-b" key={item.uuid} >
                        <td className="text-sm text-gray-900 font-light whitespace-nowrap py-2">
                          <img
                            className="h-15 w-auto sm:h-10 m-auto"
                            src={item.image}
                            alt=""
                          />
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.sku}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.serial_number}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.quantity}</td>
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

export default AuthorizedLayout(InventoryBoard)
