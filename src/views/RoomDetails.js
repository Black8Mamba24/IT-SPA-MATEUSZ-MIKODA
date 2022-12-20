import API_ROOT from '../config/api';
import { Spinner } from '../common/Spinner';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Section } from '../common/Section';
import { Div } from '../common/Div';
import { Badge } from '../common/Badge';
import { cartManager } from '../cart/cart-manager';
import { getDaysCount } from '../helpers';
import { Notification } from '../notifications/notification';
import { NotificationQueue } from '../notifications/notification-queue';
import { renderNotification } from '../notifications/render-notification';
import { Stars } from '../common/Stars';
import { Image as ImageComponent } from '../common/Image';
import { getImageURL } from '../config/api';

export function RoomDetails(id) {
  const queue = new NotificationQueue();
  queue.addEventListener('notification', renderNotification);

  const section = Section();

  section.classList.add("roomDetails");

  section.append(Spinner());

  fetch(`${API_ROOT}/rooms/${id}`)
    .then(response => response.json())
    .then(room => {
      const _div = Div();
      const _badgeWrapper = Div();
      const _btnWrapper = Div();
      const _input = Input('dates');
      const stars = Stars(room.grade);
      const image = ImageComponent(getImageURL(room.img), "Illustracja pokoju.");

      _div.innerHTML = _div.innerHTML + `<h4 class="roomHeader">${room.name}</h4>`;
      _div.append(stars);

      _div.innerHTML = _div.innerHTML + `
        <p class="roomDscrpt">
          ${room.description}
        </p>
        <strong>Ilość łóżek </strong> ${room.beds}
        <br/>
        <strong>Ilość gości </strong> ${room.guests}
        <br/>
        <small>Cena za dobę</small>
        <br />
        <strong>${room.price?.toFixed(2)} zł</strong>
        <br />
        <small>
          Kliknij daty, by wybrać początek i koniec rezerwacji:
        </small>
      `;

      section.querySelector('#spinner').remove();
      section.append(_div, _input, _badgeWrapper, _btnWrapper, image);

      const dateRangePicker = $('input[name="dates"]');

      dateRangePicker.daterangepicker({}, (start, end, label) => {
        const startDateIsTodayOrBefore = start.isBefore(new Date().toJSON());
        let startCopy = start.clone();
        const endDateIsBiggerThanStarPlusYear = end.isAfter(startCopy.add(1, 'y').format());

        if (startDateIsTodayOrBefore) {
          const notifText = "Data początku rezerwacji musi być późniejsza niż dzień dzisiejszy.";
          queue.add(new Notification(notifText, "error"));
          return;
        }

        if (endDateIsBiggerThanStarPlusYear) {
          const notifText = "Data końca rezerwacji musi być wcześniejsza niż rok od daty przyjazdu.";
          queue.add(new Notification(notifText, "error"));
          return;
        }

        const daysCount = getDaysCount(start, end);

        const header = `Wybrano wizytę na ${daysCount} dni`;
        const _badge = Badge(header);

        _badgeWrapper.innerHTML = '';
        _badgeWrapper.append(_badge);

        room.dateRange = {
          startDate: start,
          endDate: end,
          daysCount: daysCount
        };

        const _addToCartButton = Button('Dodaj do koszyka', () => {
          cartManager.addItem(room);
          _btnWrapper.innerHTML = '';
        });

        _btnWrapper.innerHTML = '';
        _btnWrapper.append(_addToCartButton);
        _btnWrapper.style.paddingBottom = '1rem';
      });
    });

  return section;
}
