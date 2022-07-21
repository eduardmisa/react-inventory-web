import {ReactNode} from "react";
import {useSiteContext} from "../../contexts/site/SiteContext";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";

interface Props {
  children: ReactNode;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  isClone?: boolean;
  [key: string]: any;
}

const ComponentItem = (props: Props) => {
  const {children, provided, snapshot, isClone = false} = props
  const { getItemStyle } = useSiteContext();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style,
        isClone
      )}
    >
      {children}
    </div>
  )
}

export default ComponentItem;
