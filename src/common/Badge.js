export const Badge = (header, text = '') => {
  const badge = document.createElement('div');
  const badgeHeader = document.createElement('div');
  const paragraph = document.createElement('p');

  badgeHeader.innerText = header;
  paragraph.innerText = text;

  badgeHeader.classList.add('badgeHeader');

  badge.append(badgeHeader, paragraph);

  return badge;
}
