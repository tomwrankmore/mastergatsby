import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/Priceinput';

export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizza',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in pence',
      validation: (Rule) => Rule.min(1000).warning('Minimum price is $10'),
      // When Sanity renders out this component for us, it passes in props from this field, ie. description etc.
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      // this is type of: array, & it's an array of references to topping 🥴
      // basically creates a dropdown containing all toppings
      // the reference type contains all toppings, you could add something else to the array if you needed.
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      vegetarian0: 'toppings.0.vegetarian',
      vegetarian1: 'toppings.1.vegetarian',
      vegetarian2: 'toppings.2.vegetarian',
      vegetarian3: 'toppings.3.vegetarian',
    },
    // what's shown in Studio, second column to site editors.
    prepare: ({ title, media, ...toppings }) => {
      const toppingKeys = Object.keys(toppings); // array with key values of last 8 entries
      const vegetarian = toppingKeys
        .filter((key) => key.startsWith('vegetarian')) // remove topping names from toppingKeys array
        .map((key) => toppings[key]) // returns array of whether vegOption was true or false..ie. toppings.vegetarian0 = 'does the first topping have veg ticked or not?' etc
        .filter((isVeg) => isVeg !== undefined) // remove any undefined, which will appear in pizza with less than 4 toppings
        .every((isVeg) => isVeg === true); // vegetarian will be an empty array if any entries are false ie. meat.

      const subtitle = toppingKeys
        .filter((key) => key.startsWith('topping'))
        .map((key) => toppings[key]) // returns array topping names
        .filter((name) => name !== undefined) // filters out undefined toppings
        .join(', ');

      // 1. Filter out undefined
      // const tops = Object.values(toppings).filter(Boolean); // filters out anything that returns false ie. undefined toppings.

      // 2. return the preview object for the pizza
      return {
        title: `${title} ${vegetarian ? '🌱' : ''}`,
        media,
        subtitle,
      };
    },
  },
};
