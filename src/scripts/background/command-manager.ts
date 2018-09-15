import CommandType from "../command/command-type";
import ChromeWindow from "./chrome-window";
import ChromeTab from "./chrome-tab";
import {CreateTabResponseModel} from "../command/models/create-tab-response-model";
import {ErrorResponseModel} from "../command/models/error-response-model";
import Logger from "../log/logger";
import CommandRequestModel from "../command/models/command-request-model";
import Window = chrome.windows.Window;
import MessageSender = chrome.runtime.MessageSender;
import ExecuteScriptRequestModel from "../command/models/execute-script-request-model";
import ExecuteScriptResponseModel from "../command/models/execute-script-response-model";

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
        let message = request as CommandRequestModel;

        Logger.debug("message received: ", message);

        switch (message.command) {

            /**
             * CREATE_TAB
             */
            case CommandType.CREATE_TAB: {
                let tabId: number;

                try {
                    tabId = await CommandManager.createTab();
                    sendResponse(new CreateTabResponseModel(tabId)) ;
                } catch(e) {
                    Logger.error(e);
                    sendResponse(new ErrorResponseModel(e));
                }
            }
                break;

            /**
             * EXECUTE_SCRIPT
             */
            case CommandType.EXECUTE_SCRIPT: {
                let data = message.data as ExecuteScriptRequestModel;

                try {
                    let result = await ChromeTab.executeScript(data.tabId, data.injectDetails);
                    sendResponse(new ExecuteScriptResponseModel(result));
                } catch (e) {
                    Logger.error(e);
                    sendResponse(new ErrorResponseModel(e));
                }
            }
                break;

            /**
             * DEFAULT
             */
            default: {
                Logger.error(new Error("invalid command type: " + request.command));
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
        Logger.info("createTab - started!");

        // create window if automation window is null of doesn't exist
        if (this.window === null || !await ChromeWindow.exist(this.window.id)) {
            this.window = await ChromeWindow.create({url: this.facebook});

            Logger.debug("createTab: no existing window! creating new window!");
            Logger.info("createTab - successful!", this.window.tabs[0]);

            return this.window.tabs[0].id;
        }

        // create new tab in automation window
        let tab = await ChromeTab.create({windowId: this.window.id});

        Logger.info("createTab - successful!", tab);
        return tab.id;
    }
}