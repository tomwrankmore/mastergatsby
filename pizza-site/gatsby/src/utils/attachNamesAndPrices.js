import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

// Reminder:
// order is the returned array/state variable from useState in OrderContext.
// pizzas is just graphql query all pizzas.
// so what's happening here? map each item in the order array, set variable pizza to
// equal any item in pizzas array where the item.id is the sams as the item.id in order array
// return an object with pizza info to populate the 'order' property in body object of submitOrder
// function in usePizza

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item, // contains id + size from useState/usePizza/OrderContext
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
