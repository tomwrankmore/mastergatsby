import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PersonGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SingleSlicemasterPage({ data }) {
  const { slicemaster } = data;
  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster.image.asset.fluid.src} />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} alt="slicemaster.name" />

        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
}

// must be dynamic based on slug passed via context in gatsby node.
export const query = graphql`
  query($slug: String!) {
    # ! means it won't run this query without the variable being passed.
    # $slugvariable comes from turnPizzasIntoPages in pizzas.js
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      slug {
        current
      }
      description
      id
      image {
        asset {
          fluid(maxHeight: 500) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
