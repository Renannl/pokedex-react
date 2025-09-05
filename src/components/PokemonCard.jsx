import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled(Link)`
  background: ${props => props.theme.cardBackground};
  box-shadow: ${props => props.theme.cardShadow};
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const Name = styled.h3`
  margin-top: 10px;
  text-transform: capitalize;
`;

export default function PokemonCard({ name, img }) {
  return (
    <Card to={`/pokemon/${name}`}>
      <Img src={img} alt={name} />
      <Name>{name}</Name>
    </Card>
  );
}
