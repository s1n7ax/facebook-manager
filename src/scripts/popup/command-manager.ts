import {CreateTabResponseModel} from "../common/commands/models/create-tab-response-model";
import {CreateTabRequestModel} from "../common/commands/models/create-tab-request-model";
import ICommandRequestModel from "../common/commands/models/i-command-request-model";
import ClickRequestModel from "../common/commands/models/click-request-model";
import By from "../content/locators/by";
import NavigateRequestModel from "../common/commands/models/navigate-request-model";
import TimeoutException from "../common/exceptions/timeout-exception";
import Time from "../common/time";


/**
 * Command manager defines all the commands that can be sent to background script or a page
 */
export default class CommandManager {
    private static readonly retryCount = 10;
    private static readonly sleepTime = 200;

    /**
     * Creates new automation tab
     * If there is no existing automation window opened, then window will be created
     * If there is window, new tab will be created in the existing window
     */
    public static async createTab(): Promise<CreateTabResponseModel> {
        let createTabRequest = new CreateTabRequestModel();
        return await CommandManager.sendBackgroundCommand(createTabRequest) as CreateTabResponseModel;
    }

    /**
     * Navigates to a given url
     * @param tabId - The tab id, the command should be sent to
     * @param url - Url of the page that should be navigated to
     */
    public static async navigate(tabId: number, url: string): Promise<void> {
        let navigateRequest = new NavigateRequestModel(url);

        for(let tryCount = 0; tryCount < this.retryCount; tryCount++) {
            try {
                return await CommandManager.sendPageCommand(tabId, navigateRequest);
            } catch {
                await Time.sleep(this.sleepTime);
            }
        }

        throw new TimeoutException();
    }

    /**
     * Sends click command to a page.
     * Page will be identified by the given tab id
     *
     * @param tabId - The tab id, the command should be sent to
     * @param by - Locator strategy to locate element
     * @param value - value to find the element by given locator strategy
     */
    public static async click(tabId: number, by: By, value: string): Promise<void> {
        let clickRequest = new ClickRequestModel(by, value);
        return await CommandManager.sendPageCommand(tabId, clickRequest);
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