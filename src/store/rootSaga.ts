import { all } from "redux-saga/effects";
import { todaySaga } from "./todaySlice/saga";
import { inboxSaga } from "./inboxSlice/saga";

export default function* rootSaga() {
  console.log("root saga");
  yield all([...todaySaga, ...inboxSaga]);
}
