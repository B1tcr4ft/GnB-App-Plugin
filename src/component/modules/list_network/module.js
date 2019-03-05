import {loadPluginCss, PanelCtrl} from 'grafana/app/plugins/sdk';
import {alert, AlertType} from "../../../utils/alert-util";
import {getNetworkList, startNetwork, stopNetwork} from '../../../utils/network-util'

loadPluginCss({
    dark: 'plugins/gnb/css/gnb.dark.css'
});

class ListNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http = $http;

        //TODO async
        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => alert(AlertType.ERROR, 'GnB App Error', error)
        );
    }

    start(networkID, networkName) {
        startNetwork(this.$http, networkID).then(
            data => {
                //network.active = true;
                alert(AlertType.SUCCESS, 'Network ' + networkName, data);
            },
            error => alert(AlertType.WARNING, 'Network ' + networkName, error)
        );
    }

    stop(networkID, networkName) {
        stopNetwork(this.$http, networkID).then(
            data => {
                //network.active = false;
                alert(AlertType.SUCCESS, 'Network ' + networkName, data);
            },
            error => alert(AlertType.WARNING, 'Network ' + networkName, error)
        );
    }

}

ListNetworkCtrl.templateUrl = 'component/modules/list_network/list_network.html';

export {ListNetworkCtrl as PanelCtrl};