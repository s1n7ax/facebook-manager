import CreateData = chrome.windows.CreateData;
import Window = chrome.windows.Window;

/**
 * ChromeWindow - wraps required chrome.windows methods with Promise
 */
export default class ChromeWindow {
    /**
     * get Window by window id
     *
     * @param id
     *      id of the window
     */
    static get(id: number): Promise<Window> {
        return new Promise<Window>(((resolve, reject) => {
            chrome.windows.get(id, (window) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(window);
            });
        }));
    }

    static async exist(id: number): Promise<boolean> {
        try {
            await this.get(id);

            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * creates new browser window
     *
     * @param createData
     *      config of the window that should be created
     */
    static create(createData: CreateData): Promise<Window> {
        return new Promise((resolve, reject) => {
            chrome.windows.create(createData, (window) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                else
                    resolve(window);
            });
        });
    }
}