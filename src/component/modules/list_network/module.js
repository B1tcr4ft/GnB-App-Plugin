import { PanelCtrl, loadPluginCss } from 'grafana/app/plugins/sdk';
import { appEvents } from 'grafana/app/core/core';
import {getNetworkList, startNetwork, stopNetwork} from '../../../utils/network-util'

loadPluginCss({
    dark: 'plugins/gnb/css/gnb.dark.css'
});

class ListNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http=$http;

        this.networks = [];
        this.updateNetworkList();
    }

    updateNetworkList() {
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => appEvents.emit('alert-error', ['GnB App Error', error])
        );
    }

    start(network) {
        startNetwork(this.$http, network.id).then(
            data => {
                this.updateNetworkList();
                appEvents.emit('alert-success', ['Network ' + network.name, data]);
            },
            error => {
                appEvents.emit('alert-warning', ['Network ' + network.name, error]);
            });
    }

    stop(network) {
        stopNetwork(this.$http, network.id).then(
            data => {
                this.updateNetworkList();
                appEvents.emit('alert-success', ['Network ' + network.name, data]);
            },
            error => {
                appEvents.emit('alert-warning', ['Network ' + network.name, error]);
            });
    }

}

ListNetworkCtrl.templateUrl = 'component/modules/list_network/list_network.html';

export { ListNetworkCtrl as PanelCtrl };