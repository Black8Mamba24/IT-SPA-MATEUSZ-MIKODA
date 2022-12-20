export const Spinner = () => {
  const imageUrl = new URL(
    '../assets/spinner.svg',
    import.meta.url
  );

  const spinnerWrapper = document.createElement('div');
  const spinner = document.createElement('img');

  spinner.src = imageUrl;
  spinner.id = 'spinner';

  spinnerWrapper.style.width = '100%';
  spinner.style.margin = '0 auto';
  spinnerWrapper.style.marginTop = '2rem';
  spinner.style.width = '100px';

  spinnerWrapper.append(spinner);

  return spinnerWrapper;
}
