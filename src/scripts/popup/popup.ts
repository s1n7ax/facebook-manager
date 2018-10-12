import ICommandRequestModel from "../command/models/i-command-request-model";
import CommandType from "../command/command-type";
import {CreateTabResponseModel} from "../command/models/create-tab-response-model";

document.getElementById("btn").addEventListener("click", () => {
    // request data
    let data = new ICommandRequestModel(CommandType.CREATE_TAB);

    // send message
    chrome.runtime.sendMessage(data, response => {

        // response
        let res = response as CreateTabResponseModel;

        console.log("tab id: " + res.tabId)
    });
});