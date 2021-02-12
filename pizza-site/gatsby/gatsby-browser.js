import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
{
  /* when gatsby fires up the browser it checks for this file and says I'm about to ship this page, do you want to wrap page element or anything. The above function will tell it what to wrap every page in. The wrapPageElement function is passed the page element which contains all info about which page we're on & props. Layout component recieves ...props, bare in mind this HAS to be a spread component. Just passing props will fail. */
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
