export const ErrorDisplay = (text = '') => {
  const errorDisplay = document.createElement('p');  
  errorDisplay.innerHTML = text;

  errorDisplay.style.color = '#C9382D';
  errorDisplay.style.padding = '0';
  errorDisplay.style.margin = '0';
  errorDisplay.style.marginBottom = !text ? '0' : '1rem';

  return errorDisplay;
}
