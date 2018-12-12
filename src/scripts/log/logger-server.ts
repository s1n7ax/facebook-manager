import LogMessageModel from "./log-message-model";
import Logger from "./logger";

export default class LoggerServer {
    private static loggerChannelName = 'cross-script-logger';

    private static get port() {
        return chrome.runtime.connect({name: this.loggerChannelName});
    }


    private callback(message: LogMessageModel) {
        Logger.log(message)
    }

    public start() {
        let self = this;

        chrome.runtime.onConnect.addListener(function (port) {
            console.assert(port.name == LoggerServer.loggerChannelName);
            port.onMessage.addListener(self.callback);
        });
    }
}