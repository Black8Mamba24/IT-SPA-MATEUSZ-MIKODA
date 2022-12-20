// https://www.freecodecamp.org/news/javascript-design-patterns-explained/

import { NotificationQueue } from '../notifications/notification-queue'
import { Notification } from '../notifications/notification'
import { renderNotification } from '../notifications/render-notification'

const key = 'IT_SPA_CART'

const queue = new NotificationQueue()
queue.addEventListener('notification', renderNotification)

export const cartManager = {
	addItem(item) {
		const cart = localStorage.getItem(key)

		if (cart === null) {
			const content = {
				[item.name]: { quantity: 1, item: item },
			}

			const stringifiedContent = JSON.stringify(content)
			localStorage.setItem(key, stringifiedContent)
		}

		const parsedContent = JSON.parse(cart)

		if (parsedContent != null && parsedContent.hasOwnProperty(item.name)) {
			parsedContent[item.name].quantity += item.dateRange?.daysCount ?? 1
		} else {
			parsedContent[item.name] = { quantity: item.dateRange?.daysCount ?? 1, item: item }
		}

		// parsedContent[item.name].quantity += 1;

		const stringifiedContent = JSON.stringify(parsedContent)
		localStorage.setItem(key, stringifiedContent)

		queue.add(new Notification('Dodano do koszyka!'))
	},

	removeItem(item) {
		const cart = localStorage.getItem(key)

		if (cart !== null) {
			const parsedContent = JSON.parse(cart)

			if (parsedContent.hasOwnProperty(item.name)) {
				const quantity = parsedContent[item.name].quantity

				if (quantity > 1) {
					parsedContent[item.name].quantity -= 1
				} else {
					delete parsedContent[item.name]
				}

				const stringifiedContent = JSON.stringify(parsedContent)
				localStorage.setItem(key, stringifiedContent)
			}
		}

		queue.add(new Notification('Usunięto z koszyka!'))
	},

	getAllItems() {
		const cart = localStorage.getItem(key)

		if (cart === null) {
			return []
		} else {
			const parsedContent = JSON.parse(cart)
			return Object.values(parsedContent)
		}
	},

	getTotal() {
		const cart = localStorage.getItem(key)

		if (cart === null) {
			return 0
		} else {
			const parsedContent = JSON.parse(cart)

			return Object.values(parsedContent).reduce((accumulator, cartEntry) => {
				return accumulator + cartEntry.quantity * cartEntry.item.price
			}, 0)
		}
	},

	order() {
		localStorage.setItem(key, '{}')
		queue.add(new Notification('Wysłano zamówienie!'))
	},
}
