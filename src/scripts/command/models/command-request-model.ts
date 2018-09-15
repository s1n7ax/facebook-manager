import CommandType from "../command-type";

export default class CommandRequestModel {
    command: CommandType;
    data?: any;

    constructor(command: CommandType, data?: any) {
        this.command = command;
        if (data)
            this.data = data;
    }
}