import InjectDetails = chrome.tabs.InjectDetails;
import ICommandRequestModel from "./i-command-request-model";
import CommandType from "../command-type";

export default class ExecuteScriptRequestModel implements ICommandRequestModel {
    command: CommandType = CommandType.EXECUTE_SCRIPT;
    tabId: number;
    injectDetails: InjectDetails;

    constructor(tabId: number, injectDetails: InjectDetails) {
        this.tabId = tabId;
        this.injectDetails = injectDetails
    }
}