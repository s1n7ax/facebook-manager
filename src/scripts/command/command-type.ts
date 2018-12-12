/**
 * defines all the commands available
 */
enum CommandType {
    CREATE_TAB,
    EXECUTE_SCRIPT,
    NAVIGATE,
    CLICK,
    TYPE,
    SELECT,
    WAIT,
    REMOVE_UNACCEPTED
}

export default CommandType;