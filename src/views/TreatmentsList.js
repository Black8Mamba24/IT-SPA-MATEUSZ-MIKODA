import API_ROOT from '../config/api';
import { Spinner } from '../common/Spinner';
import { TreatmentsListItem } from './TreatmentsListItem';
import { ItemsListSection } from '../common/ItemsListSection';

export function TreatmentsList() {
  const section = ItemsListSection();

  section.append(Spinner());

  fetch(`${API_ROOT}/treatments`)
    .then(response => response.json())
    .then(treatments => {
      const ul = document.createElement('ul');
      const lis = treatments.map(treatment => TreatmentsListItem(treatment));

      ul.append(...lis);
      section.querySelector('#spinner').remove();
      section.append(ul);
    });

  return section;
}
