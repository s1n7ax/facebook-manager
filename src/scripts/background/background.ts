import Commands from "../command/commands";
import ChromeWindow from "./chrome-window";
import Window = chrome.windows.Window;
import ChromeTab from "./chrome-tab";
import {CreateTabResponseModel} from "../command/create-tab-response-model";
import {ErrorResponseModel} from "../command/error-response-model";
import Logger from "../log/logger";

/**
 * Background
 *
 * @property window
 *      holds window object that is created to run the automation
 *
 * @property facebook
 *      url of the application
 */
class Background {
    private static window: Window = null;
    private static facebook = "https://www.google.com";

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
            if (window === null || !await ChromeWindow.exist(this.window.id)) {
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
            Logger.error("createTab: - Failed!", e);
        }
    }
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.command) {
        case Commands.CREATE_TAB: {
            let tabId = await Background.createTab();
            sendResponse(new CreateTabResponseModel(tabId));
        }
            break;

        /**
         * @TODO
         * default action should be removed in the production
         */
        default: {
            sendResponse(new ErrorResponseModel(new Error()));
            throw new Error("Invalid command type: " + request.command);
        }
    }

    // return true notify messaging runtime response callback to wait for sendResponse() method call
    return true;
});

