import styled from "styled-components";
import { colors } from "../utils/colorsButton";

const Button = styled.button`
  display: inline-block;
  background-color: ${props => colors[props.$variant]?.backgroundColor || "#f5f5f5"};
  color: ${props => colors[props.$variant]?.color || "#000"};
  border: ${props => colors[props.$variant]?.border || "1px solid #000"};
  margin: 10px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${props => colors[props.$variant]?.hoverBackgroundColor || "#e0e0e0"};
    border-color: ${props => colors[props.$variant]?.hoverBorder || "#000"};
  }
`;

export default Button;
