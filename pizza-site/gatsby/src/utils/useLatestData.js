import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotslices, setHotSlices] = useState();

  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // Use a side effect to fetch data from graphql end point

  useEffect(function () {
    // when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query {
                StoreSettings(id: "downtown") {
                  name
                  slicemasters {
                    name
                  }
                  hotSlices {
                    name
                  }
                }
              }
            `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for check for errors
        // set the data
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemasters);
      });
  }, []);

  return {
    hotslices,
    slicemasters,
  };
}
