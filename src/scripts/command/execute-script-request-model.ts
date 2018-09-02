import InjectDetails = chrome.tabs.InjectDetails;

export default class ExecuteScriptRequestModel {
    tabId: number;
    injectDetails: InjectDetails;

    constructor(tabId: number, injectDetails: InjectDetails) {
        this.tabId = tabId;
        this.injectDetails = injectDetails
    }
}