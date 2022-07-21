import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import SideInfo from "./SideInfo";
import {useSiteComponentContext} from "../../contexts/site_component/SiteComponentContext";

function Site() {
  const { } = useSiteComponentContext();

  return (
    <>
      <SideInfo/>

      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
        <div className="content-center mb-5">
          <span className="text-5xl text-indigo-100 font-bold">Component editor</span>
        </div>

        <div className="flex flex-row justify-evenly">

          <div className="flex flex-col mx-1">
            <h1 className="text-xl underline mb-3">CDN</h1>

            <div className="h-96 w-24 border border-dotted">

            </div>

          </div>
          <div className="flex flex-col mx-1">
            <h1 className="text-xl underline mb-3">Data</h1>

            <div className="border border-dotted p-2">

            </div>

          </div>
          <div className="flex flex-col mx-1">
            <h1 className="text-xl underline mb-3">Filter set</h1>

            <div className="h-96 w-56 border border-dotted">

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AuthorizedLayout(Site)
