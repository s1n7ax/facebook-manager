import ICommandRequestModel from "./i-command-request-model";
import CommandType from "../command-type";

export default class RemoveUnacceptedRequestModel implements ICommandRequestModel{
    command: CommandType = CommandType.REMOVE_UNACCEPTED;
}