import {CreateTabResponseModel} from "../common/commands/models/create-tab-response-model";
import {CreateTabRequestModel} from "../common/commands/models/create-tab-request-model";
import ICommandRequestModel from "../common/commands/models/i-command-request-model";
import RemoveUnacceptedResponseModel from "../common/commands/models/remove-unaccepted-response-model";
import RemoveUnacceptedRequestModel from "../common/commands/models/remove-unaccepted-request-model";


/**
 * Command manager defines all the commands that can be sent to background script or a page
 */
export default class CommandManager {
    public static async createTab(): Promise<CreateTabResponseModel> {
        let createTabRequest = new CreateTabRequestModel();
        return await CommandManager.sendBackgroundCommand(createTabRequest) as CreateTabResponseModel;
    }

    public static async click() {
        let
    }


    private static sendBackgroundCommand(data: ICommandRequestModel): Promise<any> {
        return new Promise(((resolve, reject) => {
            chrome.runtime.sendMessage(data, (result) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(result);
            });

        }));
    }

    private static sendPageCommand(tabId: number, data: ICommandRequestModel): Promise<any> {
        return new Promise(((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, data, (result) => {
                if(chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(result);
            });
        }));
    }
}