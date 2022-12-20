import API_ROOT from '../config/api';
import { Spinner } from '../common/Spinner';
import { Section } from '../common/Section';
import { Image as ImageComponent } from '../common/Image';
import { Button } from '../common/Button';
import { getImageURL } from '../config/api';
import { cartManager } from '../cart/cart-manager';

export function TreatmentDetails(id) {
  const section = Section();
  section.classList.add("roomDetails");
  
  section.append(Spinner());

  fetch(`${API_ROOT}/treatments/${id}`)
    .then(response => response.json())
    .then(treatment => {
      const paragraph = document.createElement('p');

      paragraph.innerHTML = `
        <h4 class="roomHeader">${treatment.name}</h4>
        <p class="roomDscrpt">
          ${treatment.description}
        </p>
        <small>Cena zabiegu</small>
        <br/>
        <strong>
          ${treatment.price?.toFixed(2)}zł
        </strong>
      `;

      const image = ImageComponent(getImageURL(treatment.img), "Illustracja zabiegu.");

      const _addToCartButton = Button('Dodaj do koszyka', () => {
        cartManager.addItem(treatment);
        _btnWrapper.innerHTML = '';
      });

      _addToCartButton.style.marginBottom = '1rem';

      section.querySelector('#spinner').remove();
      section.append(paragraph, _addToCartButton, image);
    });

  return section;
}
