import Commands from "../command/commands";
import ChromeWindow from "./chrome-window";
import Window = chrome.windows.Window;
import ChromeTab from "./chrome-tab";
import {CreateTabResponseModel} from "../command/create-tab-response-model";
import {ErrorResponseModel} from "../command/error-response-model";

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
        if (window === null || !await ChromeWindow.exist(this.window.id)) {
            this.window = await ChromeWindow.create({url: this.facebook});
            return this.window.tabs[0].id;
        }

        let tab = await ChromeTab.create({windowId: this.window.id});

        return tab.id;
    }
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    switch (request.command) {
        case Commands.CREATE_TAB: {
            let tabId = await Background.createTab();
            sendResponse(new CreateTabResponseModel(tabId));
        }
            break;


        default: {
            sendResponse(new ErrorResponseModel(new Error()));
            throw new Error("Invalid command type: " + request.command);
        }
    }

    // this will ensure the response callback wait for background sendResponse() method
    return true;
});

