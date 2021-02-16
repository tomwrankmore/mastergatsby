import { graphql } from 'gatsby';
import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

import { HomePageGrid, ItemsGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

// slicemasters & hotSlices come from the runtime query in useLatestData hitting the Sanity API graphql

function CurrentlySlicing({ slicemasters }) {
  console.log(slicemasters);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemaster on:</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {/* if there are no slicemaster defined then render loading grid */}
      {slicemasters && !slicemasters?.length && <p>No one is working rn.</p>}
      {/* if there ARE slicemaster but there is NOT length in the array render loading grid */}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nuthin' in the case.</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage({ data }) {
  const { slicemasters, hotslices } = useLatestData();

  return (
    <div className="center">
      <h1>{data.site.siteMetadata.description}</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      {/* maybe replace with an input from settings in studio */}
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotslices} />
      </HomePageGrid>
    </div>
  );
}

export const query = graphql`
  query homePageQuery {
    site {
      id
      siteMetadata {
        description
      }
    }
  }
`;
