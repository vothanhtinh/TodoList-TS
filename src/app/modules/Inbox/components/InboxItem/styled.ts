// Libraries
import styled from "styled-components";

export const BlockStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 56px;
  margin-bottom: 10px;
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

export const StyleText = styled.div`
  padding-left: 5px;
  font-size: 14px;
  .des {
    font-size: 12px;
    opacity: 0.7;
  }
`;
