import { PanelCtrl } from 'grafana/app/plugins/sdk';
import { appEvents } from 'app/core/core';
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
                appEvents.emit('alert-success', ['Network ' + networkName, data]);
            },
            error => {
                console.log(error);
                appEvents.emit('alert-warning', ['Network ' + networkName, error]);
            });
    }

    stop(networkID, networkName) {
        stopNetwork(this.$http, networkID).then(
            data => {
                appEvents.emit('alert-success', ['Network ' + networkName, data]);
            },
            error => {
                console.log(error);
                appEvents.emit('alert-warning', ['Network ' + networkName, error]);
            });
    }

}

ListNetworkCtrl.templateUrl = 'component/modules/list_network/list_network.html';

export { ListNetworkCtrl as PanelCtrl };