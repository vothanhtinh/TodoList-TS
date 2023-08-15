// Libraries
import { Button } from "@mui/material";
import { styled } from "styled-components";

export const DropButtonStyle = styled.div`
  position: absolute;
  left: -6px;
  top: 15px;
  display: none;
  &:hover {
    display: block !important;
  }
`;
export const Item = styled.li`
  margin-left: -30px;
  padding-left: 30px;
  list-style-type: none;
  position: relative;
  &:hover ${DropButtonStyle} {
    display: block;
  }
`;

export const StyleInbox = styled.div`
  padding: 40px 40px 40px 0px;
  margin: 0 auto;
`;

export const InboxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

export const GroupIcon = styled(Button)`
  text-transform: none !important;
  background: #fff !important;
  color: #202020 !important;
  padding: 2px 5px !important;
  font-size: 12px !important;
  &:hover {
    background-color: #eee !important;
  }
`;

export const TextHeader = styled.p`
  font-weight: 600;
  color: #000;
  font-size: 20px;
  margin: 0;
  padding-bottom: 10px;
  font-weight: 700;
  span {
    color: grey;
    margin-left: 6px;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const TextBottom = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: #db4c3f;
  margin-top: 20px;
  font-size: 14px;
  margin-top: 2px;
  svg {
    border: 1px solid #db4c3f;
    border-radius: 50%;
    padding: 0px 2px;
  }
  a {
    color: #db4c3f;
  }
  p {
    margin: 0;
    font-weight: 400;
    padding-left: 5px;
  }
`;
