import './it-spa.scss';
import { Home } from './views/Home';
import { Nav } from './navigation/Nav';
import { isUserAuthenticated } from './helpers';

const main = document.querySelector('main');
const authenticated = isUserAuthenticated();

main.append(Home());
main.before(Nav(authenticated));

document.body.addEventListener('navigate', (event) => {
  const { detail: Component } = event;

  main.innerHTML = '';
  main.append(Component());
});
