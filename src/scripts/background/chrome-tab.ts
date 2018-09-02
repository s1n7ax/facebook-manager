import CreateProperties = chrome.tabs.CreateProperties;
import Tab = chrome.tabs.Tab;

/**
 * ChromeTab - wraps required chrome.tabs methods with Promise
 */
export default class ChromeTab {

    /**
     * create new browser tab
     *
     * @param createProperties
     *      config of the tab that should be created
     */
    static create(createProperties: CreateProperties): Promise<Tab> {
        return new Promise(((resolve, reject) => {
            chrome.tabs.create(createProperties, (tab) => {
                if(chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(tab);
            })
        }));
    }
}