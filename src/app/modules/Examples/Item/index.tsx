import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Item = (props: any) => {
  const { item, showArea, overId } = props;

  //   console.log("showArea", showArea);
  const { attributes, listeners, setNodeRef, transform, isDragging, isOver } =
    useSortable({
      id: item.id,
    });
  const DdnKitCardStyles = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? "1" : undefined,
    border: isDragging ? "1px solid #66FF33" : undefined,
  };

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={DdnKitCardStyles}
        {...attributes}
        {...listeners}
        className="mt-4"
      >
        {showArea?.top && overId === item.id && (
          <div className="bg-blue-500 h-2 w-full mt-1 rounded-md absolute -top-4"></div>
        )}
        <div className="px-3  h-24 border border-gray-400">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </div>
      {showArea?.bottom && overId === item?.id && (
        <div className="bg-blue-500 h-2 w-full  mt-1 rounded-md absolute -bottom-2"></div>
      )}
    </div>
  );
};

export default Item;
