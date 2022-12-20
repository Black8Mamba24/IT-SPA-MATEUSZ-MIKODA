export const Header4 = (text = '', className = null) => {
  const header = document.createElement('h4');
  header.innerText = text;

  if (className) {
    header.classList.add(className);
  }
  
  return header;
}
