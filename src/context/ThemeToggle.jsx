import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "./ThemeContext";


const Button = styled.button`
  border-radius: 8px;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin: 0;
  background: ${({ $isLight }) => $isLight ? '#222' : '#fff'};
  color: ${({ $isLight }) => $isLight ? '#fff' : '#222'};
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ $isLight }) => $isLight ? '#444' : '#eee'};
  }
`;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === 'light';
  return (
    <Button $isLight={isLight} onClick={toggleTheme}>
      {isLight ? 'Tema Escuro' : 'Tema Claro'}
    </Button>
  );
}
