// Libraries
import styled from "styled-components";

export const BlockStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 35px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;

  .hide {
    display: none;
  }

  .show {
    display: block;
  }

  &:hover {
    cursor: pointer;
    .hide {
      display: none;
    }

    .show {
      display: block;
      margin-left: -30px;
    }
  }
`;

export const LeftStyle = styled.div`
  display: flex;
  align-items: center;
  span {
    padding-left: 5px;
  }
`;
export const RightStyle = styled.div`
  margin-right: -30px;
  align-items: center;
  display: flex;
`;
