import { PanelCtrl } from 'grafana/app/plugins/sdk';

class NetCtrl extends PanelCtrl {
    constructor($scope, $injector) {
        super($scope, $injector);
    }
}

NetCtrl.templateUrl = 'public/plugins/grafana-example-app/panels/net/net.html';

export {
    NetCtrl as PanelCtrl
};