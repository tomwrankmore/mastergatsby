import { graphql } from 'gatsby';
import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  console.log(slicemasters);
  return (
    <div>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working rn.</p>}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nuthin' in the case.</p>}
    </div>
  );
}

export default function HomePage({ data }) {
  const { slicemasters, hotslices } = useLatestData();
  return (
    <div className="center">
      <h1>{data.site.siteMetadata.description}</h1>
      <p>Open 11am to 11pm Every Single Day</p>
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
