import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

import { HomePageGrid, ItemsGrid, HomeImageTestGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const HomePageIntro = styled.div`
  h1 {
    font-size: clamp(12px, 5vw, 2em);
  }
`;

// slicemasters & hotSlices come from the runtime query in useLatestData hitting the Sanity API graphql

function CurrentlySlicing({ slicemasters }) {
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
      {slicemasters?.length && (
        <ItemGrid items={slicemasters} type="slicemaster" />
      )}
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
      {hotSlices?.length && <ItemGrid items={hotSlices} type="pizza" />}
    </div>
  );
}

export default function HomePage({ data }) {
  const { slicemasters, hotslices, openingtime } = useLatestData();
  console.log(openingtime);
  return (
    <HomePageIntro className="center">
      <h1>{data.site.siteMetadata.description}</h1>
      {/* <p>Open 11am to 11pm Every Single Day</p> */}
      <p>{openingtime}</p>
      {/* maybe replace with an input from settings in studio */}
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotslices} />
      </HomePageGrid>
      <h1>Local images being pulled in via graphql</h1>
      <HomeImageTestGrid>
        <Img fluid={data.imageOne.childImageSharp.fluid} />
        <Img fluid={data.imageTwo.childImageSharp.fluid} />
        <Img fluid={data.imageThree.childImageSharp.fluid} />
        <Img fluid={data.imageFour.childImageSharp.fluid} />
        <Img fluid={data.imageFive.childImageSharp.fluid} />
        <Img fluid={data.imageSix.childImageSharp.fluid} />
        <Img fluid={data.imageSeven.childImageSharp.fluid} />
        <Img fluid={data.imageEight.childImageSharp.fluid} />
      </HomeImageTestGrid>
    </HomePageIntro>
  );
}

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
`;

export const query = graphql`
  query homePageQuery {
    site {
      id
      siteMetadata {
        description
      }
    }
    imageOne: file(relativePath: { eq: "one.jpg" }) {
      ...fluidImage
    }
    imageTwo: file(relativePath: { eq: "two.jpg" }) {
      ...fluidImage
    }
    imageThree: file(relativePath: { eq: "three.jpg" }) {
      ...fluidImage
    }
    imageFour: file(relativePath: { eq: "four.jpg" }) {
      ...fluidImage
    }
    imageFive: file(relativePath: { eq: "five.jpg" }) {
      ...fluidImage
    }
    imageSix: file(relativePath: { eq: "six.jpg" }) {
      ...fluidImage
    }
    imageSeven: file(relativePath: { eq: "seven.jpg" }) {
      ...fluidImage
    }
    imageEight: file(relativePath: { eq: "eight.jpg" }) {
      ...fluidImage
    }
  }
`;
