import StaticImplements from "../../common/static-implements";
import IPageAction from "./i-page-action";
import RemoveUnacceptedRequestModel from "../../command/models/remove-unaccepted-request-model";
import Navigate from "./action-navigate";
import SentRequestsPage from "../pages/sent-requests-page";

@StaticImplements<IPageAction>()
export default class RemoveUnaccepted {

    static async run(data: RemoveUnacceptedRequestModel) {
        await this.exec();
    }

    static async exec() {
        let maxPageRefreshRetry = 2;

        // navigate to the page
        Navigate.exec(SentRequestsPage.url);

        // start removing requests
        for (let i = 0; SentRequestsPage.btn_Common_FriendRequestSent.exist() && maxPageRefreshRetry; i++) {
            await SentRequestsPage.btn_Common_FriendRequestSent.click();
            await SentRequestsPage.btn_Common_PopupMenu_CancelRequest.click();
            await SentRequestsPage.btn_Common_PopupMenu_Confirmation_CancelRequest.click()
        }
    }
}