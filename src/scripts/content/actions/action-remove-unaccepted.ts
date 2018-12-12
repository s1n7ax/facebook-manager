import StaticImplements from "../../common/static-implements";
import IPageAction from "./i-page-action";
import RemoveUnacceptedRequestModel from "../../common/commands/models/remove-unaccepted-request-model";
import Navigate from "./action-navigate";
import SentRequestsPage from "../pages/sent-requests-page";
import ActionWait from "./action-wait";

@StaticImplements<IPageAction>()
export default class ActionRemoveUnaccepted {

    static async run(data: RemoveUnacceptedRequestModel) {
        return await this.exec();
    }

    static async exec() {
        let maxPageRefreshRetry = 2;
        let maxPageLoadWaitRetry = 10;

        // navigate to the page
        Navigate.exec(SentRequestsPage.url);

        // wait until the page loads
        for(let i = 0; !await SentRequestsPage.btn_Common_FriendRequestSent.exist() && i < maxPageLoadWaitRetry; i++) {
            await ActionWait.exec(500);
        }

        if(!await SentRequestsPage.btn_Common_FriendRequestSent.exist()) {
            throw new Error("Failed to load sent request page");
        }

        // start removing requests
        for (let i = 0; await SentRequestsPage.btn_Common_FriendRequestSent.exist() && i < maxPageRefreshRetry; i++) {
            await SentRequestsPage.btn_Common_FriendRequestSent.click();
            await SentRequestsPage.btn_Common_PopupMenu_CancelRequest.click();
            await SentRequestsPage.btn_Common_PopupMenu_Confirmation_CancelRequest.click();
        }

        return true;
    }
}