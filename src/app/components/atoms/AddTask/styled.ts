// Libraries
import { styled } from "styled-components";

export const Text = styled.span`
  color: #808080;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  padding-left: 5px;
`;
export const StyleIcon = styled.span`
  border-radius: 50%;
  color: #db4c3f;
  padding: 3px 6px;
  margin-right: 5px;
  font-size: 14px;
  text-align: center;
  align-items: center;
`;

export const StyleButton = styled.button`
  width: 90%;
  text-align: left;
  outline: none;
  background: none;
  border: none;
  padding: 6px 0 0 5px;
  &:hover ${Text} {
    color: #db4c3f;
  }
  &:hover ${StyleIcon} {
    color: #ffffff;
    background-color: #db4c3f;
  }
  &:hover {
    cursor: pointer;
  }
`;
