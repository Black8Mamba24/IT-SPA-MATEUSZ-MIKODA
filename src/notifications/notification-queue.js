import { Notification } from "./notification";

/**
 * Source: https://writingjavascript.com/lets-code-a-plain-javascript-notification-queue-using-private-fields-and-methods
 */
export class NotificationQueue extends EventTarget {
    #queue = new Set();
    #current;

    add(notification) {
        if (!(notification instanceof Notification)) {
            throw new Error('Argument must be an instance of Notification');
        }

        this.#queue.add(notification);

        if (!this.#current) {
            this.#next();
        }
    }

    async #next() {
        this.#current = this.#queue[Symbol.iterator]().next().value;
        if (this.#current) {
            this.#queue.delete(this.#current);
            this.dispatchEvent(this.#current);
            await this.#current.dismissed;
            this.#next();
        }
    }
}
