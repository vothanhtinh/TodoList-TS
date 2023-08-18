import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Cart = (props: any) => {
  const { card, columnId, showArea } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: card._id, data: { ...card, columnId } });

  const DdnKitCardStyles = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? "0.5" : undefined,
    border: isDragging ? "1px solid #66FF33" : undefined,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={DdnKitCardStyles}
        {...attributes}
        {...listeners}
        className="mt-2 bg-white p-2 rounded-md w-72"
      >
        <div>
          <img src={card.cover} />
        </div>
        <p>{card.title}</p>
      </div>
    </>
  );
};

export default Cart;
