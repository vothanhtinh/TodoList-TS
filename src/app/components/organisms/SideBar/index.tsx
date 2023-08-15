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
        </NavbarWrapper>
      )}
    </>
  );
});
