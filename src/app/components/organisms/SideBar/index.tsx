//Libary
import React, { useState } from "react";
import { Link } from "react-router-dom";

//Component
import HistorySearchItem from "../Header/components/HistorySearchItem";

// Constant
import { ROUTER } from "../../../../constants/routers";

// Context
import { useHeaderContext } from "context/HeaderContext";

// Styled
import { NavLinks, NavbarWrapper } from "./styled";

// Store
import { useSelector } from "react-redux";
import { selectTodays } from "store/todaySlice/todaySlice";
import { selectInboxs } from "store/inboxSlice/selector";
import { useGetDataInbox } from "app/queries/Inbox";
import { useGetDataToday } from "app/queries/Today";
import Menu from "app/components/molecules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const initialItems: any = [
  {
    id: "Home",
    children: [],
  },
  {
    id: "Collections",
    children: [
      { id: "Spring", children: [] },
      { id: "Summer", children: [] },
      { id: "Fall", children: [] },
      { id: "Winter", children: [] },
    ],
  },
  {
    id: "About Us",
    children: [],
  },
  {
    id: "My Account",
    children: [
      { id: "Addresses", children: [] },
      { id: "Order History", children: [] },
    ],
  },
];

export const SideBar: React.FC = React.memo(() => {
  const { active } = useHeaderContext();
  const { data: dataInboxs } = useGetDataInbox();
  const { data: dataTodays } = useGetDataToday();

  const [dataMenu, setDataMenu] = useState(initialItems);

  // get today from store
  const countToday = dataTodays?.filter((today) => today.status === 0).length;

  const countInbox = dataInboxs?.filter((inbox) => inbox.status === 0).length;

  const toggleSubMenu = (index: any) => {
    const newDataMenu = [...dataMenu];
    newDataMenu[index].showChildren = !newDataMenu[index].showChildren;
    setDataMenu(newDataMenu);
  };

  const handleOnDragEnd = (event: any) => {
    console.log("handleOnDragEnd", event);
  };

  return (
    <>
      {active && (
        <NavbarWrapper>
          <NavLinks>
            <Link to={ROUTER.INBOX.path}>
              <HistorySearchItem
                title={"Inbox"}
                icon={"https://cdn-icons-png.flaticon.com/128/1161/1161728.png"}
                sub={countInbox && countInbox > 0 ? countInbox.toString() : ""}
              />
            </Link>
            <Link to={ROUTER.TODAY.path}>
              <HistorySearchItem
                title={"Today"}
                icon={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSIGszzGbT2oU25LxT3-9U-9pUd8eFAubFQQ&usqp=CAU"
                }
                sub={countToday && countToday > 0 ? countToday.toString() : ""}
              />
            </Link>
          </NavLinks>
          <DndContext onDragEnd={handleOnDragEnd}>
            <div className="p-4">
              <div className="p-3 bg-white">
                <SortableContext
                  items={["2", "3"]}
                  strategy={verticalListSortingStrategy}
                >
                  {dataMenu.map((item: any, index: any) => (
                    <div key={item.id} className="flex items-start flex-col">
                      <div className="flex border border-solid border-gray-100 p-3 w-52">
                        <svg viewBox="0 0 20 20" width="12" className="mr-4">
                          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                        </svg>
                        <button
                          className="focus:outline-none "
                          onClick={() => toggleSubMenu(index)}
                        >
                          {item.children.length !== 0 && (
                            <svg
                              width="10"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 70 41"
                              className={`mr-3 ${
                                item.showChildren ? "transform rotate-180" : ""
                              }`}
                            >
                              <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z"></path>
                            </svg>
                          )}
                        </button>
                        {item.id}
                      </div>
                      {item.showChildren && (
                        <ul className="list-disc ml-6 pl-2 list-none">
                          {item.children.map((subitem: any) => (
                            <li
                              key={subitem.id}
                              className="flex  text-gray-600 border border-solid border-gray-100 p-2 w-40"
                            >
                              <svg
                                viewBox="0 0 20 20"
                                width="12"
                                className="mr-4"
                              >
                                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                              </svg>
                              {subitem.id}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </SortableContext>
              </div>
            </div>
          </DndContext>
        </NavbarWrapper>
      )}
    </>
  );
});
