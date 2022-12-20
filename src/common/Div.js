export const Div = (className = null, id = null) => {
  const div = document.createElement('div');

  if (id) {
    div.id = id;
  }

  if (className) {
    div.classList.add(className);
  }

  return div;
}
