import { PanelCtrl } from 'grafana/app/plugins/sdk';

class ListNetworkCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.$http=$http;
        this.nets=[];
        this.getList();
        this.pageReady = false;
    }

    start(id){
        var req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/start/'+id
        };
        this.$http(req)
            .then((res)=>{console.log("rete avviata");})
    }

    stop(id){
        var req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/stop/'+id
        };
        this.$http(req)
            .then((res)=>{console.log("rete stoppata");})
    }

    getList(){
        console.log("data");
        var self=this;
        var req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/retrieve/all'
        };

        this.$http(req)
            .then((res)=>{this.nets=res.data;console.log(this.nets);this.pageReady=true}, (res)=>{console.log("non va")});
    }

}

ListNetworkCtrl.templateUrl = 'component/modules/list_network/list_network.html';

export { ListNetworkCtrl as PanelCtrl };