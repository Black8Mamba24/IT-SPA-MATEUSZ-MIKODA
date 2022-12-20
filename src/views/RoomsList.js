import API_ROOT from '../config/api'
import { Spinner } from '../common/Spinner';
import { RoomsListItem } from './RoomsListItem';
import { ItemsListSection } from '../common/ItemsListSection';

export function RoomsList() {
  const section = ItemsListSection();

  section.append(Spinner());

  fetch(`${API_ROOT}/rooms`)
    .then(response => response.json())
    .then(rooms => {
      const ul = document.createElement('ul');
      const lis = rooms.map(room => RoomsListItem(room));

      ul.append(...lis);
      section.querySelector('#spinner').remove();
      section.append(ul);
    });

  return section;
}
