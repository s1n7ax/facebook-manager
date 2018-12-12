import MessageSender = chrome.runtime.MessageSender;
import ICommandRequestModel from "../command/models/i-command-request-model";
import ActionFactory from "./actions/action-factory";
import LoggerClient from "../log/logger-client";
import LogTypes from "../log/log-types";
import ScriptLevel from "../common/script-level";
import {ErrorResponseModel} from "../command/models/error-response-model";

export default class CommandManager {
    static readonly logger = new LoggerClient(ScriptLevel.CONTENT);
    static async handleCommands(request: any, sender: MessageSender, sendResponse: (response: any) => void): Promise<void> {

        this.logger.send("background command received", LogTypes.INFO, request);

        let message = request as ICommandRequestModel;


        try {
            let result: any = await ActionFactory.get(message.command).run(request);

            // send response
            sendResponse(result);

            this.logger.send("command completed!", LogTypes.INFO);
        } catch (e) {

            // send response
            sendResponse(new ErrorResponseModel(e));
            this.logger.send(e, LogTypes.INFO);
        }
    }
}