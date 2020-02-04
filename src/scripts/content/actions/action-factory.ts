import CommandType from '../../common/commands/command-type';
import IPageAction from './i-page-action';
import ActionClick from './action-click';
import ActionWait from './action-wait';
import ActionRemoveUnaccepted from './action-remove-unaccepted';
import { assertIsNotNullOrUndefined } from '../../common/assertions';
import ActionNavigate from './action-navigate';

export default class ActionFactory {
    private static actionMap: Map<
        CommandType,
        IPageAction
    > = ActionFactory.getActionMap();

    private static getActionMap(): Map<CommandType, IPageAction> {
        let actionMap: Map<CommandType, IPageAction> = new Map();

        actionMap.set(CommandType.CLICK, ActionClick);
        actionMap.set(CommandType.WAIT, ActionWait);
        actionMap.set(CommandType.REMOVE_UNACCEPTED, ActionRemoveUnaccepted);
        actionMap.set(CommandType.NAVIGATE, ActionNavigate);

        return actionMap;
    }

    public static get(command: CommandType): IPageAction {
        const action = this.actionMap.get(command);
        assertIsNotNullOrUndefined(action);

        return action;
    }
}

