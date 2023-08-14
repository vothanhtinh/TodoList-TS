// Libraries
import { styled } from "styled-components";

export const StyleItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin: 0;
  font-size: 14px;
  color: #808080;
  height: 35px;
  &:hover {
    background-color: #eee;
    border-radius: 5px;
  }
`;

export const StyleImage = styled.div`
  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
  margin-right: 15px;
`;

export const SpanStyle = styled.span`
  font-size: 12px;
  opacity: 0.7;
`;
