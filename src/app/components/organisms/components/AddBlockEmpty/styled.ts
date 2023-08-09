import styled from "styled-components";

export const BlockEmtyStyle = styled.div<{ $isShow: boolean }>`
  border: 1px dashed blue;
  background-color: aliceblue;
  /* padding: 20px 100px; */
  transition: all 200ms;

  ${(props) => {
    return props.$isShow
      ? `height: 56px; opacity: 1;`
      : `height: 0px; opacity: 0;`;
  }}
`;
