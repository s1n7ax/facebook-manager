/**
 * interface for all the actions defined under content script which manipulates the DOM
 * click, type, select and many other high level actions will be implemented under this interface
 */
export default interface IPageAction {
    run(data: any): any
}