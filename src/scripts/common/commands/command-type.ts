/**
 * defines all the commands available
 */
enum CommandType {
    READY = 'ready',
    CREATE_TAB = 'create tab',
    EXECUTE_SCRIPT = 'execute script',
    NAVIGATE = 'navigate',
    CLICK = 'click',
    TYPE = 'type',
    SELECT = 'select',
    WAIT = 'wait',
    REMOVE_UNACCEPTED = 'remove unaccepted'
}

export default CommandType;
