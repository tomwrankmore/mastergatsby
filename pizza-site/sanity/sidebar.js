import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build custom side bar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make new doc id so we don't rndm string of numbers
            .documentId('headingley')
        ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
        // this says: for each item that this array returns,
        // check if the item id is NOT equal to storeSettings
        // Reason: to remove settings from sidebar
      ),
    ]);
}
