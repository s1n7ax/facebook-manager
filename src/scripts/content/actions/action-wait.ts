import IPageAction from "./i-page-action";
import StaticImplements from "../../common/static-implements";
import WaitRequestModel from "../../common/command/models/wait-request-model";

@StaticImplements<IPageAction>()
export default class ActionWait {
    static async run(data: WaitRequestModel) {
        await this.exec(data.ms);
    }

    /**
     * Wait for a given time
     * @param ms the number of milliseconds that should be waited
     */
    static exec(ms: number) {
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        }));
    }
}