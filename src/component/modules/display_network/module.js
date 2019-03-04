import { PanelCtrl } from 'grafana/app/plugins/sdk';
import {alert,AlertType} from "../../../utils/alert-util";
import { getNetworkList, getDynamicGraph } from '../../../utils/network-util'

class DisplayNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http = $http;

        //TODO async
        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => alert(AlertType.ERROR, 'GnB App Error', error)
        );

        $scope.ctrl.events.on('refresh', this.displayGraph.bind(this));
    }

    initEditMode() {
        super.initEditMode();
        this.addEditorTab('Network', 'public/plugins/gnb/component/modules/display_network/edit/choose_network.html');
        this.editorTabIndex = 1;
    }

    setGraph() {
        let network = document.getElementById("networks");
        this.networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text);

        this.displayGraph();
    }

    displayGraph() {
        if(this.networkID !== undefined) {
            getDynamicGraph(this.$http, this.networkID.id).then(
                data => document.getElementById("wrapper-bbn").innerHTML = data,
                error => alert(AlertType.WARNING, 'Network ' + this.networkID.name, error)
            );
        }
    }

}

DisplayNetworkCtrl.templateUrl = 'public/plugins/gnb/component/modules/display_network/display_network.html';

export { DisplayNetworkCtrl as PanelCtrl };