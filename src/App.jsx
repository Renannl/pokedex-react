import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import { GlobalStyle } from "./styles/global";
import styled from "styled-components";
import ThemeToggle from "./context/ThemeToggle";
import Logo from "./assets/images/logo-pokemon.png";

const Header = styled.header`
  width: 100%;
  background: #ffcb05;
  color: #222;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
`;


const LogoImg = styled.img`
  height: 54px;
  display: block;
  margin: 0 auto;
  user-select: none;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <div style={{ width: 120 }} />
        <LogoImg src={Logo} alt="Pokédex" draggable={false} />
        <div style={{ width: 120, display: 'flex', justifyContent: 'flex-end', paddingRight: 16 }}>
          <ThemeToggle />
        </div>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </>
  );
}

export default App;
