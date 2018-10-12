/**
 * error that is thrown when the element by the given locator is not found in the DOM
 */
export default class UnsupportedOperationException extends Error {
    constructor(message?: string) {
        if (message)
            super(message);
        else
            super();

        this.name = "UnsupportedOperationException";
    }
}