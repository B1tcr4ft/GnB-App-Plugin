import { PanelCtrl } from 'grafana/app/plugins/sdk';
import { getNetworkList, getStaticGraph } from '../../../utils/network-util'

//TODO handle errors
class DisplayNetworkCtrl extends PanelCtrl {
    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http = $http;

        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => console.log(error)
        );
    }

    initEditMode() {
        super.initEditMode();
        this.addEditorTab('Network', 'public/plugins/gnb/component/modules/display_network/edit/choose_network.html');
        this.editorTabIndex = 1;
    }

    displayGraph() {
        let network = document.getElementById("networks");
        let networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text).id;

        getStaticGraph(this.$http, networkID).then(
            data => document.getElementById("wrapper-bbn").innerHTML = data,
            error => console.log(error)
        );
    }
}

DisplayNetworkCtrl.templateUrl = 'public/plugins/gnb/component/modules/display_network/display_network.html';

export { DisplayNetworkCtrl as PanelCtrl };