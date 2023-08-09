import { useDrop } from "react-dnd";
import { BlockEmtyStyle } from "./styled";
import React from "react";

interface AddBlockEmptyProps extends React.HtmlHTMLAttributes<HTMLElement> {
  isShow: boolean;
}

type Ref = typeof HTMLDivElement;

const AddBlockEmpty = React.forwardRef<any, AddBlockEmptyProps>(
  (props, ref) => {
    const { isShow, ...rest } = props;
    return <BlockEmtyStyle $isShow={isShow} ref={ref} {...rest} />;
  }
);

export default AddBlockEmpty;
