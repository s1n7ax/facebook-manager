import IPageAction from "./i-page-action";
import StaticImplements from "../../common/static-implements";
import Locate from "../locators/locate";
import ClickRequestModel from "../../command/models/click-request-model";
import By from "../locators/by";
import ClickResponseModel from "../../command/models/click-response-model";


@StaticImplements<IPageAction>()
export default class Click {

    static run(data: ClickRequestModel): ClickResponseModel {
        this.exec(data.by, data.value);

        return new ClickResponseModel();
    }

    static exec(by: By, value: string) {
        let ele = Locate.getElement(by, value);
        ele.click();
    }
}