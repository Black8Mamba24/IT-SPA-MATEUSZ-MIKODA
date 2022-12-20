export function Button(text, onClickCallback, type = 'normal') {
  const button = document.createElement('button');

  button.type = 'button';
  button.innerHTML = text;
  button.addEventListener('click', onClickCallback);
  button.classList.add('btn', type);

  button.style.fontWeight = 'bold';

  return button;
}
