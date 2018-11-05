import CommandType from "../command-type";

export default class WaitRequestModel {
    command: CommandType = CommandType.WAIT;
    ms: number;

    /**
     * @param ms - time in milliseconds
     */
    constructor(ms: number) {
        this.ms = ms;
    }
}