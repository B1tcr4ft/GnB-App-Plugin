import {alert,AlertType} from "../../../utils/alert-util";
import {deleteNetwork, getNetworkList} from '../../../utils/network-util'

class DeleteNetworkCtrl {

    constructor($scope, $injector, $http) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;

        //TODO async
        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => alert(AlertType.ERROR, 'GnB App Error', error)
        );
    }

    delete() {
        let network = document.getElementById("networks");
        let networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text);

        deleteNetwork(this.$http, networkID.id).then(
            data => alert(AlertType.SUCCESS, 'Network ' + networkID.name, data),
            error => alert(AlertType.WARNING, 'Network ' + networkID.name, error)
        );
    }

}

DeleteNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/delete_network/delete_network.html';

export { DeleteNetworkCtrl };