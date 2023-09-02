// Constant
import { ROUTER } from "constants/routers";
// Modules

import ToDay from "./Today";
import Inbox from "./Inbox";
import Project from "./Project";
import Examples from "./Examples";

export const routes = [
  {
    key: ROUTER.HOME.key,
    path: ROUTER.HOME.path,
    name: ROUTER.HOME.name,
    element: <ToDay />,
  },
  {
    key: ROUTER.TODAY.key,
    path: ROUTER.TODAY.path,
    name: ROUTER.TODAY.name,
    element: <ToDay />,
  },
  {
    key: ROUTER.INBOX.key,
    path: ROUTER.INBOX.path,
    name: ROUTER.INBOX.name,
    element: <Inbox />,
  },
  {
    key: ROUTER.PROJECT.key,
    path: ROUTER.PROJECT.path,
    name: ROUTER.PROJECT.name,
    element: <Project />,
  },

  {
    key: ROUTER.EXAMPLES.key,
    path: ROUTER.EXAMPLES.path,
    name: ROUTER.EXAMPLES.name,
    element: <Examples />,
  },
];
