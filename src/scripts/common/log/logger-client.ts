import LogTypes from "./log-types";
import LogMessageModel from "./log-message-model";
import ScriptLevel from "../script-level";
import Port = chrome.runtime.Port;

export default class LoggerClient {
    private static loggerChannelName = "cross-script-logger";
    private readonly scriptLevel: ScriptLevel;


    constructor(scriptLevel: ScriptLevel) {
        this.scriptLevel = scriptLevel;
    }

    private static get port(): Port {
        return chrome.runtime.connect({ name: this.loggerChannelName})
    }

    public send(message: any, logType: LogTypes, data?: any) {
        let messageObj = new LogMessageModel(
            this.scriptLevel,
            logType,
            message,
            data
        );


        chrome.runtime.connect({ name: "cross-script-logger" }).postMessage(messageObj);
    }
}