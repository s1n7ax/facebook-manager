import CreateProperties = chrome.tabs.CreateProperties;
import Tab = chrome.tabs.Tab;
import InjectDetails = chrome.tabs.InjectDetails;

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
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(tab);
            })
        }));
    }

    /**
     * inject script to given page
     *
     * @param id
     *      tab id script should be injected to
     *
     * @param injectDetails
     *      details about the script
     */
    static executeScript(id: number, injectDetails: InjectDetails): Promise<Array<any>> {
        return new Promise<Array<any>>(((resolve, reject) => {
            chrome.tabs.executeScript(id, injectDetails, (result) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(result);
            });
        }));
    }
}