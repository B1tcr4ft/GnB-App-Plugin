import { PanelCtrl } from 'grafana/app/plugins/sdk';
import {getNetworkList, startNetwork, stopNetwork} from '../../../utils/network-util'

//TODO handle errors
class ListNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http, alertSrv) {
        super($scope, $injector);
        this.$http=$http;
        this.alertSrv = alertSrv;

        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => console.log(error)
        );
    }

    start(networkID, networkName) {
        startNetwork(this.$http, networkID).then(
            data => {
                this.alertSrv.set('Network ' + networkName, data, 'success', 5000);
            },
            error => {
                console.log(error);
                this.alertSrv.set('Network ' + networkName, error, 'error', 5000);
            });
    }

    stop(networkID, networkName) {
        stopNetwork(this.$http, networkID).then(
            data => {
                this.alertSrv.set('Network ' + networkName, data, 'success', 5000);
            },
            error => {
                console.log(error);
                this.alertSrv.set('Network ' + networkName, error, 'error', 5000);
            });
    }

}

ListNetworkCtrl.templateUrl = 'component/modules/list_network/list_network.html';

export { ListNetworkCtrl as PanelCtrl };