import { PanelCtrl } from 'grafana/app/plugins/sdk';
import { appEvents } from 'grafana/app/core/core';
import { getNetworkList, getStaticGraph } from '../../../utils/network-util'

class DisplayNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http = $http;

        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => appEvents.emit('alert-error', ['GnB App Error', error])
        );
    }

    initEditMode() {
        super.initEditMode();
        this.addEditorTab('Network', 'public/plugins/gnb/component/modules/display_network/edit/choose_network.html');
        this.editorTabIndex = 1;
    }

    displayGraph() {
        let network = document.getElementById("networks");
        let networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text);

        getStaticGraph(this.$http, networkID.id).then(
            data => document.getElementById("wrapper-bbn").innerHTML = data,
            error => appEvents.emit('alert-warning', ['Network ' + networkID.name, error])
        );
    }

}

DisplayNetworkCtrl.templateUrl = 'public/plugins/gnb/component/modules/display_network/display_network.html';

export { DisplayNetworkCtrl as PanelCtrl };