import {
  BoxContent,
  ColumnContentStyle,
  ColumnHeaderStyle,
  ColumnStyle,
} from "./styled";
import ListCart from "./ListCart";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Columns = (props: any) => {
  const { column, showArea, overId } = props;
  // const columnItems = data?.column;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    transition,
  } = useSortable({ id: column?._id, data: { ...column } });

  const DdnKitClumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? "0.5" : undefined,
    height: "100%",
  };

  return (
    // <DndContext>
    <div
      ref={setNodeRef}
      style={DdnKitClumnStyles}
      {...listeners}
      {...attributes}
    >
      <BoxContent>
        <ColumnStyle>
          <ColumnHeaderStyle>{column?.title}</ColumnHeaderStyle>
          <ColumnContentStyle>
            <ListCart
              cards={column?.cards}
              columnId={column._id}
              showArea={showArea}
              overId={overId}
            />
          </ColumnContentStyle>
        </ColumnStyle>
      </BoxContent>
    </div>
    // </DndContext>
  );
};

export default Columns;
