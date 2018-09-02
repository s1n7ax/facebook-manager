import CommandType from "../command/command-type";
import ChromeWindow from "./chrome-window";
import Window = chrome.windows.Window;
import ChromeTab from "./chrome-tab";
import {CreateTabResponseModel} from "../command/create-tab-response-model";
import {ErrorResponseModel} from "../command/error-response-model";
import Logger from "../log/logger";
import CommandRequestModel from "../command/command-request-model";
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
export default class CommandManager{
    private static window: Window = null;
    private static facebook = "https://www.facebook.com";


    /**
     * handles all the commands background gets via messaging
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
                let tabId = await CommandManager.createTab();
                sendResponse(new CreateTabResponseModel(tabId));
            }
                break;

            /**
             * DEFAULT
             */
            default: {
                sendResponse(new ErrorResponseModel(new Error()));
                throw new Error("Invalid command type: " + request.command);
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
        Logger.info("createTab - Started!");

        try {

            // create window if automation window is null of doesn't exist
            if (this.window === null || !await ChromeWindow.exist(this.window.id)) {
                this.window = await ChromeWindow.create({url: this.facebook});

                Logger.debug("createTab: no existing window! creating new window!");
                Logger.info("createTab - Successful!", this.window.tabs[0]);

                return this.window.tabs[0].id;
            }

            // create new tab in automation window
            let tab = await ChromeTab.create({windowId: this.window.id});

            Logger.info("createTab - Successful!", tab);
            return tab.id;

        } catch (e) {
            Logger.error(e);
        }
    }
}