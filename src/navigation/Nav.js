import { Home } from '../views/Home';
import { RoomsList } from '../views/RoomsList';
import { TreatmentsList } from '../views/TreatmentsList';
import { Cart } from '../views/Cart';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { handleAvatarClick } from '../common/Avatar';
import { Login } from '../views/Login';

let navItems = [
  { name: 'home', component: Home },
  { name: 'pokoje', component: RoomsList },
  { name: 'zabiegi', component: TreatmentsList },
  { name: '<div class="cart"></div>', component: Cart },
];

export function Nav(authenticated) {
  if (authenticated) {
    navItems.push({ name: '<div id="avatar" class="avatar"></div>', handler: handleAvatarClick });
  }

  const nav = document.createElement('nav');

  const navButtons = navItems.map(navItem => {
    const navButton = new Button(navItem.name, () => {
      if (navItem.component) {
        const navigateEvent = new CustomEvent('navigate', {
          detail: navItem.component
        });
        document.body.dispatchEvent(navigateEvent);
      }

      if (navItem.handler) {
        navItem.handler();
      }
    });

    navButton.classList.add('navButton');

    return navButton;
  });

  nav.append(new Logo);
  nav.append(...navButtons);

  if (!authenticated) {
    const goToLoginButton = Button("<div class='goToLogin'></div>", () => {
      const navigateEvent = new CustomEvent('navigate', {
        detail: Login
      });
      document.body.dispatchEvent(navigateEvent);
    });

    nav.append(goToLoginButton);
  }

  return nav;
}
