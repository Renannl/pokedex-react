import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/themes";

const Container = styled.div`
  min-height: 100vh;
  padding: 32px 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  text-transform: capitalize;
  font-size: 2.5rem;
  letter-spacing: 2px;
`;

const Card = styled.div`
  background: ${props => props.theme.cardBackground};
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border-radius: 18px;
  padding: 32px 32px 24px 32px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const Sprite = styled.img`
  width: 160px;
  height: 160px;
  margin-bottom: 16px;
  image-rendering: pixelated;
  background: #fff;
  border-radius: 50%;
  border: 4px solid #ffcb05;
  box-shadow: 0 2px 8px rgba(60,90,166,0.10);
`;

const TypeBadge = styled.span`
  display: inline-block;
  background: ${({ type }) => typeColors[type] || '#eee'};
  color: #fff;
  border-radius: 12px;
  padding: 4px 14px;
  margin-right: 8px;
  margin-bottom: 6px;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 0 1px 2px #2228;
`;

const MoveTag = styled.li`
  background: #3777e2;
  color: #fff;
  border-radius: 12px;
  padding: 4px 14px;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 0 1px 2px #2228;
  margin-bottom: 4px;
`;

const MovesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  list-style: none;
  padding: 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  text-transform: capitalize;
`;

const AbilityDescription = styled.p`
    font-size: 14px;
    margin: 2px 0 15px 0;
    color: ${props => props.theme.color};
`;
const AbilityTitle = styled.span`
  display: inline-block;
  font-size: 1.08rem;
  font-weight: bold;
  color: #ffcb05;
  text-shadow: 0 0 4px rgb(60,90,166), 0 0 2px rgb(60,90,166);
  margin-bottom: 2px;
`;

const typeColors = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
  grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
  ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
  steel: '#B7B7CE', fairy: '#D685AD'
};

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(async (data) => {
        setPokemon(data);

        const abilitiesData = await Promise.all(
          data.abilities.map(async (ab) => {
            const res = await fetch(ab.ability.url);
            const abilityData = await res.json();

            const effect = abilityData.effect_entries.find(
              (e) => e.language.name === "en"
            );

            return {
              name: ab.ability.name,
              description: effect ? effect.effect : "No description available"
            };
          })
        );

        setAbilities(abilitiesData);
      });
  }, [name]);

  if (!pokemon) return <p style={{textAlign: 'center', marginTop: 40}}>Carregando...</p>;

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <BackLink to="/">← Voltar</BackLink>
        <Card>
          <Sprite src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} alt={pokemon.name} />
          <Title>{pokemon.name}</Title>
          <Section>
            <h2>Tipos</h2>
            <div>
              {pokemon.types.map(t => (
                <TypeBadge key={t.type.name} type={t.type.name}>{t.type.name}</TypeBadge>
              ))}
            </div>
          </Section>
          <Section>
            <h2>Habilidades</h2>
            <List>
              {abilities.map((ab) => (
                <ListItem key={ab.name}>
                  <AbilityTitle>{ab.name}</AbilityTitle>
                  <AbilityDescription>{ab.description}</AbilityDescription>
                </ListItem>
              ))}
            </List>
          </Section>
          <Section>
            <h2>Movimentos</h2>
            <MovesGrid>
              {pokemon.moves.slice(0, 6).map(m => (
                <MoveTag key={m.move.name}>{m.move.name}</MoveTag>
              ))}
            </MovesGrid>
          </Section>
        </Card>
      </Container>
    </StyledThemeProvider>
  );
}
