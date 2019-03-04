import { appEvents } from 'grafana/app/core/core';
import {deleteNetwork, getNetworkList} from '../../../utils/network-util'

class DeleteNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => appEvents.emit('alert-error', ['GnB App Error', error])
        );
    }

    delete() {
        let network = document.getElementById("networks");
        let networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text);

        deleteNetwork(this.$http, networkID.id).then(
            data => appEvents.emit('alert-success', ['Network ' + networkID.name, data]),
            error => appEvents.emit('alert-warning', ['Network ' + networkID.name, error])
        );
    }

}

DeleteNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/delete_network/delete_network.html';

export { DeleteNetworkCtrl };