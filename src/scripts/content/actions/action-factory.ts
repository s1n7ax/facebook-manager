import CommandType from "../../command/command-type";
import IPageAction from "./i-page-action";
import ActionClick from "./action-click";
import ActionWait from "./action-wait";
import ActionRemoveUnaccepted from "./action-remove-unaccepted";

export default class ActionFactory {
    private static actionMap: Map<CommandType, IPageAction> = ActionFactory.getActionMap();

    private static getActionMap(): Map<CommandType, IPageAction> {
        let actionMap: Map<CommandType, IPageAction> = new Map();

        actionMap.set(CommandType.CLICK, ActionClick);
        actionMap.set(CommandType.WAIT, ActionWait);
        actionMap.set(CommandType.REMOVE_UNACCEPTED, ActionRemoveUnaccepted);

        return actionMap;
    }

    public static get(command: CommandType): IPageAction {
        return this.actionMap.get(command);
    }
}