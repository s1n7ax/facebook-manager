import MessageSender = chrome.runtime.MessageSender;
import ICommandRequestModel from "../common/commands/models/i-command-request-model";
import ActionFactory from "./actions/action-factory";
import LoggerClient from "../common/log/logger-client";
import LogTypes from "../common/log/log-types";
import ScriptLevel from "../common/script-level";
import {ErrorResponseModel} from "../common/commands/models/error-response-model";

export default class CommandManager {
    static readonly logger = new LoggerClient(ScriptLevel.CONTENT);
    static async handleCommands(request: any, sender: MessageSender, sendResponse: (response: any) => void): Promise<void> {

        this.logger.send("background commands received", LogTypes.INFO, request);

        let message = request as ICommandRequestModel;


        try {
            let result: any = await ActionFactory.get(message.command).run(request);

            // send response
            sendResponse(result);

            this.logger.send("commands completed!", LogTypes.INFO);
        } catch (e) {

            // send response
            sendResponse(new ErrorResponseModel(e));
            this.logger.send(e, LogTypes.INFO);
        }
    }
}