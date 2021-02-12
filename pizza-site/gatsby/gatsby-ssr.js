import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
{
  /* when gatsby fires up the browser it checks for this file and says I'm about to ship this page, do you want to wrap page element or anything. The above function will tell it what to wrap the page element in. */
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
