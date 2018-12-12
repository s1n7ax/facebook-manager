import ICommandRequestModel from "./i-command-request-model";
import CommandType from "../command-type";

export class CreateTabRequestModel implements ICommandRequestModel {
    command: CommandType = CommandType.CREATE_TAB;

    constructor() {
    }
}