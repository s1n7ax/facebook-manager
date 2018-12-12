/************************************* MAIN *************************************/
/*********************************** CONTENT ************************************/

/*
handling commands externalized to a separate async method
making addListener callback an async will hold the return true statement until completion of async methods
as a result sender callback will be called due to `undefined` return
 */
import CommandManager from "./command-manager";
import LoggerClient from "../common/log/logger-client";
import ScriptLevel from "../common/script-level";
import LogTypes from "../common/log/log-types";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    CommandManager.handleCommands(request, sender, sendResponse);

    return true;
});
