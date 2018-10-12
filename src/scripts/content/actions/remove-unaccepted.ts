import StaticImplements from "../../common/static-implements";
import IPageAction from "./i-page-action";
import RemoveUnacceptedRequestModel from "../../command/models/remove-unaccepted-request-model";

@StaticImplements<IPageAction>()
export default class RemoveUnaccepted {

    static run(data: RemoveUnacceptedRequestModel) {
    }

    static exec() {
        // navigate to the page
         
    }
}