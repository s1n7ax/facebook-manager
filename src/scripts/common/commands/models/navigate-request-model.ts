import ICommandRequestModel from "./i-command-request-model";
import CommandType from "../command-type";

export default class NavigateRequestModel implements ICommandRequestModel {
    readonly command = CommandType.NAVIGATE;
    url: string;

    constructor(url: string) {
        this.url = url;
    }

}