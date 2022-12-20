export const Header1 = (text = '', className = null) => {
  const header = document.createElement('h1');
  header.innerText = text;

  if (className) {
    header.classList.add(className);
  }
  
  return header;
}
