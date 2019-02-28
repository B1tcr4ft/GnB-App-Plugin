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
        this.addEditorTab('Network', 'public/plugins/grafana-example-app/panels/net/editor.html');
        this.editorTabIndex = 1;
    }

    getGraph(){
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
            document.getElementById("bbn").innerHTML = res.data;
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

NetCtrl.templateUrl = 'public/plugins/grafana-example-app/component/net/net.html';

export {
    NetCtrl as PanelCtrl
};