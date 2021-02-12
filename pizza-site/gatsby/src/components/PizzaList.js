import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    /** this says try subgrid if it doesn't work use: */
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  /** This means, check if this variable exists, if not use subgrid. */
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

// Not exporting because this won't be used elsewhere so keep it in the same file.
function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt="pizza.name" />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas }) {
  // destructure the first pizzas variable as that containns pizza variable from pizzas.js which contains all pizzas 🥴
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
        /* passing single pizza prop */
      ))}
    </PizzaGridStyles>
  );
}
