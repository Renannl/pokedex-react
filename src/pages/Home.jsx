import { useState, useEffect, useContext } from "react";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import Select from "react-select";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/themes";
import PokemonCard from "../components/PokemonCard";
import typeIcons from "../utils/typeIcons";
import typeColors from "../utils/typeColors";

const SearchBar = styled.input`
  width: 100%;
  max-width: 340px;
  margin: 0 auto 16px auto;
  display: block;
  padding: 14px 22px;
  border-radius: 24px;
  border: 2px solid #ffcb05;
  background: #fffbe7;
  font-size: 1.1rem;
  color: #222;
  box-shadow: 0 2px 8px rgba(60,90,166,0.07);
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #bdb76b;
    font-style: italic;
    opacity: 1;
  }

  &:focus {
    border: 2.5px solid #3777e2;
    box-shadow: 0 4px 16px rgba(60,90,166,0.13);
    background: #fff;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
`;

const LoadMoreButton = styled.button`
  margin: 32px auto 0 auto;
  display: block;
  padding: 12px 32px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background: rgb(255, 203, 5);
  color: rgb(60, 90, 166);
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #ffe066;
    color: #222;
  }
`;

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results
          .filter((t) => t.name !== "stellar" && t.name !== "unknown")
          .map((t) => ({
            value: t.name,
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: typeColors[t.name] || "#222",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {typeIcons[t.name] && (
                  <div
                    style={{
                      background: typeColors[t.name] || "#ccc",
                      borderRadius: "50%",
                      padding: 4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                    }}
                  >
                    <img
                      src={typeIcons[t.name]}
                      alt={t.name}
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                )}
                {t.name}
              </div>
            ),
          }));

        formatted.unshift({
          value: "all",
          label: (
            <div style={{ fontWeight: "bold", color: "#444" }}>Todos</div>
          ),
        });

        setTypes(formatted);
      });
  }, []);

  useEffect(() => {
    if (selectedType && selectedType.value !== "all") {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType.value}`)
        .then((res) => res.json())
        .then((data) => {
          const sliced = data.pokemon
            .slice(0, offset + 10)
            .map((p) => p.pokemon);
          setPokemon(sliced);
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        .then((res) => res.json())
        .then((data) =>
          setPokemon((prev) =>
            offset === 0 ? data.results : [...prev, ...data.results]
          )
        );
    }
  }, [offset, selectedType]);

  const filtered = search
    ? pokemon.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : pokemon;

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <SearchBar
          type="text"
          placeholder="Buscar pokémon pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ maxWidth: 340, margin: "0 auto 32px auto" }}>
          <Select
            options={types}
            value={selectedType}
            onChange={(option) => {
              setSelectedType(option);
              setOffset(0);
            }}
            placeholder="Filtrar por tipo..."
            isClearable
          />
        </div>

        <Grid>
          {filtered.map((p) => {
            const id = p.url.split("/").filter(Boolean).pop();
            const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return <PokemonCard key={p.name} name={p.name} img={img} />;
          })}
        </Grid>

        <LoadMoreButton onClick={() => setOffset((prev) => prev + 10)}>
          Carregar mais
        </LoadMoreButton>
      </Container>
    </StyledThemeProvider>
  );
}
