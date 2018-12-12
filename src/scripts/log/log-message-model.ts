import LogTypes from "./log-types";
import ScriptLevel from "../common/script-level";

export default class LogMessageModel {
    scriptLevel: ScriptLevel;
    logType: LogTypes;
    message: any;
    data?: any;

    constructor(scriptLevel: ScriptLevel, logType: LogTypes, message: any, data?: any) {
        this.scriptLevel = scriptLevel;
        this.logType = logType;
        this.message = message;
        if(data) this.data = data;
    }
}