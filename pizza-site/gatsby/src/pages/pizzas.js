import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  // pageContext comes from context of createPage in gatsby node
  // destructured props to { data }
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
      />

      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
      {/* pizzas comes from the query below */}
    </>
  );
}

// Gatsby will recognise that I've exported a graphql component from the page and it will run it behind the scenes and stick it into the props.data. Which we pass into page module.
// This is a 'page query' not a static.
export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    # Without the ! on the end of passed variable, the query will run without it and probably ignore the filter that uses it. That's why all pizzas are still returned for the main exported PizzasPage function at the top of this page.
    # I guess the main pizza query ignores the filter because it uses a dynamic variable...
    # You can change query name from allSanityPizza to pizzas with semi colon
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } } # WHY DOESN'T THIS FILTER AFFECT THE PizzasPage LIST?
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
              # this is a graphql fragment included in gatsby source plugin to return all of the fields in 'fluid' you can't use it in graphiql
            }
          }
        }
      }
    }
  }
`;
