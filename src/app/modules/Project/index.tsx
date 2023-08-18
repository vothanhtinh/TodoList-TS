import { mockData } from "apis/mock-data";
import _ from "lodash";
import ListColumns from "./components/ContentProject";
import {
  DndContext,
  DragOverlay,
  DropAnimation,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { mapOrder } from "utils/sort";
import { arrayMove } from "@dnd-kit/sortable";
import Columns from "./components/Columns";
import Cart from "./components/Columns/ListCart/Cart";
const ACTIVE_DRAG_TYPE = {
  COLUMN: "ACTIVE_DRAG_COLUMN",
  CART: "ACTIVE_DRAG_CART",
};

const Project = () => {
  const board = mockData.board;

  const [orderColumns, setOrderColumn] = useState(
    mapOrder(board?.columns, board?.columnOrderIds, "_id")
  );

  const [list, setList] = useState([]);

  const findColumnByCardId = (cardId: any) => {
    const columnCardId = orderColumns.find((column) => {
      const card = column.cards.find((card: any) => card._id == cardId);
      if (card) {
        return card.columnId;
      }
    });
    const column = orderColumns.find((c) => c._id === columnCardId._id);
    return column;
  };

  // Cùng 1 thời điểm chỉ có 1 phần tử đưcọ kéo (column hoặc card)
  const [activeId, setActiveId] = useState(null);
  const [activeItemType, setActiveItemType] = useState("");
  const [activeItemData, setActiveItemData] = useState<any>([]);
  const [oldDataDragColumn, setOldDataDragColumn] = useState<any>();
  const [overId, setOverId] = useState(null);
  const [showArea, setShowArea] = useState({
    top: false,
    bottom: false,
  });

  useEffect(() => {
    setOrderColumn(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleOnDragStart = (event: any) => {
    // console.log("handleOnDragStart", event);
    const { active } = event;

    setActiveId(active?.id);
    setActiveItemType(
      active?.data?.current?.columnId
        ? ACTIVE_DRAG_TYPE.CART
        : ACTIVE_DRAG_TYPE.COLUMN
    );
    setActiveItemData(active?.data?.current);
    if (active?.data?.current?.columnId) {
      setOldDataDragColumn(findColumnByCardId(active?.id));
    }
  };

  const handleOnDragOver = (event: any) => {
    // Không làm gì khi kéo column
    if (activeItemType === ACTIVE_DRAG_TYPE.COLUMN) return;

    // Nếu kéo card thì xử lí thêm
    const { active, over, activatorEvent } = event;
    setOverId(over?.id);

    // Kiểm tra khi over không có hoặc kéo ngoài vùng
    if (!active || !over) return;

    // Lấy tọa độ y của con trỏ chuột trong khoảng over
    const mouseY = activatorEvent?.clientY - over?.rect?.rect?.top;

    // Tính giá trị trung tâm  của over
    const centerOfOver = over?.rect?.rect?.height / 2;

    // So sánh vị trí của con trỏ chuột với trung tâm của over
    if (mouseY > centerOfOver) {
      setShowArea({
        top: true,
        bottom: false,
      });
    } else {
      setShowArea({
        top: false,
        bottom: true,
      });
    }

    // activeDragCardId: card đươc kéo
    // overCardId: card đươc thả
    const {
      id: activeDragCardId,
      data: { current: activeDragCardData },
    } = active;
    const { id: overCardId } = over;

    // Timf 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDragCardId);
    const overColumn = findColumnByCardId(overCardId);

    // Nếu như không tồn tại 1 trong 2 column thì không làm gì cả
    if (!activeColumn || !overColumn) return;

    // Xử lí khi kéo card vào 2 cột khác nhau còn khi trùng cột thì không xử lí gì
    if (activeColumn?._id !== overColumn?._id) {
      setOrderColumn((prev: any) => {
        // Tìm index của overCard trong column sắp được thả
        const cardOverIndex = overColumn?.cards?.findIndex(
          (card: any) => card._id === overCardId
        );
        // tìm vị trí mới khi nó được thả
        let newIndex;
        const isBelowOverItem =
          over &&
          active?.rect.current.translated &&
          active.rect.current.translated?.top >
            over.rect?.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex =
          cardOverIndex >= 0
            ? cardOverIndex + modifier
            : cardOverIndex.length + 1;
        const nextColumns = _.cloneDeep(prev);
        const nextActiveColumn = nextColumns.find(
          (column: any) => column._id === activeColumn._id
        );
        const nextOverColumn = nextColumns.find(
          (column: any) => column._id === overColumn._id
        );
        if (nextActiveColumn) {
          // Xóa card từ colum cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card: any) => card._id !== activeDragCardId
          );
          // Cập nhật lại order
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card: any) => card._id
          );
          if (nextActiveColumn) {
            // Kiểm tra card đang kéo có ở column chưa. Nếu có thì xóa nó
            nextOverColumn.cards = nextOverColumn.cards.filter(
              (card: any) => card._id !== activeDragCardId
            );
            // Thêm cái đang kéo vào cái overColumns
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(
              newIndex,
              0,
              activeDragCardData
            );
            // Cập nhật lại vị trí cho overColumns
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
              (card: any) => card._id
            );
          }
          return nextColumns;
          // nextA;
        }
      });
    }
  };

  // Khi kết thúc hành động drag (kéo)
  const handleOnDragEnd = (event: any) => {
    const { active, over } = event;
    // console.log("active", active);
    // console.log("over", over);

    // Check over null
    if (!over) return;

    // Xử lí khi kéo thả CARD
    if (activeItemType === ACTIVE_DRAG_TYPE.CART) {
      const {
        id: activeDragCardId,
        data: { current: activeDragCardData },
      } = active;
      const { id: overCardId } = over;

      // Timf 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDragCardId);
      const overColumn = findColumnByCardId(overCardId);

      // console.log("overCardId", overCardId);
      // console.log("activeDragCardData", activeDragCardData);
      // console.log("activeColumn", activeColumn);
      // console.log("overColumn", overColumn);
      // console.log("oldDataDragColumn", oldDataDragColumn);

      // Nếu như không tồn tại 1 trong 2 column thì không làm gì cả
      if (!activeColumn || !overColumn) return;

      if (oldDataDragColumn?._id === overColumn?._id) {
        // lấy vị trí cũ (từ overColumn)
        const oldIndex =
          oldDataDragColumn?.cards?.findIndex(
            (c: any) => c?._id === activeId
          ) ?? -1;

        // lấy vị trí mới (từ overColumn)
        const newIndex =
          oldDataDragColumn?.cards?.findIndex(
            (c: any) => c?._id === overCardId
          ) ?? -1;

        const dndOrderArray = arrayMove(
          oldDataDragColumn.cards,
          oldIndex,
          newIndex
        );

        setOrderColumn((prev: any) => {
          // Clone mảng cũ để xử lý data
          const nextColumn = _.cloneDeep(prev);
          // Tìm tới column đang thả
          const targetColumn = nextColumn.find(
            (c: any) => c._id === overColumn._id
          );

          targetColumn.cards = dndOrderArray;
          targetColumn.cardOrderIdx = targetColumn.cards.map((c: any) => c._id);

          return nextColumn;
        });
      } else {
        setOrderColumn((prev: any) => {
          // Tìm index của overCard trong column sắp được thả
          const cardOverIndex = overColumn?.cards?.findIndex(
            (card: any) => card._id === overCardId
          );

          // tìm vị trí mới khi nó được thả
          let newIndex;
          const isBelowOverItem =
            over &&
            active?.rect?.current?.translated &&
            active?.rect?.current?.translated?.top >
              over?.rect?.top + over?.rect?.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            cardOverIndex >= 0
              ? cardOverIndex + modifier
              : cardOverIndex?.length + 1;

          const nextColumns = _.cloneDeep(prev);
          const nextActiveColumn = nextColumns.find(
            (column: any) => column._id === activeColumn._id
          );
          const nextOverColumn = nextColumns.find(
            (column: any) => column._id === overColumn._id
          );

          if (nextActiveColumn) {
            // Xóa card từ colum cũ
            nextActiveColumn.cards = nextActiveColumn.cards.filter(
              (card: any) => card._id !== activeDragCardId
            );

            // Cập nhật lại order
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
              (card: any) => card._id
            );

            if (nextActiveColumn) {
              // Kiểm tra card đang kéo có ở column chưa. Nếu có thì xóa nó
              nextOverColumn.cards = nextOverColumn.cards.filter(
                (card: any) => card._id !== activeDragCardId
              );

              // Thêm cái đang kéo vào cái overColumns
              nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                newIndex,
                0,
                activeDragCardData
              );
              // Cập nhật lại vị trí cho overColumns

              nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                (card: any) => card._id
              );
            }

            return nextColumns;
            // nextA;
          }
        });
      }
    }
    // Xử lí kéo thả columns
    if (activeItemType === ACTIVE_DRAG_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Tìm vị trí cũ
        const oldIndex = orderColumns.findIndex(
          (column) => column._id === active.id
        );

        // Vị trí mới khi kéo đến
        const newIndex = orderColumns.findIndex(
          (column) => column._id === over.id
        );
        // Dùng arrayMove của dnd kit để sắp xếp lại mảng ban đầu
        const orderArr = arrayMove(orderColumns, oldIndex, newIndex);
        // console.log(orderArr);
        setOrderColumn(orderArr);
      }
    }

    // Set lại dữ liệu
    setActiveId(null);
    setActiveItemData(null);
    setActiveItemType("");
    setOldDataDragColumn(null);
    setOverId(null);
    setShowArea({
      top: false,
      bottom: false,
    });
  };

  // Xử lí khi click không kéo mà vẫn chạy hàm handleOnDragEnd
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mySensor = useSensors(pointerSensor);

  // Xử lí hiệu ứng khi thả
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragEnd={handleOnDragEnd}
      collisionDetection={closestCorners}
      onDragStart={handleOnDragStart}
      onDragOver={handleOnDragOver}
      sensors={mySensor}
    >
      <div className=" w-full ">
        <ListColumns
          columns={orderColumns}
          showArea={showArea}
          overId={overId}
        />
        <DragOverlay
          dropAnimation={dropAnimation}
          modifiers={[restrictToWindowEdges]}
        >
          {!activeItemType && null}
          {activeItemType === ACTIVE_DRAG_TYPE.COLUMN && (
            <Columns column={activeItemData} />
          )}
          {activeItemType === ACTIVE_DRAG_TYPE.CART && (
            <Cart card={activeItemData} />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Project;
