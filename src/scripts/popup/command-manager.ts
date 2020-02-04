import Logger from 'js-logger';
import { browser } from 'webextension-polyfill-ts';
import CommandType from '../common/commands/command-type';
import ClickRequestModel from '../common/commands/models/click-request-model';
import CommandRequestModel from '../common/commands/models/command-request-model';
import CreateTabRequestModel from '../common/commands/models/create-tab-request-model';
import CreateTabResponseModel from '../common/commands/models/create-tab-response-model';
import NavigateRequestModel from '../common/commands/models/navigate-request-model';
import { methodDebugLog } from '../common/logger';
import {
    throwResponseErrors,
    waitUntilTabIsReady
} from '../common/message-passing';

const logger = Logger.get('CommandManager');

/**
 * Command manager defines all the commands that can be sent to background script or a page
 */
export default class CommandManager {
    /**
     * Creates new tab in the active browser window according to the passed values
     * @param data { CreateTabRequestModel } - pass Tabs.createProperties type
     */
    @methodDebugLog()
    public static async createTab(
        data: CreateTabRequestModel
    ): Promise<CreateTabResponseModel> {
        return await CommandManager.sendBackgroundCommand({
            command: CommandType.CREATE_TAB,
            data
        });
    }

    /**
     * Navigates to a given url
     * @param tabId - The tab id, the command should be sent to
     * @param url {string} - Url of the page that should be navigated to
     */
    @methodDebugLog()
    public static async navigate(
        tabId: number,
        data: NavigateRequestModel
    ): Promise<void> {
        const command = CommandType.NAVIGATE;
        return await CommandManager.sendPageCommand(tabId, {
            command,
            data
        });
    }

    /**
     * Sends click command to a page.
     * Page will be identified by the given tab id
     * @param tabId - The tab id, the command should be sent to
     * @param data {ClickRequestModel} - Locator strategy to locate element
     */
    @methodDebugLog()
    public static async click(
        tabId: number,
        data: ClickRequestModel
    ): Promise<void> {
        const command = CommandType.CLICK;

        return await CommandManager.sendPageCommand(tabId, {
            command,
            data
        });
    }

    @throwResponseErrors()
    private static sendBackgroundCommand(
        data: CommandRequestModel
    ): Promise<any> {
        logger.debug(`sendBackgroundCommand():: sending data`, data);
        return browser.runtime.sendMessage(data);
    }

    @throwResponseErrors()
    @waitUntilTabIsReady(6000)
    private static sendPageCommand(
        tabId: number,
        data: CommandRequestModel
    ): Promise<any> {
        logger.debug(`sendPageCommand():: sending data`, data);
        return browser.tabs.sendMessage(tabId, data);
    }
}
