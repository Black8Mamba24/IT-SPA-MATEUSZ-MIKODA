import { cartManager } from '../cart/cart-manager';
import { Button } from '../common/Button';
import { Section } from '../common/Section';
import { Table } from '../common/Table';
import { TableRow } from '../common/TableRow';
import { TableHead } from '../common/TableHead';
import { roundDownMoney } from '../helpers';

export function Cart() {
  const section = Section(`
    <h2 class="cartHeader">Koszyk</h2>
  `);

  section.classList.add("roomDetails");

  const table = Table();

  const tableHead = TableHead([
    'Nazwa', 'Cena', 'Ilość', 'Czas', ''
  ]);

  const tableRows = cartManager.getAllItems().map(cartEntry => {
    const tableRow = TableRow([
      { value: cartEntry.item.name },
      { value: cartEntry.item.price.toFixed(2) },
      { value: cartEntry.quantity },
      { value: cartEntry.item.dateRange ? displayDateRange(cartEntry.item.dateRange) : '-' },
      { value: '' }
    ]);

    const removeFromCart = Button('🗑️', () => {
      cartManager.removeItem(cartEntry.item);

      const navigateEvent = new CustomEvent('navigate', { detail: Cart });
      document.body.dispatchEvent(navigateEvent);
    });

    removeFromCart.style.backgroundColor = 'transparent';

    tableRow.lastElementChild.append(removeFromCart);

    return tableRow;
  });

  const totalPrice = roundDownMoney(cartManager.getTotal());

  const tableFooter = TableRow([
    {value: ''},
    {value: ''},
    {value: ''},
    {value: '<strong>Razem:</strong>'},
    {value: `<strong>${totalPrice} zł</strong>`}
  ]);

  const orderButton = cartManager.getTotal() ? Button('Przejdź do kasy', () => {
    cartManager.order();

    const navigateEvent = new CustomEvent('navigate', { detail: Cart });
    document.body.dispatchEvent(navigateEvent);
  }) : '';

  orderButton === '' ? null : orderButton.style.marginTop = '1rem';

  table.append(tableHead, ...tableRows, tableFooter);
  section.append(table, orderButton);

  if (cartManager.getAllItems().length === 0) {
    section.innerHTML = '<h2 class="emptyCartHeader">Koszyk jest pusty</h2>';
  }

  return section;
}

const displayDateRange = (dateRange) => {
  const start = dateRange.startDate.substring(0, 10);
  const end = dateRange.endDate.substring(0, 10);
  return `Od ${start} do ${end}`;
} 
