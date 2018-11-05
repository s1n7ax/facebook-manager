import StaticImplements from "../../common/static-implements";
import IPageAction from "./i-page-action";
import RemoveUnacceptedRequestModel from "../../command/models/remove-unaccepted-request-model";
import SentRequestsPage from "../pages/sent-requests-page";
import Navigate from "./action-navigate";

@StaticImplements<IPageAction>()
export default class ActionRemoveUnaccepted {

    static run(data: RemoveUnacceptedRequestModel) {
    }

    static exec() {
        let maxPageRefreshRetry = 2;

        // navigate to the page
        Navigate.exec(SentRequestsPage.url);

        while(SentRequestsPage.btn_Common_FriendRequestSent.exist()) {
            SentRequestsPage.btn_Common_FriendRequestSent.click();
            SentRequestsPage.btn_Common_PopupMenu_CancelRequest.click();
            SentRequestsPage.btn_Common_PopupMenu_Confirmation_CancelRequest.click()
        }
    }
}