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
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import VirtualList from "react-tiny-virtual-list";

// Component
import Item from "./Item";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const draftData = Array.from({ length: 100000 }).map((_, index) => ({
  id: index + 1,
  title: `Todo ${index + 1}`,
  descritpion: `Test Todo ${index + 1}`,
}));

const Examples = () => {
  const [list, setList] = useState(draftData);
  const [overId, setOverId] = useState(null);
  const [index, setIndex] = useState(0);
  const [activeData, setActiveData] = useState({});
  const [showArea, setShowArea] = useState({
    top: false,
    bottom: false,
  });

  const handleOnDragStart = (event: any) => {
    const { active, over } = event;

    const activedata = list.find((item) => item.id === active.id);
    if (activedata) {
      setActiveData(activedata);
    }

    // console.log("handleOnDragStart", event);
  };

  const handleOnDragMove = (event: any) => {
    // console.log("handleOnDragMove", event);

    const { active, over } = event;
    console.log({ event: active?.rect?.current?.translated?.top });
    if (!over) return;

    // Truonwgf hợp nếu kéo chính trong nó (trong over mới có vị trí )
    // if (active.id === over.id) {
    setOverId(over.id);
    // Tính giá trị trung tâm  của over(cũng là active)
    const centerOfOver = over?.rect?.rect?.height / 2;

    // Tính giá trị top của over(active)
    const topOfOver = over?.rect?.rect?.top;

    // Ta lấy top của active ban đầu
    // Lấy tọa độ y của active luc di chuyển
    // Trừ 2 cái này đi là ra khoảng cách kéo vưới thằng ban đầu rồi so sánh với vị trí ở giữa
    //console.log("move", active.rect.current.translated.top);
    //

    if (active?.rect?.current?.translated?.top - topOfOver < centerOfOver) {
      setShowArea({ top: true, bottom: false });
    } else {
      setShowArea({ top: false, bottom: true });
      setIndex(1);
    }
    // const mouseY = activatorEvent?.clientY - over?.rect?.rect?.top;
    // }
  };

  const handleOnDragEnd = (event: any) => {
    // console.log("handleOnDragEnd", event);

    const { active, over } = event;

    console.log("active", active);
    console.log("over", over);
    if (!over) return;

    // Tìm vị trí 2 phần tử kéo thả
    const activeIndex = list?.findIndex((item) => item?.id === active?.id);
    const overIndex = list?.findIndex((item) => item?.id === over?.id);

    let newList: any = [];

    if (activeIndex !== overIndex) {
      // Show top thì có 2 trường hợp (activeInde>overIndex và ngược lại)
      if (showArea.top) {
        if (activeIndex < overIndex) {
          newList = arrayMove(list, activeIndex, overIndex - 1);
        } else {
          newList = arrayMove(list, activeIndex, overIndex);
        }
      }

      if (showArea.bottom) {
        if (activeIndex < overIndex) {
          newList = arrayMove(list, activeIndex, overIndex);
        } else {
          newList = arrayMove(list, activeIndex, overIndex + 1);
        }
      }

      setList(newList);
    }

    setOverId(null);
    setIndex(0);
    setActiveData({});
    setShowArea({ top: false, bottom: false });
  };

  // Xử lí khi click không kéo mà vẫn chạy hàm handleOnDragEnd
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

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

  const mySensor = useSensors(pointerSensor);
  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragMove={handleOnDragMove}
      onDragEnd={handleOnDragEnd}
      sensors={mySensor}
    >
      <VirtualList
        width="100%"
        height={600}
        itemCount={list?.length}
        itemSize={110}
        renderItem={({ index, style }) => {
          const id = list[index].id;

          return (
            <div key={id} style={{ ...style }}>
              <Item item={list[index]} showArea={showArea} overId={overId} />
            </div>
          );
        }}
      />

      <DragOverlay
        dropAnimation={dropAnimation}
        modifiers={[restrictToWindowEdges]}
      >
        <Item item={activeData} />
      </DragOverlay>
    </DndContext>
  );
};

export default Examples;
