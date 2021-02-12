import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description:
      'Probably one of the best pizza places in town, we are not 100% sure, 🍕 .',
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',

    {
      // plugin that sources data from Sanity
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'j6u9lu30',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
