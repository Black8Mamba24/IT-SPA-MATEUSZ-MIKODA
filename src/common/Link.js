export const Link = (text, handler) => {
  const p = document.createElement("p");
  
  p.innerText = text;
  p.addEventListener('click', handler);

  p.style.fontWeight = 'bold';
  p.style.cursor = 'pointer';
  p.style.color = '#8d6800';

  return p;
}
