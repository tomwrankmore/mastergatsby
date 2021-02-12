const formatter = Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
});

export default function formatMoney(pence) {
  return formatter.format(pence / 100);
}
