import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { StyleLoading } from "./styled";

export default function Loading() {
  return (
    <StyleLoading>
      <CircularProgress disableShrink />
    </StyleLoading>
  );
}
