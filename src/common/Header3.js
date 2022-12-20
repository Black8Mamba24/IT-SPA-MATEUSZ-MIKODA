export const Header3 = (text = '') => {
  const header = document.createElement('h3');
  header.innerText = text;
  
  return header;
}
