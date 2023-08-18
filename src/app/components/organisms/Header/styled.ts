//Libaries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

export const StyleHeader = styled.div`
  display: flex;
  background: #db4c3f;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .search {
    z-index: 99;

    &:hover {
      background-color: #fff;
      border-radius: 3px;
    }
  }
`;

export const StyleIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 17px;
  padding: 3px 8px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;
