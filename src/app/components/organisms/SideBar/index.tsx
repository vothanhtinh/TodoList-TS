//Libary
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHover } from "usehooks-ts";

//Component
import HistorySearchItem from "../Header/components/HistorySearchItem";

// Constant
import { ROUTER } from "../../../../constants/routers";

// Context
import { useHeaderContext } from "context/HeaderContext";

// Styled
import { NavLinks, NavbarWrapper } from "./styled";

// Store
import { useGetDataInbox } from "app/queries/Inbox";
import { useGetDataToday } from "app/queries/Today";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProject from "app/components/molecules/AddProject";

export const SideBar: React.FC = React.memo(() => {
  const { active } = useHeaderContext();
  const { data: dataInboxs } = useGetDataInbox();
  const { data: dataTodays } = useGetDataToday();

  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
  };

  // get today from store
  const countToday = dataTodays?.filter((today) => today.status === 0).length;

  const countInbox = dataInboxs?.filter((inbox) => inbox.status === 0).length;

  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  // Add new project
  const [isClickAddProject, setIsClickAddProject] = useState(false);
  const onClickAddProject = () => {
    setIsClickAddProject(!isClickAddProject);
  };

  return (
    <>
      {active && (
        <NavbarWrapper ref={hoverRef}>
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
          <div className="flex justify-between mt-2 font-semibold h-9 text-gray-500 hover:bg-neutral-200 rounded items-center p-2 font-medium cursor-pointer ">
            <div>Project</div>
            {isHover && (
              <div>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="pr-2"
                  onClick={onClickAddProject}
                />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={rotated ? "rotate-90 transition" : ""}
                  onClick={handleClick}
                />
              </div>
            )}
          </div>
          {isClickAddProject && (
            <AddProject
              isClick={isClickAddProject}
              setIsClick={setIsClickAddProject}
            />
          )}
        </NavbarWrapper>
      )}
    </>
  );
});
