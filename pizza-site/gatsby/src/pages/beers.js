import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`Beers! We have ${beers.length} in stock`} />
      <h2 className="center">We have {beers.length} beers. Dine in only.</h2>
      <BeerGridStyle>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          console.log(rating);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />

              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {'⭐'.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {'⭐'.repeat(5 - rating)}
                </span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyle>
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        name
        id
        price
        rating {
          reviews
          average
        }
        image
      }
    }
  }
`;
