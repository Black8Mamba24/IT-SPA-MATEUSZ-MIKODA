export default API_ROOT = 'http://localhost:3000';

export function getImageURL(filename) {
    return `${API_ROOT}/static/images/${filename}`;
}
