import {CreateTabResponseModel} from "../common/command/models/create-tab-response-model";
import {CreateTabRequestModel} from "../common/command/models/create-tab-request-model";
import ICommandRequestModel from "../common/command/models/i-command-request-model";
import RemoveUnacceptedResponseModel from "../common/command/models/remove-unaccepted-response-model";
import RemoveUnacceptedRequestModel from "../common/command/models/remove-unaccepted-request-model";

export default class CommandManager {
    public async createTab(): Promise<CreateTabResponseModel> {
        let createTabRequest = new CreateTabRequestModel();
        return await this.sendBackgroundCommand(createTabRequest) as CreateTabResponseModel;
    }

    public async removeUnaccepted(tabId: number): Promise<RemoveUnacceptedResponseModel> {
        let removeUnacceptedRequest = new RemoveUnacceptedRequestModel();
        return await this.sendPageCommand(tabId, removeUnacceptedRequest) as RemoveUnacceptedResponseModel;
    }

    private sendBackgroundCommand(data: ICommandRequestModel): Promise<any> {
        return new Promise(((resolve, reject) => {
            chrome.runtime.sendMessage(data, (result) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(result);
            });

        }));
    }

    private sendPageCommand(tabId: number, data: ICommandRequestModel): Promise<any> {
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