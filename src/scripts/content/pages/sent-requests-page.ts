import DefaultElement from "../element/default-element";
import FindBy from "../locators/find-by";
import By from "../locators/by";

export default class SentRequestsPage {
    static readonly url = "https://www.facebook.com/friends/requests/?fcref=none&outgoing=1";

    @FindBy({
        by: By.XPATH,
        value: "//button[text()='Friend Request Sent' and @data-cancelref='outgoing_requests']"
    })
    static btn_Common_FriendRequestSent: DefaultElement;

    @FindBy({
        by: By.XPATH,
        value: "//div[contains(@class, 'NonFriendSubscriptionMenu')]/div[contains(@class, 'FriendListActionMenu')]/ul/li[contains(@class, 'FriendListCancel')]/a"
    })
    static btn_Common_PopupMenu_CancelRequest: DefaultElement;

    @FindBy({
        by: By.XPATH,
        value: "//div/div[text()='Confirmation Required']/following-sibling::div//button[text()='Cancel Request']"
    })
    static btn_Common_PopupMenu_Confirmation_CancelRequest: DefaultElement;
}