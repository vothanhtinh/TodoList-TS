import Columns from "../Columns";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const ListColumns = (props: any) => {
  const { columns, showArea, overId } = props;

  // SortableContext yêu cầu dạng ['id-1','id-2']
  //  Nếu không đúng thì vẫn kéo thả được nhưng không có animation

  return (
    <>
      <SortableContext
        items={columns?.map((c: any) => c._id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-flow-col gap-2.5 mt-5 overflow-x-scroll">
          {columns?.map((column: any, index: number) => (
            <Columns
              key={column?._id}
              column={column}
              showArea={showArea}
              overId={overId}
            />
          ))}
        </div>
      </SortableContext>
    </>
  );
};

export default ListColumns;
