import MessageSender = chrome.runtime.MessageSender;
import ICommandRequestModel from "../command/models/i-command-request-model";
import Logger from "../log/logger";
import ActionFactory from "./actions/action-factory";
import {ErrorResponseModel} from "../command/models/error-response-model";

export default class CommandManager {

    static async handleCommands(request: any, sender: MessageSender, sendResponse: (response: any) => void): Promise<void> {
        let message = request as ICommandRequestModel;
        Logger.debug("message received: ", message);

        try {
            let result: any = await ActionFactory.get(message.command).run(request);

            // send response
            sendResponse(result);
            Logger.debug("command completed!", result);
        } catch (e) {

            // send response
            sendResponse(new ErrorResponseModel(e));
            Logger.error(e);
        }
    }
}