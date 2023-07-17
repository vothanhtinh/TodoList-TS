// Libraries
import { styled } from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #eee;
  .taskname {
    font-size: 14px !important;
    font-weight: 600 !important;
  }
`;

export const FormInput = styled.input`
  padding: 10px 15px 0 15px;
  border-radius: 3px;
  width: -webkit-fill-available;
  border: none;
  outline: none;
  font-size: 13px;
  color: #202020;
  font-weight: 400;
`;

export const ButtonGroupIcon = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0px;
  margin-left: 25px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-top: 1px solid #eee;
`;
export const StyleButton = styled.button`
  margin: 0 5px;
  padding: 7px 15px;
  color: #444;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #f5f5f5;
  &:disabled {
    opacity: 0.5;
  }
`;
export const PaddingStyle = styled.div`
  padding: 10px 15px;
  .addTask {
    background-color: #db4c3f;
    color: #ffffff;
    font-weight: 600;
  }
`;
