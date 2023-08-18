import Cart from "./Cart";

const ListCart = (props: any) => {
  const { cards, columnId, showArea, overId } = props;

  return (
    <div>
      {cards?.map((card: any, index: number) => (
        <div>
          {showArea?.top && overId === card._id && (
            <div className="bg-blue-500 h-2 w-full mt-1 rounded-md"></div>
          )}
          <Cart
            key={card._id}
            card={card}
            columnId={columnId}
            showArea={showArea}
          />
          {showArea?.bottom && overId === card._id && (
            <div className="bg-blue-500 h-2 w-full mt-1 rounded-md"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListCart;
