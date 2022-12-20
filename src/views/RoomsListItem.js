import { Button } from '../common/Button';
import { RoomDetails } from './RoomDetails';
import { Image as ImageComponent } from '../common/Image';
import { getImageURL } from '../config/api';

export function RoomsListItem(room) {
  const li = document.createElement('li');
  const img = ImageComponent(
    getImageURL(room.img),
    "Illustracja pokoju."
  );

  const readMoreButton = Button('Zobacz', () => {
    const navigateEvent = new CustomEvent('navigate', {
      detail: () => RoomDetails(room.id)
    });

    document.body.dispatchEvent(navigateEvent);
  });

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('listImageWrapper');
  imageWrapper.append(img);

  img.height = '50';

  li.append(imageWrapper);

  li.innerHTML = li.innerHTML + `
    <h4 class="listHeader">${room.name}</h4>
    <p>
      <strong>${room.price.toFixed(2)} zł</strong>
    </p>
    <footer></footer>
  `;

  li.querySelector('footer').append(readMoreButton);

  return li;
}
