import By from "../locators/by";
import Locate from "../locators/locate";
import ActionClick from "../actions/action-click";

export default class DefaultElement {
     readonly by: By;
     readonly value: string;


    constructor(by: By, value: string) {
        this.by = by;
        this.value = value;
    }

    public element(): HTMLElement {
        return Locate.getElement(this.by, this.value);
    }

    public exist(): boolean {
        try{
            Locate.getElement(this.by, this.value);
            return true;
        } catch (err) {
            return false;
        }
    }

    public async click() {
        await this.waitUntilPresent(6000);
        ActionClick.exec(this.by, this.value)

    }

    /**
     * 
     * @param ms number of seconds to wait until element is presented
     */
    public async waitUntilPresent(ms: number) {
        let timeout = false;

        let timeoutId = setTimeout(() => timeout = true , ms);

        while(!timeout && !this.exist()) {
            await this.wait(200);
        }

        clearTimeout(timeoutId);

        if(timeout)
            throw new Error("Timeout while finding element: " + this.toString())

    }

    private wait(ms: number) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }

    public toString () {
        return `Locate ${this.by} value ${this.value}`
    }
}