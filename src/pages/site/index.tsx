import {ReactNode, useEffect} from "react";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import SideInfo from "./SideInfo";
import {ComponentOrigin, DraggableComponent, useSiteContext} from "../../contexts/site/SiteContext";
import ComponentItem from "./ComponentItem";

// const Item = styled.div`
//     display: flex;
//     user-select: none;
//     padding: 0.5rem;
//     margin: 0 0 0.5rem 0;
//     align-items: flex-start;
//     align-content: flex-start;
//     line-height: 1.5;
//     border-radius: 3px;
//     background: #fff;
//     border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
// `;
//
// const Clone = styled(Item)`
//     + div {
//         display: none !important;
//     }
// `;

function Site() {
  const {
    fetchListData,
    componentList,
    setComponentList,
    destinationList,

    getItemStyle,
    getListStyle,

    onDragStart,
    onDragEnd,

    onComponentClick
  } = useSiteContext();



  useEffect(() => {
    fetchListData();

    setComponentList([
      new DraggableComponent("comp1"),
      new DraggableComponent("comp2"),
      new DraggableComponent("comp3"),
      new DraggableComponent("comp4"),
      new DraggableComponent("comp5"),
    ])
  }, [])

  return (
    <>
      <SideInfo/>

      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6">
        <div className="content-center mb-5">
          <span className="text-5xl text-indigo-100 font-bold">Site editor</span>
        </div>

        <div>
          <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="default-toggle" className="sr-only peer"/>
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable translations</span>
          </label>
        </div>

        <br/>

        <div className="flex flex-row justify-evenly">

          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

            <div className="flex flex-col mx-1">
              <h1 className="text-xl underline mb-3">Components</h1>
              <div className="flex flex-col justify-around">
                <Droppable droppableId={ComponentOrigin.source} isDropDisabled={true}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        // className="absolute top-0 left-0 bottom-0 w-56"
                      >
                        {componentList.map((item, index) => (
                          <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                            {(provided, snapshot) => (
                              <>
                                <ComponentItem provided={provided}  snapshot={snapshot}>
                                  {item.name}
                                </ComponentItem>
                                {/*{snapshot.isDragging && (*/}
                                {/*  <ComponentItem provided={provided}  snapshot={snapshot} isClone={true}>*/}
                                {/*    {item.name}*/}
                                {/*  </ComponentItem>*/}
                                {/*)}*/}
                              </>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
              </div>
            </div>

            <div className="flex flex-col mx-1">
              <h1 className="text-xl underline mb-3">View</h1>
              <div className="h-96 w-96 border border-dotted">
                <Droppable droppableId={ComponentOrigin.destination}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {destinationList.map((item, index) => (
                          <Draggable key={item?.uuid} draggableId={item?.uuid} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                  false
                                )}
                                onClick={() => onComponentClick(item)}
                              >
                                {item?.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
              </div>
            </div>

          </DragDropContext>

          {/*<div className="flex flex-col mx-1">*/}
          {/*  <h1 className="text-xl underline mb-3">CDN</h1>*/}

          {/*  <div className="h-96 w-24 border border-dotted">*/}

          {/*  </div>*/}

          {/*</div>*/}
          {/*<div className="flex flex-col mx-1">*/}
          {/*  <h1 className="text-xl underline mb-3">Data</h1>*/}

          {/*  <div className="border border-dotted p-2">*/}
          {/*    {listData?.data.map(item => <>*/}
          {/*      <div key={item.uuid}>*/}
          {/*        <span>{`DataGroup1`}</span> <b> : </b> <span>{item.name}</span>*/}
          {/*      </div>*/}
          {/*    </>)}*/}

          {/*  </div>*/}

          {/*</div>*/}
          {/*<div className="flex flex-col mx-1">*/}
          {/*  <h1 className="text-xl underline mb-3">Filter set</h1>*/}

          {/*  <div className="h-96 w-56 border border-dotted">*/}

          {/*  </div>*/}

          {/*</div>*/}
        </div>
      </div>
    </>
  )
}

export default AuthorizedLayout(Site)
