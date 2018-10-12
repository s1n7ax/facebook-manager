import {CreateTabResponseModel} from "../command/models/create-tab-response-model";
import {CreateTabRequestModel} from "../command/models/create-tab-request-model";
import ExecuteScriptRequestModel from "../command/models/execute-script-request-model";

export default class CommandManager {
    createTab(data: CreateTabRequestModel): Promise<CreateTabResponseModel> {
        return new Promise(((resolve, reject) => {

            // send the message
            chrome.runtime.sendMessage(data, response => {

                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(response as CreateTabResponseModel);
            });
        }));
    }

    executeScript(data: ExecuteScriptRequestModel): Promise<Array<any>> {
        return new Promise(((resolve, reject) => {
            chrome.runtime.sendMessage(data, )
        }));
    }
}