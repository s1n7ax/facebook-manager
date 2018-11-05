import By from "./by";
import Locate from "./locate";
import Click from "../actions/action-click";

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

    public click() {
         Click.exec(this.by, this.value)
    }

    /**
     * 
     * @param sec number of seconds to wait until element is presented
     */
    public waitUntil(sec: number) {
        
    }
}