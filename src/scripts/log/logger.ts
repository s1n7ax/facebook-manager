import LogTypes from "./log-types";
import LogMessageModel from "./log-message-model";
import ScriptLevel from "../common/script-level";

export default class Logger {
    public static log(logMessage: LogMessageModel) {
        let logMethod: Function;

        switch (logMessage.logType) {

            case LogTypes.INFO: { logMethod = this.info }
                break;

            case LogTypes.WARN: { logMethod = this.warn }
                break;

            case LogTypes.ERROR: { logMethod = this.error }
                break;

            case LogTypes.DEBUG: { logMethod = this.debug }
                break;
        }

        logMethod(logMessage.scriptLevel, logMessage.message, logMessage.data);
    }

    private static info(scriptLevel: ScriptLevel, message: string, data?: any) {
        data = !data && {};
        message = `[${scriptLevel}] [INFO]  ${Logger.getTimestamp()} ${message}`;

        console.log(message, data);
    }

    private static warn(scriptLevel: ScriptLevel, message: string, data?: any) {
        data = !data && {};
        message = `[${scriptLevel}] [WARN] ${Logger.getTimestamp()} ${message}`;

        console.warn(message, data);
    }

    private static error(scriptLevel: ScriptLevel, error: Error, data?: any) {
        data = !data && {};
        let message = `[${scriptLevel}] [ERROR] ${Logger.getTimestamp()} ${error.message}`;

        console.error(message, error, data);
    }

    private static debug(scriptLevel: ScriptLevel, message: string, data?: any) {
        data = !data && {};
        message = `[${scriptLevel}] [DEGUB] ${Logger.getTimestamp()} ${message}`;

        console.log(message, data);
    }

    private static getTimestamp(date?: Date) {
        date = !date && new Date();

        let year = date.getFullYear();
        let month = date.toLocaleString("en-us", {month: "short"});
        let day = date.getDate();

        let hours = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let mil = date.getMilliseconds();

        return `${year}-${month}-${day} ${hours}:${min}:${sec}:${mil}`;
    }
}