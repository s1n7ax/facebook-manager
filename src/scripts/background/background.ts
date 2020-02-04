/************************************* MAIN *************************************/
/********************************** BACKGROUND **********************************/

/**
 * Listen to one time messages
 */
import ChromeWindow from './chrome-window';
import CommandManager from './command-manager';
import Logger from 'js-logger';

Logger.useDefaults();
Logger.setLevel(Logger.INFO);
Logger.setLevel(Logger.TRACE);
Logger.setLevel(Logger.DEBUG);

const logger = Logger.get('BACKGROUND::BackgroundScript');

/**
 * handling commands externalized to a separate async method
 * making addListener callback an async will hold the return true statement until completion of async methods
 * as a result sender callback will be called due to `undefined` return
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    logger.debug('got runtime message::', request);

    CommandManager.handleCommands(request, sender, sendResponse);

    // return true will make sure senders callback will wait until sendResponse is called
    return true;
});

/**
 * Create application window when popup icon is clicked
 */
chrome.browserAction.onClicked.addListener(async () => {
    await ChromeWindow.create({
        url: chrome.extension.getURL('views/popup.html'),
        type: 'popup'
    });
});
