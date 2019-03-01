import { PanelCtrl } from 'grafana/app/plugins/sdk';

class NetCtrl extends PanelCtrl {
    constructor($scope, $injector, $http, backendSrv) {
        super($scope, $injector);
        this.$http = $http;
        this.backendSrv = backendSrv;
        this.getNetworks();
    }

    initEditMode() {
        super.initEditMode();
        this.addEditorTab('Network', 'public/plugins/gnb/component/panels/display_network/display_network.html');
        this.editorTabIndex = 1;
    }

    getGraph() {
        let network = document.getElementById("networks");
        let idRete = null;
        this.networks.forEach(function(c){
            if(c.name === network.options[network.selectedIndex].text) {
                idRete = c.id;
            }
        });

        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/static-graph/' + idRete
        };

        this.$http(req).then((res) => {
            document.getElementById("wrapper-bbn").innerHTML = res.data;
        });
    }

    getNetworks() {
        var req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/retrieve/all'
        };

        this.$http(req).then((res) => {
            this.networks = res.data;
        });
    }
}

NetCtrl.templateUrl = 'public/plugins/gnb/component/modules/display_network/display_network.html';

export {
    NetCtrl as PanelCtrl
};