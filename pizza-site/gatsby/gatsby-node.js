import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page.
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  //   { data } is destructured from props returned from graphql
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3 Loop over each pizza and create a page for that pizza
  const pizzas = data.pizzas.nodes;
  pizzas.forEach((pizza) => {
    actions.createPage({
      // URL for the individual pizza page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

// TOPPING FUNCTION
async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // queery gets all toppings' names and id's
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // Loop through all toppings and create page for each with Topping template sending over topping.id
  const toppings = data.toppings.nodes;

  toppings.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // Regex for topping
        toppingRegex: `/${topping.name}/i`,
        // Gatsby/React must know to only use the filter that uses this regex on pages created by this function.
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // loop over each one
  for (const beer of beers) {
    // create node for each beer
    if (!beer.name) return; // if there's no entry in the API then return. breaks if there's a null.

    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // create node for that beer
    actions.createNode({
      // this creates node with the original beer json data + the meta data for gatsby we created above.
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSliceMastersIntoPages({ graphql, actions }) {
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // turn each slicemaster into their own page
  const slicemasters = data.slicemasters.nodes;
  slicemasters.forEach((slicemaster) => {
    const personTemplate = path.resolve('./src/templates/Slicemaster.js');
    actions.createPage({
      // URL for the individual pizza page
      path: `slicemaster/${slicemaster.slug.current}`,
      component: personTemplate,
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });

  // figure out how many pages there are based on how many slicemasters there are and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE); // string into number I set it to 3
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize); // 9 / 3
  console.log(
    `there are ${data.slicemasters.totalCount} total people and we have ${pageCount} with ${pageSize} per page`
  );
  // Loop from 1 - n and create the pages for them

  // Creates an array from total count of people / env variable. so 9 / 2 rounded a number up to the next largest integer.
  // Loop over them and create page for each.
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template.
      context: {
        skip: i * pageSize,
        // first iteration/page is skip: 0 x 4 ie 0, second is skip: 1 x 4 ie 4 ...etc
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch list of beers and source them into Gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // create pages dynamically
  // 1. Wait for all promises to be resolved before finishing this function.
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
    // createBeersPage(params),
  ]);

  // 3. slicemasters
}
