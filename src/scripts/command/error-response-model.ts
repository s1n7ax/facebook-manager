export class ErrorResponseModel {
    error: Error;

    constructor(error: Error) {
        this.error = error;
    }
}