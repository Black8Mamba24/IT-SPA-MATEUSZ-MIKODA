import { Div } from '../common/Div';
import { Section } from '../common/Section';
import { Header1 } from '../common/Header1';
import { Header4 } from '../common/Header4';

export const Home = () => {
  const section = Section();
  const homeImage = Div('homeImage'); 
  const aboutSection = Div('aboutSection'); 
  const home_ = Div('home_');
  const blurred = Div('blurred');
  const address = Div('addressSection');

  aboutSection.innerHTML = `
    <div class="aboutColumn">
      <h4 class="aboutHeader">Programiści dla programistów</h4>
      <p>
        Znamy potrzeby programistów, bo sami nimi jesteśmy. 
        Wiemy, że czasami trzeba odpocząć od kodu i oddać się relaksowi!
      </p>
    </div>
    <div class="aboutColumn">
      <h4 class="aboutHeader">Niskie ceny</h4>
      <p>
        Ok, wiemy, że zarabisz dużo pieniędzy, ale czemu masz 
        je wszystkie zostawić u nas? Wydaj trochę na odpoczynek, 
        a resztę poświęć na swoje ulubione rozrywki!
      </p>
    </div>
    <div class="aboutColumn">
      <h4 class="aboutHeader">Świetne otoczenie</h4>
      <p>
        Wszyscy lubimy spędzać czas w swoich norach, ale 
        umówmy się, że nic nie zostąpi obcowania z naturą!
      </p>
    </div>
  `;

  
  address.innerText = 'IT SPA, Gajowa 16, 30-426 Kraków';  
  
  const h1 = Header1(
    'IT SPA',
    'logoHeader'
  );

  const h4 = Header4(
    'Witaj w IT SPA. Każdy programista lubi u nas odpoczywać.',
    'secondHeader'
  );

  section.append(home_);
  home_.append(homeImage);

  homeImage.append(
    blurred, 
    aboutSection, 
    address
  );

  blurred.append(h1, h4);

  return section;
}
