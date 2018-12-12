export default class TimeoutException extends Error {


    constructor(message?: string) {
        if (message)
            super(message);
        else
            super();

        this.name = "TimeoutException";
    }
}