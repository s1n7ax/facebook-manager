/************************************* MAIN *************************************/
/************************************ POPUP *************************************/
import CommandManager from "./command-manager";
import LoggerClient from "../common/log/logger-client";
import ScriptLevel from "../common/script-level";
import LogTypes from "../common/log/log-types";
import LoggerServer from "../common/log/logger-server";


let btn = document.getElementById('btn');
btn.addEventListener('click', async (event) => {
    console.log("start removed unaccepted friend requests");

    let cm = new CommandManager();
    let data = await cm.createTab();

    await cm.removeUnaccepted(data.tabId);

    console.log("removing friends ended!!!");
});


/**
 * Starting the logger
 */
let loggerServer = new LoggerServer();
loggerServer.start();

