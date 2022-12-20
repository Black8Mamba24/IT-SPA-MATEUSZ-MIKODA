export const Image = (url, alt = "") => {
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('alt', alt);

    return img;
}
