import { useEffect, useState } from "react";
import { useServiceFactoryContext } from "../../contexts/ServiceFactoryContext";
import AuthorizedLayout from "../../layouts/AuthorizedLayout"
import { ICollectionListResponse, ICollectionInfo } from "../../_api/CollectionApi";
import SideInfo from "./SideInfo";

function Collection() {
  const { serviceFactory } = useServiceFactoryContext();
  const collectionService = serviceFactory.collectionService;

  const [listData, setListData] = useState<ICollectionListResponse>();
  const fetchListData = async () => {
    try {
      const data = await collectionService.list();
      setListData(data);
      
    } catch (error) {
      alert('failed to get list data');
    }
  }

  const getHeaders = (): string[] => {
    const obj: ICollectionInfo = {
      uuid: '',
      name: '',
      image: '',
      parent_collection_id: '',
    }
    return Object.keys(obj)
  }

  const [locationUuid, setlocationUuid] = useState<string>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const toggleDetails = (selectedLocationUuid?: string) => {
    setlocationUuid(selectedLocationUuid);
    setShowDetails(!showDetails);
  }

  useEffect(() => {
    fetchListData().then()
  }, [])

  return (
    <>
      <SideInfo
        show={showDetails}
        toggle={toggleDetails}
        detailUuid={locationUuid}
        formSchema={getHeaders()}
        fetchListData={fetchListData}
        service={collectionService}
        />

      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
        <div className="content-center mb-5">
          <span className="text-5xl text-indigo-100 font-bold">Collections | </span>
          <button className="text-5xl text-indigo-100 font-medium hover:underline" onClick={() => toggleDetails(undefined)}>+new</button>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      {getHeaders().map((column) => (
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={column}>
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {listData?.data.map((item) => (
                      <tr className="border-b" key={item.name} >
                        {getHeaders().map((column) => {
                          if (column === 'uuid')
                            return (
                              <td key={column} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900 hover:underline hover:cursor-pointer" onClick={() => toggleDetails(item.uuid)}>{item.uuid}</td>
                            )
                          else
                            return (
                              <td key={column} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{(item as any)[column]}</td>
                            )
                        })}
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

export default AuthorizedLayout(Collection)
