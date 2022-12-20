export function Logo() {
	const logo = document.createElement('div')
	logo.classList.add('logo')
	logo.innerText = 'IT SPA'

	logo.addEventListener('click', () => {
		window.location.reload(true)
	})

	return logo
}
