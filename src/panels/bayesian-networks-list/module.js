import { PanelCtrl } from 'grafana/app/plugins/sdk';

// Remove up to here

class ListCtrl extends PanelCtrl {

    constructor($scope, $injector, $http) {
        super($scope, $injector);
        this.initStyles();
        this.$http=$http;
        this.nets=[];
        this.getList();
        this.pageReady = false;
    }

    initStyles() {
        window.System.import(this.panelPath + 'css/style.css!');
    }

    get panelPath() {
        if (this._panelPath === undefined) {
            this._panelPath = `/public/plugins/${this.pluginId}/`;
        }
        return this._panelPath;
    }

    start(id){
        console.log(id);
    }
    getList(){
        console.log("data");
        var self=this;
        var req = {
            method: 'POST',
            url: 'https://api.bitcraftswe.it/api/retrieve/all'
        };

        this.$http(req)
            .then((res)=>{this.nets=res.data;console.log(this.nets);this.pageReady=true}, (res)=>{console.log("non va")});
    }

}

ListCtrl.templateUrl = 'panels/partials/bayesian-list.html';

export { ListCtrl as PanelCtrl };