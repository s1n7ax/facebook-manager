import Click from "./click";
import CommandType from "../../command/command-type";
import IPageAction from "./i-page-action";

export default class ActionFactory {
    static actionMap: Map<CommandType, IPageAction> = ActionFactory.getActionMap();

    static getActionMap(): Map<CommandType, IPageAction> {
        let actionMap: Map<CommandType, IPageAction> = new Map();

        actionMap.set(CommandType.CLICK, Click);

        return actionMap;
    }

    static get(command: CommandType): IPageAction {
        return this.actionMap.get(command);
    }
}