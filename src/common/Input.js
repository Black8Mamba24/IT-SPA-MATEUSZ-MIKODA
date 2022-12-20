export const Input = (name, type = 'text', placeholder = 'Wpisz...') => {
  const wrapper = document.createElement('div');
  const _input = document.createElement('input');
  const br = document.createElement('br');

  _input.setAttribute('name', name);
  _input.type = type;

  wrapper.append(_input, br);

  _input.style.backgroundColor = '#fcf0cf';
  _input.style.color = 'black';
  _input.style.borderRadius = '4px';
  _input.style.width = '20rem';
  _input.style.marginBottom = '0.8rem';
  _input.style.padding = '0.4rem';
  _input.style.outline = 'none';

  _input.classList.add('placeholderBlack');

  _input.placeholder = placeholder;

  return wrapper;
}
