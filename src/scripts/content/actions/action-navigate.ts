import StaticImplements from '../../common/static-implements';
import IPageAction from './i-page-action';
import NavigateRequestModel from '../../common/commands/models/navigate-request-model';

@StaticImplements<IPageAction>()
export default class ActionNavigate {
    static run(data: NavigateRequestModel) {
        this.exec(data.url);
    }

    static exec(url: string) {
        window.location.href = url;
    }
}

