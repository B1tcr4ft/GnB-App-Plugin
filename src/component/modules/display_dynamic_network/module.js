import {loadPluginCss, PanelCtrl} from 'grafana/app/plugins/sdk';
import {alert, AlertType} from "../../../utils/alert-util";
import {getDynamicGraph, getNetworkList} from '../../../utils/network-util'

loadPluginCss({
    dark: 'plugins/gnb/css/gnb.dark.css'
});

class DisplayDynamicNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http = $http;

        //TODO async
        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => alert(AlertType.ERROR, 'GnB App Error', error)
        );

        $scope.ctrl.events.on('refresh', this.refreshGraph.bind(this));
    }

    initEditMode() {
        super.initEditMode();
        this.addEditorTab('Network', 'public/plugins/gnb/component/modules/display_dynamic_network/edit/choose_network.html');
        this.editorTabIndex = 1;
    }

    setGraph() {
        let network = document.getElementById("networks");
        this.networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text);

        this.refreshGraph();
    }

    refreshGraph() {
        if (this.networkID !== undefined) {
            getDynamicGraph(this.$http, this.networkID.id).then(
                data => document.getElementById("wrapper-bbn").innerHTML = data,
                error => alert(AlertType.WARNING, 'Network ' + this.networkID.name, error)
            );
        }
    }

}

DisplayDynamicNetworkCtrl.templateUrl = 'public/plugins/gnb/component/modules/display_dynamic_network/display_dynamic_network.html';

export {DisplayDynamicNetworkCtrl as PanelCtrl};