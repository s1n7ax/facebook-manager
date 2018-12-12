import CommandType from "../common/command/command-type";
import ChromeWindow from "./chrome-window";
import ChromeTab from "./chrome-tab";
import {CreateTabResponseModel} from "../common/command/models/create-tab-response-model";
import {ErrorResponseModel} from "../common/command/models/error-response-model";
import ICommandRequestModel from "../common/command/models/i-command-request-model";
import ExecuteScriptRequestModel from "../common/command/models/execute-script-request-model";
import ExecuteScriptResponseModel from "../common/command/models/execute-script-response-model";
import LoggerClient from "../common/log/logger-client";
import LogTypes from "../common/log/log-types";
import ScriptLevel from "../common/script-level";
import Window = chrome.windows.Window;
import MessageSender = chrome.runtime.MessageSender;

/**
 * CommandManager defines high level methods
 *
 * @property window
 *      holds window object that is created to run the automation
 *
 * @property facebook
 *      url of the application
 */
export default class CommandManager {
    private static window: Window = null;
    private static facebook = "https://www.facebook.com";
    private static logger = new LoggerClient(ScriptLevel.Background);


    /**
     * handles all the commands, background gets via messaging
     *
     * @param request
     *      request data
     *
     * @param sender
     *      sender details
     *
     * @param sendResponse
     *      message response callback
     */
    static async handleCommands(request: any, sender: MessageSender, sendResponse: (response: any) => void): Promise<void> {
        let message = request as ICommandRequestModel;

        this.logger.send("Background command received", LogTypes.INFO, request);

        switch (message.command) {

            /**
             * CREATE_TAB
             */
            case CommandType.CREATE_TAB: {
                let tabId: number;

                try {
                    tabId = await CommandManager.createTab();
                    sendResponse(new CreateTabResponseModel(tabId));
                } catch (e) {
                    this.logger.send(e, LogTypes.ERROR);
                    sendResponse(new ErrorResponseModel(e));
                }
            }
                break;

            /**
             * EXECUTE_SCRIPT
             */
            case CommandType.EXECUTE_SCRIPT: {
                let data = request as ExecuteScriptRequestModel;

                try {
                    let result = await ChromeTab.executeScript(data.tabId, data.injectDetails);
                    sendResponse(new ExecuteScriptResponseModel(result));
                } catch (e) {
                    this.logger.send(e, LogTypes.ERROR);
                    sendResponse(new ErrorResponseModel(e));
                }
            }
                break;

            /**
             * DEFAULT
             */
            default: {
                this.logger.send(new Error("Invalid command type: " + message.command), LogTypes.ERROR);
                sendResponse(new ErrorResponseModel(new Error()));
            }
        }
    }

    /**
     * creates new tab in automation window
     * IF the automation window does not exist already, this method will create new window
     * IF the automation window is created previously and closed by the user or application, this method will create new window
     *
     * @return Promise<number>
     *     tab id of the created tab
     */
    static async createTab(): Promise<number> {
        this.logger.send("createTab started!", LogTypes.DEBUG);

        // create window if automation window is null of doesn't exist
        if (this.window === null || !await ChromeWindow.exist(this.window.id)) {
            this.window = await ChromeWindow.create({url: this.facebook});

            this.logger.send("createTab: no existing window! creating new window!", LogTypes.DEBUG);

            return this.window.tabs[0].id;
        }

        // create new tab in automation window
        let tab = await ChromeTab.create({windowId: this.window.id});

        this.logger.send("createTab - successful!", LogTypes.DEBUG);
        return tab.id;
    }
}