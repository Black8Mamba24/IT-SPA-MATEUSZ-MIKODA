/**
 * Source: https://writingjavascript.com/lets-code-a-plain-javascript-notification-queue-using-private-fields-and-methods
 */
export class Notification extends Event {
    static #ALLOWED_LEVELS = ['info', 'warning', 'error'];
    #message = '';
    #level = '';
    #dismissed;
    #dismissResolve;

    get message() {
        return this.#message;
    }

    get level() {
        return this.#level;
    }

    get dismissed() {
        return this.#dismissed;
    }

    constructor(message = '', level = 'info') {
        super('notification');

        if (!this.constructor.#ALLOWED_LEVELS.includes(level)) {
            throw new Error(`Level ${level} is not allowed, must be one of ${this.#ALLOWED_LEVELS.join(', ')}`);
        }

        this.#message = message;
        this.#level = level;

        this.#dismissed = new Promise((resolve) => this.#dismissResolve = resolve);
    }

    dismiss() {
        this.#dismissResolve();
    }
}

