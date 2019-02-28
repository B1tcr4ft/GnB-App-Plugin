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
        let bbn = document.getElementById("bbn");
        risultato = chiamata;
        risultato.stringify;

        bbn.innerHTML(risultato)
    }

    getNetworks() {
        var req = {
            method: 'GET',
            //url: 'https://api.bitcraftswe.it/api/save/78',
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