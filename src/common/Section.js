export const Section = (innerHtml = '') => {
    const section = document.createElement('section');
    if (innerHtml) {
        section.innerHTML = innerHtml;
    }
    return section;
}
