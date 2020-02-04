/************************************* MAIN *************************************/
/*********************************** CONTENT ************************************/

/*
 * init global properties & listeners within content script
 */
import Logger from 'js-logger';
import { browser } from 'webextension-polyfill-ts';
import CommandManager from './command-manager';

Logger.useDefaults();
Logger.setLevel(Logger.TRACE);
Logger.setLevel(Logger.DEBUG);

browser.runtime.onMessage.addListener(async (request: any) => {
    return await CommandManager.handleCommands(request);
});
