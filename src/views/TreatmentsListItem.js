import { cartManager } from '../cart/cart-manager';
import { Button } from '../common/Button';
import { TreatmentDetails } from './TreatmentDetails';
import { Image as ImageComponent } from '../common/Image';
import { getImageURL } from '../config/api';

export function TreatmentsListItem(treatment) {
  const li = document.createElement('li');
  const img = ImageComponent(
    getImageURL(treatment.img),
    "Illustracja pokoju."
  );

  const readMoreButton = Button('Zobacz', () => {
    const navigateEvent = new CustomEvent('navigate', {
      detail: () => TreatmentDetails(treatment.id)
    });

    document.body.dispatchEvent(navigateEvent);
  });

  const addToCartButton = Button('Dodaj do koszyka', () => {
    cartManager.addItem(treatment);
  });

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('listImageWrapper');
  imageWrapper.append(img);

  img.height = '50';

  li.append(imageWrapper);

  li.innerHTML = li.innerHTML + `
    <h4 class="listHeader">${treatment.name}</h4>
    <p>
      <strong>${treatment.price.toFixed(2)} zł</strong>
    </p>
    <footer></footer>
  `;

  li.querySelector('footer').append(readMoreButton, addToCartButton);

  return li;
}
