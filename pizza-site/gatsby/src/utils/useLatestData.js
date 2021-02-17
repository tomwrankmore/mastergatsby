import { useEffect, useState } from 'react';

const gql = String.raw; // fakes out a graphql library for vscode sake, so it hightlights out query, which is just a string
// syntax highlighting without importing a library.

const deets = gql`
    name
    _id
    slug {
      current
    }
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // hot slices
  const [hotslices, setHotSlices] = useState();

  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // opening time
  const [openingtime, setOpeningtime] = useState();

  // Use a side effect to fetch data from graphql end point
  // This query is hitting the Sanity GraphQL API at RUNTIME not a Gatsby build time scenario.

  useEffect(function () {
    // when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "headingley") {
              name
              opening
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for check for errors
        // set the data NOT WORKING
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemasters);
        setOpeningtime(res.data.StoreSettings.opening);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(slicemasters);

  return {
    hotslices,
    slicemasters,
    openingtime,
  };
}
