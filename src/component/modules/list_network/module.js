import { PanelCtrl } from 'grafana/app/plugins/sdk';
import {getNetworkList, startNetwork, stopNetwork} from '../../../utils/network-util'

//TODO handle errors
class ListNetworkCtrl extends PanelCtrl {
    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http=$http;

        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => console.log(error)
        );
    }

    start(networkID) {
        startNetwork(this.$http, networkID).then(data => {}, error => console.log(error));
    }

    stop(networkID) {
        stopNetwork(this.$http, networkID).then(data => {}, error => console.log(error));
    }
}

ListNetworkCtrl.templateUrl = 'component/modules/list_network/list_network.html';

export { ListNetworkCtrl as PanelCtrl };