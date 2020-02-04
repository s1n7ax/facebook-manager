import Logger from 'js-logger';
import { browser, Tabs } from 'webextension-polyfill-ts';
import { assertIsNotNullOrUndefined } from '../common/assertions';
import CommandType from '../common/commands/command-type';
import CommandRequestModel from '../common/commands/models/command-request-model';
import CreateTabRequestModel from '../common/commands/models/create-tab-request-model';
import { methodDebugLog } from '../common/logger';
import Window = chrome.windows.Window;
import MessageSender = chrome.runtime.MessageSender;
type Tab = Tabs.Tab;
type CreateProperties = Tabs.CreateCreatePropertiesType;

const logger = Logger.get('CommandManager');

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
    /**
     * handles all the commands, background gets via messaging
     * @param request request data
     * @param sender sender details
     * @param sendResponse message response callback
     */
    @methodDebugLog()
    static async handleCommands(
        request: any,
        _sender: MessageSender,
        sendResponse: (response: any) => void
    ): Promise<void> {
        const message = request as CommandRequestModel;

        switch (message.command) {
            /**
             * CREATE_TAB
             */
            case CommandType.CREATE_TAB:
                {
                    logger.debug('handleCommands():: creating tab', message);

                    const data = message.data as CreateTabRequestModel;
                    let tab: Tab;

                    try {
                        tab = await CommandManager.createTab(data);
                        sendResponse(tab);
                        logger.debug(
                            'handleCommands():: created tab, tabId::',
                            tab
                        );
                    } catch (e) {
                        logger.error(
                            'handleCommands():: creating tab failed',
                            e
                        );
                        sendResponse({ e });
                    }
                }
                break;

            /**
             * DEFAULT
             */
            default: {
                sendResponse({
                    error: new Error('CommandType is not defined')
                });
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
    @methodDebugLog()
    static async createTab(createProperties: CreateProperties): Promise<Tab> {
        const tab = await browser.tabs.create(createProperties);
        assertIsNotNullOrUndefined(tab.id);

        return tab;
    }
}
